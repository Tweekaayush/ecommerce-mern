import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {

    const location = useLocation()
    const {user:{_id}} = useSelector(state=>state.user.data)

  return _id?<Outlet/>:<Navigate to='/login' replace={true} state={{previousURL: location.pathname}}/>
}

export default PrivateRoute