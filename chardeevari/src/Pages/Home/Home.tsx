import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addProduct, fetchProducts } from "../../Slices/Products/thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import style from './Home.module.scss'
import { Box, Rating } from "@mui/material";
import StarIcon from '@mui/material/SvgIcon';


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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.product.products);
  console.log(products);

  const imageUrlPrefix = 'http://localhost:3001/uploads/';

  const handleAddToCart = (product: any) => {
    console.log("add to cart");
    dispatch(addProduct(product));
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Container className="my-3">
      <Row>
        {products.map((product: any) => (
          <Col sm={6} md={4} lg={3} key={product.id}>
            <Card className="mb-2">
              <Card.Img variant="top" src={imageUrlPrefix + product.image} />
              <Card.Body>
                <div className={style.cardTitle}>{product.productName}</div>
                <div className={style.subHeading}>Brand: {product.brand}</div>
                <div className="d-flex">
                  <div className="mt-1 ">Price: </div>
                  <div className={style.cardTitle} style={{ "paddingLeft": "8px" }}>{product.productPrice}</div>
                </div>
                {/* <Card.Text>Category: {product.category}</Card.Text> */}
                {/* <Card.Text>Subcategory: {product.description}</Card.Text> */}
                <div className="d-flex justify-content-between ">
                  <Rating className={'mt-1'}
                    name="text-feedback"
                    value={product.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  <div className="d-flex align-items-center">
                    <Button variant="btn btn-outline-success mx-2" onClick={() => handleAddToCart({ ...product, quantity })}>Add </Button>
                    <Button variant="btn btn-outline-success" onClick={handleIncrement}>+</Button>
                    <div className="mx-2">{quantity}</div>
                    <Button variant="btn btn-outline-success mx-2" onClick={handleDecrement}>-</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
