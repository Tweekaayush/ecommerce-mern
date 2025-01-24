import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  let resizeTimer;

  const handleResize = () => {
    document.body.classList.add("resize-animation-stopper");

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);

    const width = document.body.clientWidth;

    if (width > 768) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  return (
    <nav>
      <div className="container">
        <a href="/" className="nav-brand brand">
          Primart<span>.</span>
        </a>
        <div className="toggle-collapse" onClick={() => setToggle(!toggle)}>
          <RxHamburgerMenu />
        </div>
        <div className={`navbar-collapse ${toggle ? "" : "collapse"}`}>
          <ul className="nav-page-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "link-active" : "")}
                onClick={() => setToggle(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse"
                className={({ isActive }) => (isActive ? "link-active" : "")}
                onClick={() => setToggle(false)}
              >
                Browse
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) => (isActive ? "link-active" : "")}
                onClick={() => setToggle(false)}
              >
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="nav-user-links">
          <li>
            <NavLink to="/wishlist">
              <LuHeart />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              <LuUser />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <LuShoppingCart />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
