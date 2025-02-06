import React, { useEffect, useState } from "react";
import UserListItem from "../components/UserListItem";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUsersErrors, getAllUsers } from "../slices/userSlice";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";
import Skeleton from "../components/Skeleton";

const UsersList = () => {
  const navigate = useNavigate();
  const {
    loading,
    data: { usersListAdmin, totalPages, page:currentPage },
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(()=>{
    if(currentPage !== page) setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    dispatch(getAllUsers(page));
  }, [page]);

  useEffect(()=>{
    document.title='Users List'
  }, [])

  return (
    <section id="user-list">
      <div className="container">
        <h5 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard /
        </h5>
        <h1 className="heading-5">Users List</h1>
        <div className="user-list-container">
          <div className="user-list-head">
            <span>id</span>
            <span>name</span>
            <span>email</span>
            <span>admin</span>
          </div>
          { !loading ?
            usersListAdmin?.map((user) => {
              return <UserListItem key={user._id} {...user} />;
            }):
            new Array(6).fill(0).map((_, i)=>{
              return <Skeleton cls="list-item-skeleton"/>
            })
          }
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  )
};

export default UsersList;
