import { useEffect, useState } from "react";
import { FaRegCalendarPlus, FaShoppingCart } from "react-icons/fa";
import { fetchProducts } from "../Slices/Products/thunk";
import { useDispatch } from "react-redux";

interface NavbarProps {
  brand: string;
  logoSrc: string;
  links: { label: string; href: string }[];
  searchBarfilter:any;
}

const AppNavbar: React.FC<NavbarProps> = ({
  brand,
  logoSrc,
  links,
  searchBarfilter,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded(!expanded);
  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-light sticky-top"
      style={{ borderRadius: "15px" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logoSrc}
            alt={brand}
            width="60"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          {brand}
        </a>
        <div className="col-md mx-md-4">
          <form className="d-flex mx-auto my-2 mx-md-5  my-lg-0">
            <input //on typing more than 3 words api will trigger #typeahead
              className="form-control me-2 mx-md-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e: any) =>
                searchBarfilter(e.target.value)
              }
            />
            {/* <button className="btn btn-outline-success" type="submit">
            Search
          </button> */}
          </form>
        </div>
        <button className="navbar-toggler" type="button" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {links.map((link) => (
              <li className="nav-item" key={link.href}>
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <FaShoppingCart /> Cart
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/upload-product">
                <FaRegCalendarPlus /> Add product
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
