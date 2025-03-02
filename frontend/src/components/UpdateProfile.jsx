import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../slices/userSlice";
import { ImSpinner2 } from "react-icons/im";

const UpdateProfile = () => {
  const {
    loading,
    data: {
      user: { name, email },
    },
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="update-profile-container">
      <h1 className="heading-3">Privacy</h1>
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
          />
          <span>name</span>
        </label>
        <label htmlFor="email" className="form-label">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <span>email</span>
        </label>
        <label htmlFor="password" className="form-label">
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <span>Update Password</span>
        </label>
        <button type="submit" disabled={loading} className="button-1">
          {loading ? <ImSpinner2 className="fa-spin" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
