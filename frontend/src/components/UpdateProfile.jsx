import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const { name, email, fullAddress } = useSelector((state) => state.user.data);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
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
        <input type="submit" value="Save Changes" className="button-1" />
      </form>
    </div>
  );
};

export default UpdateProfile;
