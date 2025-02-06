import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../slices/userSlice";
import { profileImages } from "../avatarlist";
import Loader from "../components/Loader";
import { ImSpinner2 } from "react-icons/im";

const Signup = () => {
  const {
    loading,
    data: {
      user: { _id },
    },
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
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

    return !err.password && !err.email && !err.firstName && !err.lastName;
  };

  const handleImages = (e) => {
    const file = Array.from(e.target.files)[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({ ...formData, image: reader.result });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    const v = validate();

    if (v) {
      dispatch(
        signup({
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          password: formData.password,
          image: formData.image,
        })
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "firstName") {
      const img = profileImages.filter((p) => p.id === value[0].toLowerCase());

      setFormData({ ...formData, image: img[0].image });
    }
  };

  useEffect(() => {
    if (_id) navigate("/profile");
  }, [_id]);

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

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
            <label htmlFor="image" className="form-label">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleImages}
              />
              <span>image</span>
            </label>
            {formData?.image && (
              <div className="profile-preview-img">
                <img src={formData.image} alt={formData.firstName} />
              </div>
            )}
            <button type="submit" disabled={loading} className="button-1">
              {loading ? <ImSpinner2 className="fa-spin" /> : "Register"}
            </button>
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
