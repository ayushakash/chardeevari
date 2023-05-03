import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.scss";
import { RootState } from "../../Store/rootReducer";
import React, { useEffect, useState } from "react";
import { addProduct, getCartproducts } from "../../Slices/Products/thunk";
import { Card, Col, Row } from "react-bootstrap";
import { Rating } from "@mui/material";
import StarIcon from "@mui/material/SvgIcon";
import AddToCart from "../../Components/Button";

const Cart: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const imageUrlPrefix = "http://localhost:3001/uploads/";

  const handleProductAdditionCount = (cartProduct: any) => {
    let updatedProducts = [];
    const existingProduct = cartProducts.find(
      (product) => product.id === cartProduct.id
    );

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        orderCount: cartProduct.orderCount,
      };
      updatedProducts.push(updatedProduct); //updating old product
    } else {
      updatedProducts.push(cartProduct); //adding new product
    }
    dispatch(addProduct(updatedProducts));
  };

  useEffect(() => {
    dispatch(getCartproducts());
  }, []);

  const cartProducts = useSelector(
    (state: RootState) => state.product.cartProducts
  );

  return (
    <>
      {cartProducts.map((product: any) => (
        <Card className="mb-2" key={product.id}>
          <Card.Body>
            <div className="d-flex">
              <div
                className="flex-grow-1 flex-shrink-0"
                style={{ maxWidth: "40%" }}
              >
                <Card.Img
                  className="w-100"
                  src={imageUrlPrefix + product.image}
                />
              </div>
              <div
                className="flex-grow-1 flex-shrink-0 mx-2"
                style={{ maxWidth: "40%" }}
              >
                <Row sm={4} md={4} lg={3}>
                  <Col key={product.id}>
                    <div className={style.cardTitle}>{product.productName}</div>
                    <div className={style.subHeading}>
                      Brand: {product.brand}
                    </div>
                    <div className="d-flex">
                      <div className={style.cardTitle}>
                        {product.productPrice}
                      </div>
                    </div>
                    <div className={style.cardTitle}>{product.orderCount}</div>
                    <AddToCart
                      count={handleProductAdditionCount}
                      product={product}
                    />
                  </Col>
                </Row>
              </div>
              <div></div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Cart;
