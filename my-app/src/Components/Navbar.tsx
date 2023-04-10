import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface NavbarProps {
  brand: string;
  logoSrc: string;
  links: { label: string; href: string }[];
}

const AppNavbar: React.FC<NavbarProps> = ({ brand, logoSrc, links }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logoSrc} alt={brand} width="30" height="30" className="d-inline-block align-text-top me-2" />
          {brand}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {links.map((link) => (
              <li className="nav-item" key={link.href}>
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a className="nav-link" href="">
                <FaShoppingCart /> Cart
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
