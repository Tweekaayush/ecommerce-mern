import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../slices/userSlice";
import { ImSpinner2 } from "react-icons/im";

const ResetPassword = () => {
  const { state, search } = useLocation();
  const token = new URLSearchParams(search).get("token");
  const user = new URLSearchParams(search).get("user");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formDataError, setFormDataError] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    data: {
      user: { _id },
    },
    successMessage,
    error,
  } = useSelector((state) => state.user);

  const validate = () => {
    let error = {
      password: "",
      confirmPassword: "",
    };

    if (formData.password === "") {
      error.password = "Please enter a new password";
    }

    if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "Password does not match";
    }

    setFormDataError(error);
    return error.password === "" && error.confirmPassword === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate())
      dispatch(resetPassword({ password: formData.password, user, token }));
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);

  useEffect(() => {
    if (successMessage) {
      navigate("/login");
    }
  }, [successMessage]);

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  return (
    <section id="auth-container">
      <div className="container">
        <div className="form-container">
          <h1 className="heading-2">Reset Password</h1>
          <p className="body-text-1">Make a new password.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password" className="form-label">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <span>password</span>
              {formDataError.password && (
                <p className="form-error-msg">{formDataError.password}</p>
              )}
            </label>
            <label htmlFor="confirmPassword" className="form-label">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <span>confirm Password</span>
              {formDataError.confirmPassword && (
                <p className="form-error-msg">
                  {formDataError.confirmPassword}
                </p>
              )}
            </label>
            <button type="submit" disabled={loading} className="button-1">
              {loading ? <ImSpinner2 className="fa-spin" /> : "Reset"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
