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
            <ul>
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
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
              <li>
                <Link to="/">Link</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            Copyright &copy; 2025. All Rights Reserved. -{" "}
            <a href="/">Aayush Dobriyal</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
