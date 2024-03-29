import { useDispatch, useSelector } from "react-redux";
import { FaTrash} from "react-icons/fa";
import style from "./Cart.module.scss";
import { RootState } from "../../Store/rootReducer";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Rating } from "@mui/material";
import StarIcon from "@mui/material/SvgIcon";
import AddToCart from "../../Components/Button";
import { useNavigate } from 'react-router-dom';
import { addProduct, deleteCartproducts, getCartproducts } from "../../Slices/Cart/thunk";


const Cart: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const imageUrlPrefix = "http://localhost:3001/uploads/";


  const cartProducts = useSelector((state: RootState) => state.cart.cartProducts)

  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("1");

  function handleOptionClick(event: any) {
    console.log(event);
    setSelectedValue(event);
  }

  const options: any = [];

  for (let i = 1; i <= 10; i++) {
    options.push(
      <li key={i}>
        <button className="dropdown-item" onClick={() => handleOptionClick(i)}>
          {i}
        </button>
      </li>
    );
  }

  const removeItem = (id:any) =>{
    //add function to delete cart items 
    dispatch(deleteCartproducts(id))
  }

  const onClickproceedToBuy = () => {
    // Check if token is present in local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      // Token is present, navigate to the address page
      navigate('/address');
    } else {
      // Token is not present, redirect to the login page and set the last page visited to last page
       localStorage.setItem('lastPageVisited',"/address");
      navigate('/login');
    }
  };
  

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

  useEffect(() => {
    dispatch(getCartproducts());
  }, []);



  const calculateTotalCost = () => {
    let total: any = [];
    let totalCount: any = [];
    cartProducts.map((item: any) => {
      total.push(item.quantity * item.productPrice);
      totalCount.push(item.quantity);
    });
    return {totalCost:total.reduce((a: any, b: any) => a + b, 0),
            totalItem:totalCount.reduce((a: any, b: any) => a + b, 0)} ;
  };
  calculateTotalCost();

  return (
    <>
      <div className="row " style={{  position: "relative"}}>
        <Container>
        <div className="col-lg-8 mt-2 border mx-2 ">
          <div className="d-flex justify-content-between">
            <div className="px-2">
              <b className="display-4" style={{fontWeight:"500"}}>Shopping cart</b>
              {(cartProducts) && cartProducts.map((product: any) => (
                <div key={product._id}>
                  <div className="d-flex mt-2 justify-content-between">
                    <div
                      className="flex-grow-1 flex-shrink-0"
                      style={{ maxWidth: "40%" }}
                    >
                      <Card.Img
                        className="w-80"
                        src={imageUrlPrefix + product.image}
                      />
                    </div>
                    <Row sm={4} md={4} lg={3} className = "d-flex ">
                      <Col key={product.id} className="mx-2 d-flex flex-column justify-content-end">
                        <div
                          className={`${style.cardTitle} mb-2 text-md text-lg`}
                        >
                          {product.productName}
                        </div>
                        <div className="d-flex">
                          <div className={`${style.cardTitle} text-md text-lg`}>
                            Rs. {product.productPrice}
                          </div>
                        </div>
                        <div className={`${style.cardTitle} text-md text-lg`}>
                          Quantity: {product.quantity}
                        </div>
                      </Col>
                    </Row>
                    <div className = "px-4 d-flex align-items-end" style={{fontWeight:"500"}}>
                    Rs. {product.productPrice*product.quantity}
                    </div>

                    <FaTrash size="15px" color="red" onClick={()=>removeItem(product._id)} />
                  </div>
                </div>
              ))}
              <div className="my-2 px-3 d-flex justify-content-end">
                <h5>Subtotal ({calculateTotalCost().totalItem} {(calculateTotalCost().totalItem >1)? "items":"item" } ) :Rs {calculateTotalCost().totalCost} </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 d-flex justify-content-center  ">
          <button className={style.buyButton} onClick={onClickproceedToBuy} >Proceed to Buy ({calculateTotalCost().totalItem} {(calculateTotalCost().totalItem >1)? "items":"item" })</button>

        </div>
        
        </Container>
      </div>
    </>
  );
};

export default Cart;
