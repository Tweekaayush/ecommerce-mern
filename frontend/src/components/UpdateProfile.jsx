import {useState} from 'react'
import { useSelector } from 'react-redux';

const UpdateProfile = () => {
    const { name, email, fullAddress } = useSelector((state) => state.user.data);
  
    const [formData, setFormData] = useState({
      name: name,
      email: email,
      address: fullAddress?.address || "",
      postalCode: fullAddress?.postalCode || "",
      city: fullAddress?.city || "",
      country: fullAddress?.country || "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <div className="update-profile-container">
        <h1 className="heading-3">Update profile</h1>
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
          <label htmlFor="address" className="form-label">
            <input
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={formData.address}
            />
            <span>address</span>
          </label>
          <label htmlFor="postalCode" className="form-label">
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={handleChange}
              value={formData.postalCode}
            />
            <span>postal code</span>
          </label>
          <label htmlFor="city" className="form-label">
            <input
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={formData.city}
            />
            <span>city</span>
          </label>
          <label htmlFor="country" className="form-label">
            <input
              type="text"
              name="country"
              id="country"
              onChange={handleChange}
              value={formData.country}
            />
            <span>country</span>
          </label>
          <input type="submit" value="Save Changes" className="button-1" />
        </form>
      </div>
    );
  };

export default UpdateProfile