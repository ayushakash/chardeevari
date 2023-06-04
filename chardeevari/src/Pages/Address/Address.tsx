import { useNavigate } from "react-router-dom";
import AddressComponent from "../../Components/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../Slices/User/thunk";
import { RootState } from "../../Store/rootReducer";
import style from '../../Components/Common.module.scss'

const Address = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAddress());
  },[]);
   
  const addresses = useSelector((state: RootState) => state.user.address);
  return (
    <>
      <div className="mx-4">
        <h3>Select Address to Deliver</h3>
        {(addresses.length) && <AddressComponent addresses={addresses} />}
        <button className={style.editButton } onClick={() => navigate("/addAddress")}>Add Address</button>
      </div>
    </>
  );
};

export default Address;
