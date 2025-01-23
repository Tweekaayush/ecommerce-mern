import React from 'react'
import { NavLink } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <a href="/" className="nav-brand brand">
          Primart<span>.</span>
        </a>
        <div className='toggle-collapse'>
          <RxHamburgerMenu />
        </div>
        <div className="navbar-collapse">
          <ul className="nav-page-links">
            <li>
              <NavLink to='/' className={({isActive}) => isActive ? "link-active": "" }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/browse' className={({isActive}) => isActive ? "link-active": "" }>
                Browse
              </NavLink>
            </li>
            <li>
              <NavLink to='/faq' className={({isActive}) => isActive ? "link-active": "" }>
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>
          <ul className="nav-user-links">
            <li>
              <NavLink to ='/wishlist'>
                <LuHeart/>
              </NavLink>
            </li>
            <li>
              <NavLink to ='/login'>
                <LuUser/>
              </NavLink>
            </li>
            <li>
              <NavLink to ='/'>
                <LuShoppingCart/>
              </NavLink>
            </li>
          </ul>
      </div>
    </nav>
  )
}

export default Navbar