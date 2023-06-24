import { useNavigate } from "react-router-dom";
import AddressComponent from "../../Components/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../Slices/User/thunk";
import { RootState } from "../../Store/rootReducer";
import style from "../../Components/Common.module.scss";
import { FaMapMarker } from "react-icons/fa";

const Address = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use the latitude and longitude values as needed
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  
  
  useEffect(() => {
    dispatch(getAddress());
  }, []);
  
  const addresses = useSelector((state: RootState) => state.user.address);

  return (
    <>
      <div className="mx-4">
        <h3>Select Address to Deliver</h3>
        {/* <button className={style.locationButton} onClick={handleGetLocation}>
          <FaMapMarker /> Get Current Location
        </button> */}
        {addresses.length && <AddressComponent addresses={addresses} />}
        <button
          className={style.editButton}
          onClick={() => navigate("/addAddress")}
        >
          Add Address
        </button>
      </div>
    </>
  );
};

export default Address;
