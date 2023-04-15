import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppNavbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/Home/Home';
import { productsData } from './Api/FakeData/productsData'
import Counter from './Components/Counter';
import ProductUploader from './Pages/Admin/ProductUploader';
import ResponsiveDrawer from './Components/Drawer';

function App() {
  return (
    <>

      <BrowserRouter>
        <AppNavbar brand={''} links={[]} logoSrc={'/Chardeevari.png'} />
        <ResponsiveDrawer />
        <Routes>
          <Route path="/" element={<HomePage products={productsData.products} />} />
          <Route path="/admin/upload-product" element={<ProductUploader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
