import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div>
            <Link to="/" className="brand footer-brand">
              Primart<span>.</span>
            </Link>
            <p className="body-text-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur perspiciatis dolores tempore minus nemo sapiente soluta
              dolor commodi. Praesentium, esse!
            </p>
            <ul className="footer-list-icons">
              <li>
                <a href="https://www.facebook.com">
                  <FaFacebook/>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com">
                  <FaLinkedin/>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <FaInstagram/>
                </a>
              </li>
              <li>
                <a href="https://www.github.com">
                  <FaGithub/>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/promotions">Promotions</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/browse?category=electronic">Electronic</Link>
              </li>
              <li>
                <Link to="/browse?category=furniture">Furniture</Link>
              </li>
              <li>
                <Link to="/browse?category=lamp">Lamp</Link>
              </li>
              <li>
                <Link to="/browse?category=skin-care">Skin Care</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/accesibility">Accesibility</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            Copyright &copy; 2025. All Rights Reserved. -{" "}
            <a href="https://aayushdobriyal.vercel.app">Aayush Dobriyal</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
