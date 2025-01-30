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

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleDelete = (e) =>{
        e.stopPropagation()
        dispatch(deleteUser(_id))
    }

  return (
    <div
          className="user-item-container"
          onClick={()=>navigate(`/user/${_id}`)}
        >
          <p className="ellipses">{_id}</p>
          <p className='ellipses'>{name}</p>
          <p className="ellipses" style={{textTransform: 'lowercase'}}>{email}</p>
          <p className="ellipses" style={{textTransform: 'lowercase'}}>{isAdmin?'admin':'user'}</p>
          <LuTrash onClick={handleDelete} className='failed'/>
        </div>
  )
}

export default UserListItem