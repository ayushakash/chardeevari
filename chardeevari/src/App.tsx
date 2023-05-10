import React, { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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
// require('dotenv').config();

function App() {
  const [searchString, setSearchString] = useState("");

  const searchBarfilter = (searchString: string) => {
    setSearchString(searchString);
  };
  return (
    <>
      <BrowserRouter>
        <AppNavbar
          brand={""}
          links={[]}
          logoSrc={"/Chardeevari.png"}
          searchBarfilter={searchBarfilter}
        />
        {/* //display only to admin */}
        <Routes>
          <Route path="/" element={<HomePage searchString={searchString} />} />
          <Route path="/admin/upload-product" element={<ProductUploader />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
