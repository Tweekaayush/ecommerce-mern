import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyOrders from "../components/MyOrders";
import { logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../slices/orderSlice";

const UpdateProfile = () => {

  const {name, email, fullAddress} = useSelector(state=>state.user.data)

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    address: fullAddress?.address || '',
    postalCode: fullAddress?.postalCode || '',
    city: fullAddress?.city || '',
    country: fullAddress?.country || '',
  });

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="update-profile-container">
      <h1 className="heading-3">Update profile</h1>
      <form className="update-profile-form">
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

const Profile = () => {
  const { name, image, _id, email, isAdmin } = useSelector(
    (state) => state.user.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileLink, setProfileLink] = useState(0);

  const profileComponents = [
    {
      name: "profile",
      component: <UpdateProfile />,
    },
    {
      name: "myorders",
      component: <MyOrders />,
    },
  ];

  const ActiveComponents = useCallback(
    () => profileComponents[profileLink].component,
    [profileLink]
  );

  useEffect(()=>{
    dispatch(getMyOrders())
  }, [])

  return (
    <section id="profile">
      <div className="container">
        <div className="profile-container">
          <div className="profile-info">
            <div className="profile-img">
              <img src={image} alt={name} />
            </div>
            <div>
              <h1 className="heading-3">{name}</h1>
              <p>{email}</p>
            </div>
          </div>
          <ul className="profile-links">
            <li className={`profile-link ${profileLink === 0?'profile-link-active':''}`} onClick={() => setProfileLink(0)}>
              my profile
            </li>
            <li className={`profile-link ${profileLink === 1?'profile-link-active':''}`} onClick={() => setProfileLink(1)}>
              my orders
            </li>
            {/* {isAdmin && (
              <li
                className="profile-link"
                onClick={() => navigate("/dashboard")}
              >
                dashboard
              </li>
            )}
            <li className="profile-link" onClick={() => dispatch(logout())}>
              logout
            </li> */}
          </ul>
        </div>
        <ActiveComponents />
      </div>
    </section>
  );
};

export default Profile;
