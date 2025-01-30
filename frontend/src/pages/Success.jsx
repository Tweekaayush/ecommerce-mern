import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCreatedOrder, updateOrderToPaid } from '../slices/orderSlice'
import { RiCheckboxCircleFill } from "react-icons/ri";
import {useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Success = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('order_id')

  console.log(new URLSearchParams(location.search))

  useEffect(()=>{
    if(id){
      dispatch(updateOrderToPaid(id))
    }
  }, [id])


  return (
    <section id="success">
      <div className="container">
        <RiCheckboxCircleFill/>
        <h1 className="heading-2">Thank You!</h1>
        <p className='body-text-1'>Your order has been placed successfully.</p>
        <button className="button-1" onClick={()=>navigate('/profile')}>go to your Orders</button>
      </div>
    </section>
  )
}

export default Success