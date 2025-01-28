import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";

const OrderListItem = ({
    _id,
    isDelivered,
    totalPrice,
    createdAt,
    isPaid,
    paidAt,
    admin,
    user
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
      <p className="ellipses">{isPaid ? paidAt.substring(0, 10) : "not paid"}</p>
      <p className="ellipses">{isDelivered ? "delivered" : "not delivered"}</p>
    </div>
  )
}

export default OrderListItem