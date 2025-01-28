import React from 'react'
import { LuTrash } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../slices/userSlice'

const UserListItem = ({
    _id,
    name,
    email,
    isAdmin
}) => {

    const dispatch = useDispatch()

    const handleDelete = () =>{
        dispatch(deleteUser(_id))
    }

  return (
    <div
          className="user-item-container"
          
        >
          <p className="ellipses">{_id}</p>
          <p className='ellipses'>{name}</p>
          <p className="ellipses">{email}</p>
          <p className="ellipses">{isAdmin?'admin':'customer'}</p>
          <LuTrash onClick={handleDelete} className='failed'/>
        </div>
  )
}

export default UserListItem