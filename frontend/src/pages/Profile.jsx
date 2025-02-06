import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyOrders from "../components/MyOrders";
import { logout, updateUserProfile } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../slices/orderSlice";
import UpdateProfile from "../components/UpdateProfile";
import {
  LuShoppingCart,
  LuUser,
  LuLock,
  LuLogOut,
  LuLayoutDashboard,
} from "react-icons/lu";
import AddressForm from "../components/AddressForm";
import Loader from "../components/Loader";

const UpdateAddress = () => {
  const dispatch = useDispatch();
  const updateForm = (data) => {
    console.log(data);
    dispatch(updateUserProfile({ fullAddress: { ...data } }));
  };
  return (
    <div className="update-form-container">
      <h1 className="heading-3">Address</h1>
      <div className="address-form-container">
        <AddressForm submitFunction={updateForm} />
      </div>
    </div>
  );
};

const AccountInfo = () => {
  const {
    user: { name, image, _id, email, isAdmin, createdAt, fullAddress },
  } = useSelector((state) => state.user.data);
  return (
    <div className="account-info-container">
      <h1 className="heading-3">Account</h1>
      <div className="account-content">
        <div className="account-info">
          <h5 className="heading-4">Name</h5>
          <p className="body-text-3">{name}</p>
        </div>
        <div className="account-info">
          <h5 className="heading-4">Email</h5>
          <p className="body-text-3"> {email}</p>
        </div>
        <div className="account-info">
          <h5 className="heading-4">Address</h5>
          <p className="body-text-3">
            {fullAddress?.address && (
              <>
                {fullAddress?.address}, {fullAddress?.postalCode}
                <br />
                {fullAddress?.city}, {fullAddress?.country}
              </>
            )}
          </p>
        </div>
        <div className="account-info">
          <h5 className="heading-4">Joined On</h5>
          <p className="body-text-3">{createdAt.substring(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const {
    loading,
    data: {
      user: { name, image, _id, email, isAdmin },
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileLink, setProfileLink] = useState(0);

  const profileComponents = [
    {
      name: "account",
      component: <AccountInfo />,
      icon: <LuUser />,
    },
    {
      name: "privacy",
      component: <UpdateProfile />,
      icon: <LuLock />,
    },
    {
      name: "address",
      component: <UpdateAddress />,
      icon: <LuLock />,
    },
    {
      name: "orders",
      component: <MyOrders />,
      icon: <LuShoppingCart />,
    },
  ];

  const ActiveComponents = useCallback(
    () => profileComponents[profileLink].component,
    [profileLink]
  );

  useEffect(()=>{
    document.title = 'Profile'
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
              <h1 className="heading-4">{name}</h1>
              <p className="body-text-3">{email}</p>
            </div>
          </div>
          <ul className="profile-links">
            {profileComponents.map((p, i) => {
              return (
                <li
                  key={p.name}
                  className={`profile-link ${
                    profileLink === i ? "profile-link-active" : ""
                  }`}
                  onClick={() => setProfileLink(i)}
                >
                  {p.icon}
                  <span>{p.name}</span>
                </li>
              );
            })}
            {isAdmin && (
              <li
                className="profile-link"
                onClick={() => navigate("/dashboard")}
              >
                <LuLayoutDashboard />
                <span>dashboard</span>
              </li>
            )}
            <li className="profile-link" onClick={() => dispatch(logout())}>
              <LuLogOut />
              <span>logout</span>
            </li>
          </ul>
        </div>
        <div className="profile-content">
          <ActiveComponents />
        </div>
      </div>
    </section>
  )
};

export default Profile;
