import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const err = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.firstName.length) {
      err.firstName = "Please provide your First Name!";
    }
    if (!formData.lastName.length) {
      err.lastName = "Please provide your Last Name!";
    }
    if (!formData.password.length) {
      err.password = "Please enter your password!";
    }
    if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Password does not match!";
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

    console.log(formData)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <section id="auth-container">
      <div className="container">
        <div className="form-container">
          <h1 className="heading-2">Sign Up</h1>
          <p className="body-text-1">Start your journey with us!</p>
          <form onSubmit={handleSumbit} className="signup-form">
            <label htmlFor="firstName" className="form-label">
              <input
                type="firstName"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <span>First Name</span>
              {formErrors.firstName && (
                <p className="form-error-msg">{formErrors.firstName}</p>
              )}
            </label>
            <label htmlFor="lastName" className="form-label">
              <input
                type="lastName"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <span>Last Name</span>
              {formErrors.lastName && (
                <p className="form-error-msg">{formErrors.lastName}</p>
              )}
            </label>
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
            <label htmlFor="confirmPassword" className="form-label">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span>Confirm Password</span>
              {formErrors.confirmPassword && (
                <p className="form-error-msg">{formErrors.confirmPassword}</p>
              )}
            </label>
            <Link to="/forgot-password" className="form-link">
              Forget password?
            </Link>
            <input type="submit" value="Register" className="button-1" />
            <p>
              Already have an account?{" "}
              <Link to="/login" className="form-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
