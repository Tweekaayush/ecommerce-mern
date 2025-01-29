import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCreatedOrder } from '../slices/orderSlice'
import { RiCheckboxCircleFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'

const Success = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(clearCreatedOrder())
  }, [])

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