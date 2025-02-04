import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearOrderErrors } from '../slices/orderSlice'
import { RiErrorWarningFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'

const Failed = () => {

  const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      document.title = 'Payment Failed'
    },[])

  return (
    <section id="failed">
      <div className="container">
          <RiErrorWarningFill />
          <h1 className="heading-2">Payment failed!</h1>
          <p className='body-text-1'>Something went wrong with your order's payment. Your order has been placed. You can pay on delivery</p>
          <button className="button-1" onClick={()=>navigate('/profile')}>Check your orders</button>
      </div>
    </section>
  )
}

export default Failed