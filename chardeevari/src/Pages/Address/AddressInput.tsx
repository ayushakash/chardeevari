import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../Slices/User/thunk';
import { useNavigate } from 'react-router-dom';

type AddressType = 'billing' | 'shipping';

interface AddressData {
  name: string;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  addressType: number;
}

const Addaddress: React.FC<any> = () => {
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const [addressData, setAddressData] = useState<AddressData>({
    name: '',
    address: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    addressType: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'addressType' ? parseInt(value, 10) : value;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };


  

  const handleSubmit = () => {
        
    dispatch(updateAddress(addressData))
    navigate("/address")

  };

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          className="form-control"
          name="name"
          value={addressData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <input
          type="text"
          id="address"
          className="form-control"
          name="address"
          value={addressData.address}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="streetAddress" className="form-label">Street Address:</label>
        <input
          type="text"
          id="streetAddress"
          className="form-control"
          name="streetAddress"
          value={addressData.streetAddress}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">City:</label>
        <input
          type="text"
          id="city"
          className="form-control"
          name="city"
          value={addressData.city}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="state" className="form-label">State:</label>
        <input
          type="text"
          id="state"
          className="form-control"
          name="state"
          value={addressData.state}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pincode" className="form-label">Pincode:</label>
        <input
          type="text"
          id="pincode"
          className="form-control"
          name="pincode"
          value={addressData.pincode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone Number:</label>
        <input
          type="text"
          id="phone"
          className="form-control"
          name="phone"
          value={addressData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="addressType" className="form-label">Address Type:</label>
        <select
          id="addressType"
          className="form-select"
          name="addressType"
          value={addressData.addressType}
          onChange={handleChange}
        >
          <option value="0">Billing</option>
          <option value="1">Shipping</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Addaddress;
