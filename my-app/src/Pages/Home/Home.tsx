import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addProduct, fetchProducts } from "../../Slices/Products/thunk";
import { useDispatch } from "react-redux";

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

const HomePage: React.FC<Props> = ({ products }) => {



  useEffect(() => {
    const products = dispatch(fetchProducts());
    console.log(products);
  }, []);


  const dispatch = useDispatch<any>();



  const handleAddToCart = (product: any) => {
    dispatch(addProduct(product));
    console.log("add to cart");
  };

  return (
    <Container className="my-3">
      <Row>
        {products.map((product) => (
          <Col sm={6} md={4} lg={3} key={product.id}>
            <Card className="mb-3">
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>Subcategory: {product.subcategory}</Card.Text>
                <Card.Text>Rating: {product.rating}</Card.Text>
                <Button variant="primary" onClick={() => handleAddToCart({ ...product, quantity: 1 })}>Add to cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
