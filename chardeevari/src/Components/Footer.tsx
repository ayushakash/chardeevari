import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../Store/rootReducer';

export default function Footer() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const cartProducts = useSelector(
    (state: RootState) => state.product.cartProducts
  );

  const calculateTotalCost = () => {
    let total: any = [];
    let totalCount: any = [];
    cartProducts.map((item: any) => {
      total.push(item.orderCount * item.productPrice);
      totalCount.push(item.orderCount);
    });
    return {totalCost:total.reduce((a: any, b: any) => a + b, 0),
            totalItem:totalCount.reduce((a: any, b: any) => a + b, 0)} ;
  };
  calculateTotalCost();

  return (
    <div className="d-flex justify-content-between rounded-3 w-100 " style={{ "backgroundColor": "#0c831f", "height": "60px" }}>
      <div className="d-flex flex-column px-3 text-white mt-2 ">
        <div style={{ "fontSize": "0.9em" }}>({calculateTotalCost().totalItem} {(calculateTotalCost().totalItem >1)? "items":"item" } ) </div>
        <div>₹{calculateTotalCost().totalCost}</div>
      </div>
      <div className="d-flex align-items-center px-2 text-white">
        <div>
          <Link to="/cart" className="nav-link">
            View Cart <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
