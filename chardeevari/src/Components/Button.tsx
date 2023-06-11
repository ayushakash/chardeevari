import { useEffect, useState } from "react";
import style from './button.module.scss'

export default function AddToCart(props:any) {
  const [buttonFlip, setButtonFlip] = useState(true);
  const [count, setCount] = useState<any>(props.product.orderCount?props.product.orderCount:0);
  // const [product,setProduct] = useState<any>([])

  const addOnClick = () => {
    console.log(count);
    setCount(count + 1); 
    buttonFlip === true ? setButtonFlip(false) : setButtonFlip(true);
    sendToHome(count+1);
  };

  useEffect(() => {
    setCount(props.product.orderCount || 0);
  }, [props.product.orderCount]);


  const handleIncrement = () => {
    setCount(count+1)
    sendToHome(count+1);
    
  };
  
  const handleDecrement = () => {
    setCount(count-1)
    sendToHome(count-1);
    
  };
  
  const sendToHome = (updatedCount:Number) =>{
    console.log("count",updatedCount);
    props.count({ ...props.product, orderCount: updatedCount  });

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
