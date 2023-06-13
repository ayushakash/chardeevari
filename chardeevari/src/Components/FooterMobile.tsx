import { FaHome, FaSearch, FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileFooter() {
  const handleButtonClick = () => {
    console.log("clicked");
  };

  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <FaHome size="25px" />,
      label: "Home",
      onClick: () => {
        navigate("/");
      }
    },
    {
      icon: <FaSearch size="25px" />,
      label: "Search",
      onClick: handleButtonClick
    },
    {
      icon: <FaShoppingCart size="25px" />,
      label: "Cart",
      onClick: () => {
        navigate("/cart");
      }
    },
    {
      icon: <FaUser size="25px" />,
      label: "Account",
      onClick: () => {
        navigate("/account");
      }
    }
  ];

  return (
    <>
      <div className="d-flex justify-content-around mx-2 mt-2 py-2" style={{ backgroundColor: "#FFFFFF" }}>
        {menuItems.map((menuItem, index) => (
          <div
            className="d-flex flex-column align-items-center text-smaller"
            key={index}
            onClick={menuItem.onClick}
          >
            {menuItem.icon}
            {menuItem.label}
          </div>
        ))}
      </div>
    </>
  );
}
