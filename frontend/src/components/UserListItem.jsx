import React from 'react'
import { LuTrash } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { deleteUser, updateUser } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'

const UserListItem = ({
    _id,
    name,
    email,
    isAdmin
}) => {

    const dispatch = useDispatch()
    const handleDelete = (e) =>{
        e.stopPropagation()
        dispatch(deleteUser(_id))
    }

    const handleUserUpdate = (e) =>{
        e.stopPropagation()
        dispatch(updateUser({_id: _id}))
    }

  return (
    <div
          className="user-item-container"
        >
          <p className="ellipses">{_id}</p>
          <p className='ellipses'>{name}</p>
          <p className="ellipses" style={{textTransform: 'lowercase'}}>{email}</p>
          <p className="ellipses" style={{textTransform: 'lowercase'}}>{isAdmin?'admin':'user'}</p>
          {isAdmin?<span></span>:<button className='button-3' onClick={handleUserUpdate}>Make Admin</button>}
          <LuTrash onClick={handleDelete} className='failed'/>
        </div>
  )
}

export default UserListItem