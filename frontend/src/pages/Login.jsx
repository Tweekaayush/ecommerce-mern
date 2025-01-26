import { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { login } from "../slices/userSlice";

const Login = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const err = {
      password: "",
      email: "",
    };

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.password.length) {
      err.password = "Please enter your password!";
    }
    if (!pattern.test(formData.email)) {
      err.email = "Please enter a valid Email ID!";
    }

    setFormErrors({ ...err });

    return !err.password && !err.email;
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    const v = validate();
    if(v) dispatch(login({...formData}))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section id="auth-container">
      <div className="container">
        <div className="form-container">
          <h1 className="heading-2">Login</h1>
          <p className="body-text-1">We are so excited to see you!</p>
          <form onSubmit={handleSumbit}>
            <label htmlFor="email" className="form-label">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span>Email</span>
              {formErrors.email && (
                <p className="form-error-msg">{formErrors.email}</p>
              )}
            </label>
            <label htmlFor="password" className="form-label">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span>Password</span>
              {formErrors.password && (
                <p className="form-error-msg">{formErrors.password}</p>
              )}
            </label>
            <Link to="/forgot-password" className="form-link">
              Forget password?
            </Link>
            <input type="submit" value="Login" className="button-1" />
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="form-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
