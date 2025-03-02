import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut, LuLayoutDashboard } from "react-icons/lu";
import { logout } from "../../slices/userSlice";

const Navbar = ({ setCartStatus }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user: {_id, image, isAdmin, name} } = useSelector((state) => state.user.data);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  let resizeTimer;
  const ref = useRef(null);
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout());
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
    if(navRef.current && !navRef.current.contains(e.target)){
      setToggle(false)
    }
  };

  useEffect(() => {
    setCartStatus(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    window.addEventListener("click", handleClickOutside, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
      window.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <nav ref={navRef}>
      <div className="container">
        <Link to="/" className="nav-brand brand">
          Primart<span>.</span>
        </Link>
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
          </ul>
        </div>
        <ul className="nav-user-links">
          <li>
            <NavLink to="/wishlist">
              <LuHeart />
            </NavLink>
          </li>
          <li>
            {!_id ? (
              <NavLink to="/login">
                <LuUser />
              </NavLink>
            ) : (
              <div className="nav-profile-link" ref={ref} onMouseOver={()=>setOpen(true)} onMouseOut={()=>setOpen(false)}>
                <div
                  className="nav-profile-badge"
                  title="User Options"
                >
                  <img src={image} alt={name} />
                </div>
                <ul
                  className={`nav-profile-options ${
                    open ? "nav-profile-options-active" : ""
                  }`}
                >
                  <li onClick={() => [setOpen(false), navigate("/profile")]}>
                    <LuUser />
                  </li>
                  {isAdmin === true && (
                    <li
                      onClick={() => [setOpen(false), navigate("/dashboard")]}
                    >
                      <LuLayoutDashboard />
                    </li>
                  )}
                  <li onClick={handleLogout}>
                    <LuLogOut />
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={() => setCartStatus(true)}>
            <LuShoppingCart />
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
