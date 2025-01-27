import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyOrders from "../components/MyOrders";
import { logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../slices/orderSlice";
import UpdateProfile from "../components/UpdateProfile";


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
      component: <></>,
    },
    {
      name: "update profile",
      component: <UpdateProfile />,
    },
    {
      name: "orders",
      component: <MyOrders />,
    },
  ];

  const ActiveComponents = useCallback(
    () => profileComponents[profileLink].component,
    [profileLink]
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

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
            {profileComponents.map((p, i) => {
              return (
                <li
                  key={p.name}
                  className={`profile-link ${
                    profileLink === i ? "profile-link-active" : ""
                  }`}
                  onClick={() => setProfileLink(i)}
                >
                  {p.name}
                </li>
              );
            })}
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
