import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addProduct, fetchProducts } from "../../Slices/Products/thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import style from './Home.module.scss'
import { Box, Rating } from "@mui/material";
import StarIcon from '@mui/material/SvgIcon';
import AddToCart from "../../Components/Button";
import Footer from "../../Components/Footer";
import SearchAppBar from "../../Components/SearchBar";

export type Product = {
  id: number;
  productName: string;
  price: number;
  category: string;
  subcategory: string;
  rating: number;
  imageUrl: string;
  quantity: number;
};

type Props = {
  products: Array<any>;
};

const HomePage: React.FC<any> = () => {
  const dispatch = useDispatch<any>();

  const cartProducts = useSelector(
    (state: RootState) => state.product.cartProducts
  );
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
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.product.products);
  const imageUrlPrefix = "http://localhost:3001/uploads/";
  const handleAddToCart = (product: any) => {
    console.log("add to cart");
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Container className="my-3">
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          
        </div>
        <Row>
          {products.map((product: any) => (
            <Col key={product.id} xs={6} sm={6} md={3}>
              <Card className="mb-2 ">
                <Card.Img variant="top" src={imageUrlPrefix + product.image} />
                <Card.Body>
                  <div className={style.cardTitle}>{product.productName}</div>
                  <div className={style.subHeading}>Brand: {product.brand}</div>
                  <div className="d-flex">
                    <div className="mt-1 ">Price: </div>
                    <div
                      className={style.cardTitle}
                      style={{ paddingLeft: "8px" }}
                    >
                      {product.productPrice}
                    </div>
                  </div>
                  <AddToCart
                    count={handleProductAdditionCount}
                    product={product}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
          <div
            className="d-md-none d-sm-block mb-2 px-2"
            style={{ position: "fixed", bottom: 0 }}
          >
            <Footer />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
