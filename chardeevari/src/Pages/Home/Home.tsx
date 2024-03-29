import React, { useEffect, useState,useMemo } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {  fetchProducts } from "../../Slices/Products/thunk";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import style from './Home.module.scss'
import { Box, Rating } from "@mui/material";
import StarIcon from '@mui/material/SvgIcon';
import AddToCart from "../../Components/Button";
import Footer from "../../Components/Footer";
import SearchAppBar from "../../Components/SearchBar";
import MobileFooter from "../../Components/FooterMobile";
import { addProduct } from "../../Slices/Cart/thunk";

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

const HomePage: React.FC<any> = ({ searchString }) => {

  const [hasFetched, setHasFetched] = useState(false);

  const dispatch = useDispatch<any>();
  useEffect(() => {
if (!hasFetched) { // Only make the API call if data has not been fetched
      dispatch(fetchProducts());
      setHasFetched(true); // Update the state to indicate that data has been fetched
    }
  }, [dispatch, hasFetched]);

  const cartProducts = useSelector((state: RootState) => state.product.cartProducts);

  const handleProductAdditionCount = (cartProduct: any) => {
    let updatedProducts = [];
    const existingProduct = cartProducts.find(
      (product) => product.id === cartProduct.id
    );

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        quantity: cartProduct.quantity,
      };
      updatedProducts.push(updatedProduct); //updating old product
    } else {
      updatedProducts.push(cartProduct); //adding new product
    }
    dispatch(addProduct(updatedProducts));
  };

  const products = useSelector((state: RootState) => state.product.products);
  let filteredProducts =  useMemo(() => {
    return products.filter((item: any) => {
      return (
        item.productName.toLowerCase().includes(searchString.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchString.toLowerCase())
      );
    });
  }, [products, searchString]);


  const imageUrlPrefix = "http://localhost:3001/uploads/";
  const handleAddToCart = (product: any) => {
    console.log("add to cart");
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <>
    <div style={{ minHeight: "100vh", position: "relative" ,paddingBottom:"56px" }}>
      <Container className="my-3">
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}></div>
        <Row>
          {filteredProducts.map((product: any) => (
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
        </Row>
      </Container>
    </div>
 
    </>
  );
};

export default HomePage;
