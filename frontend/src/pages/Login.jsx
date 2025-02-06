import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUsersErrors, login } from "../slices/userSlice";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";
import { ImSpinner2 } from "react-icons/im";

const Login = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const {
    loading,
    data: {
      user: { _id },
    },
    error,
  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    if (v) {
      dispatch(login({ ...formData }));
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);

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
            <Link to="/password/forget" className="form-link">
              Forget password?
            </Link>
            <button type="submit" disabled={loading} className="button-2">{loading ? <ImSpinner2 className="fa-spin"/> : "Login"}</button>
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
