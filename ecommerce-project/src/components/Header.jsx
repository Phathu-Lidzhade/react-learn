import { NavLink, useNavigate, useSearchParams } from "react-router";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import "./header.css";
import { useState } from "react";

function Header({ cart }) {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // I need to use a different variable name since "search"
  // is already being used below.
  const searchText = searchParams.get('search');

  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.
  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchEscape = () => {
    navigate("/");
  };

  const searchOnKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProducts();
    } else if (event.key === "Escape") {
      setSearch("");
      searchEscape();
    }
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"
        value={search}
        onChange={updateSearchInput}
        onKeyDown={searchOnKeyDown} />

        <button className="search-button"
        onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink to="/orders" className="orders-link header-link">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink to="/checkout" className="cart-link header-link">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{cartQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
