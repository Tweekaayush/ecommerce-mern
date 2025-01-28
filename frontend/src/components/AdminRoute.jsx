import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
    const location = useLocation()
    const {user: {_id, isAdmin}} = useSelector(state=>state.user.data)

  return _id && isAdmin?<Outlet/>:<Navigate to='/login' replace={true} state={{previousURL: location.pathname}}/>
}

export default AdminRoute