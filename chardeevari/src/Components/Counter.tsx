import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/rootReducer";
import { incrementByValue, incrementAsyncByValue } from "../Slices/Counter/thunk";

const Counter = () => {
  const [incrementValue, setIncrementValue] = useState(1);
  const dispatch = useDispatch<any>();
  const { value } = useSelector((state: RootState) => state.counter);

  const handleIncrementByValue = () => {
    dispatch(incrementByValue(incrementValue));
  };

  const handleIncrementAsync = () => {
    dispatch(incrementAsyncByValue(incrementValue));
  };

  return (
    <div>
      <h1>Counter: {value}</h1>
      <input type="number" value={incrementValue} onChange={(e) => setIncrementValue(Number(e.target.value))} />
      <button onClick={handleIncrementByValue}>Increment by Value</button>
      <button onClick={handleIncrementAsync}>Increment Async</button>
    </div>
  );
};

export default Counter;
