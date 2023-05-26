import React, { useState } from 'react';
import style from './Common.module.scss'
import buttonStyle from "../Pages/Cart/Cart.module.scss";

interface Address {
  id: string;
  name: string;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber: string;
}

interface AddressComponentProps {
  addresses: Address[];
}

export const AddressComponent: React.FC<AddressComponentProps> = ({ addresses }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0].id);

  const handleAddressClick = (id: string) => {
    console.log(id)
    setSelectedAddressId(id);
  };

  return (
    <div>
      {addresses.map((address) => (
        <div
          className="d-flex rounded align-items-center mt-2 bg-white  px-2 py-2"
          key={address.id}
          
        >
          <div onClick={() => handleAddressClick(address.id)}>
            <input
              type="radio"
              checked={selectedAddressId === address.id}
              onChange={() => {}}
              className={style.customRadio}
            />
          </div>
          <div className="mx-2">
            <div onClick={() => handleAddressClick(address.id)}>
            <div><b>{address.name}</b></div>
            <div>{address.address}</div>
            <div>{address.streetAddress}</div>
            <div>{address.city.toLocaleUpperCase()},{address.state.toLocaleUpperCase()} </div>
            <div>{address.pincode}</div>
            <div>{address.phoneNumber}</div>
            </div>
            {selectedAddressId === address.id && (
              <div className='d-flex flex-column' style={{ marginTop: '10px' }}>
                <button className={buttonStyle.buyButton}>Deliver to this Address</button>
                <div className='d-flex justify-content-between'>
                <button className={style.editButton}>Edit</button>
                <button className={style.editButton }>Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


