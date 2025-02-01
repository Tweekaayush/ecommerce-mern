import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../slices/userSlice";
import Loader from "../components/Loader";

const UserInfo = () => {
  const { id } = useParams();

  const {
    loading,
    data: {
      userDetailsAdmin: { name, email, createdAt, fullAddress, isAdmin },
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  return !loading?(
    <section id="user-info">
      <div className="container">
        <h5 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard /
        </h5>
        <h1 className="heading-5">User Info</h1>
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
            <p className="body-text-3">{createdAt?.substring(0, 10)}</p>
          </div>
          <div className="account-info">
            <h5 className="heading-4">Role</h5>
            <p className="body-text-3">
              {isAdmin && isAdmin ? "Admin" : "User"}
            </p>
          </div>
          {!isAdmin && (
            <button
              className="button-1"
              style={{ marginTop: "16px", alignSelf: "flex-start" }}
              onClick={(e) => [
                e.stopPropagation(),
                dispatch(updateUser({ _id: id })),
              ]}
            >
              Make Admin
            </button>
          )}
        </div>
        <div className="users-orders"></div>
      </div>
    </section>
  ):<Loader/>
};

export default UserInfo;
