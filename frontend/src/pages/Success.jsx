import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateOrderToPaid } from '../slices/orderSlice'
import { RiCheckboxCircleFill } from "react-icons/ri";
import {useLocation, useNavigate, useParams} from 'react-router-dom'

const Success = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()

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