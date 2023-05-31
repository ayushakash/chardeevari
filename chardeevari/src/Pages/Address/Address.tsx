import AddressComponent from '../../Components/index';

const Address = () => {
     
  const addresses = [
    {
      id:"1",
      name: 'John Doe',
      address: '123 Main St',
      streetAddress: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '12345',
      phoneNumber: '555-1234',
    },
    {
      id:"2",
      name: 'John Doe',
      address: '123 Main St',
      streetAddress: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '12345',
      phoneNumber: '555-1234',
    },
    {
      id:"3",
      name: 'John Doe',
      address: '123 Main St',
      streetAddress: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '12345',
      phoneNumber: '555-1234',
    },
    // Add more address objects as needed
    
  ];
  // {style.addressContainer}
  return (
    <>
    <div className="mx-4">
      <h3>Select Address to Deliver</h3>
      <AddressComponent addresses={addresses} />
    </div>
    </>
  )
}

export default Address
