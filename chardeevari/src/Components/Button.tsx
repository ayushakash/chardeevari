import { useEffect, useState } from "react";
import style from './button.module.scss'

export default function AddToCart(props:any) {
  const [buttonFlip, setButtonFlip] = useState(true);
  const [count, setCount] = useState<any>(props.product.quantity?props.product.quantity:0);

  const addOnClick = () => {
    setCount(count + 1); 
    buttonFlip === true ? setButtonFlip(false) : setButtonFlip(true);
    sendToHome(count+1);
  };

  useEffect(() => {
    setCount(props.product.quantity || 0);
  }, [props.product.quantity]);


  const handleIncrement = () => {
    setCount(count+1)
    sendToHome(count+1);
    
  };
  
  const handleDecrement = () => {
    setCount(count-1)
    sendToHome(count-1);
    
  };
  
  const sendToHome = (updatedCount:Number) =>{
    props.count({ ...props.product, quantity: updatedCount  });
  }
  

  return (
    <>
        {buttonFlip ? (
          <div className={style.button} onClick={addOnClick}>
            ADD
          </div>
        ) : (
          <div className={style.counterButton}>
            <div className={style.operator} style ={{"marginLeft" : "5%"}} onClick ={handleDecrement}>-</div>
            <div className={style.operator}>{count}</div>
            <div className={style.operator} style ={{"marginRight" : "5%"}} onClick ={handleIncrement}>+</div>
          </div>
        )}
 </> 
 );
}
