import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AppNavbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/Home/Home";
import { productsData } from "./Api/FakeData/productsData";
import Counter from "./Components/Counter";
import ProductUploader from "./Pages/ProductUploader/ProductUploader";
import ResponsiveDrawer from "./Components/Drawer";
import Footer from "./Components/Footer";
import Cart from "./Pages/Cart/Cart";
import AdminPanel from "./Pages/Admin/AdminPanel";
import Address from "./Pages/Address/Address";
import Pnavbar from "./PwaComponents/index";
import SignUpForm from "./Pages/Authentication/signup";
import LoginForm from "./Pages/Authentication/login";
import Addaddress from "./Pages/Address/AddressInput";

function App() {
  const [searchString, setSearchString] = useState("");
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const searchBarfilter = (searchString: string) => {
    setSearchString(searchString);
  };

  return (
    <>
      <BrowserRouter>
          <>
            {/* <Pnavbar /> */}
            <AppNavbar
              brand={""}
              links={[]}
              logoSrc={"/Chardeevari.png"}
              searchBarfilter={searchBarfilter}
            />
            <Routes>
              <Route path="/" element={<HomePage searchString={searchString} />} />
              <Route path="/admin/upload-product" element={<ProductUploader />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/address" element={<Address />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/addAddress" element={<Addaddress />} />
            </Routes>
          </>
        
          
      </BrowserRouter>
    </>
  );
}

export default App;
