import React from 'react';
import logo from './logo.svg';
import './App.css';
import  AppNavbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/Home/Home';
import {productsData} from './Api/FakeData/productsData'
import Counter from './Components/Counter';

function App() {
  return (
        <>
        <AppNavbar brand={''} links={[]} logoSrc ={''}/>
        <HomePage products={productsData.products} />
        <Counter />
        </>
  );
}

export default App;
