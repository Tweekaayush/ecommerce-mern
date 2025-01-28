import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const OrderListItem = ({
    _id,
    isDelivered,
    totalPrice,
    createdAt,
    isPaid,
    paidAt,
    admin,
    user,
    deliveredAt
  }) => {
    const navigate = useNavigate()
  return (
    <div
      className="order-item-container"
      onClick={(e) => [e.stopPropagation(), navigate(`/order/${_id}`)]}
    >
      <p className="ellipses">{_id}</p>
      {admin && <p className='ellipses'>{user?.name}</p>}
      <p className="ellipses">{createdAt.substring(0, 10)}</p>
      <p className="ellipses">${totalPrice}</p>
      {isPaid?<p className="ellipses">{paidAt.substring(0, 10)}</p>:<IoClose className={isPaid?'success':'failed'}/>}
      {isDelivered?<p className="ellipses">{deliveredAt.substring(0, 10)}</p>:<IoClose className={isDelivered?'success':'failed'}/>}
    </div>
  )
}

export default OrderListItem