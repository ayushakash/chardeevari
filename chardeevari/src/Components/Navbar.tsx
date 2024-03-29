import { useEffect, useState } from "react";
import { FaRegCalendarPlus, FaShoppingCart,FaUserAlt } from "react-icons/fa";
import { fetchProducts } from "../Slices/Products/thunk";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {logout }from '../Slices/Auth/thunk'
import ResponsiveDrawer from "./Drawer";

interface NavbarProps {
  brand: string;
  logoSrc: string;
  links: { label: string; href: string }[];
  searchBarfilter: any;
}

const AppNavbar: React.FC<NavbarProps> = ({
  brand,
  logoSrc,
  links,
  searchBarfilter,
}) => {
  const [expanded, setExpanded] = useState(false);
  // let expanded = false;
  const handleToggle = () => {
    console.log(expanded)
    setExpanded(!expanded);
  }

  const handleCloseDrawer = () => {
    setExpanded(false);
  }

  const dispatch = useDispatch<any>();

  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-light sticky-top"
      style={{ borderRadius: "15px" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ">
          <img
            src={logoSrc}
            alt={brand}
            width="60"
            height="40"
            className=" d-md-inline-block align-text-top me-2"
            // className="d-none d-md-inline-block align-text-top me-2"
          />
          {brand}
        </Link>
        <div className="col-md mx-md-4">
          <form className="d-flex mx-auto my-2 mx-md-5  my-lg-0">
            <input
              className="form-control me-2 mx-md-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e: any) => searchBarfilter(e.target.value)}
            />
          </form>
        </div>
        <button className="navbar-toggler" type="button" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        {expanded &&<ResponsiveDrawer expanded = {expanded} onClose={handleCloseDrawer}/>}
        {/* <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>  this is below line to activate the drawer of the navbar*/}
        <div className={`collapse navbar-collapse`}>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {links.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link to={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <FaShoppingCart /> Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/upload-product" className="nav-link">
                <FaRegCalendarPlus /> Add product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                <FaRegCalendarPlus /> Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                <FaUserAlt /> Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <FaUserAlt /> login
              </Link>
            </li>
            <li className="nav-item" onClick={()=>dispatch(logout())}>
              {/* <Link to="/login" className="nav-link"> */}
                <FaUserAlt /> logout
              {/* </Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
