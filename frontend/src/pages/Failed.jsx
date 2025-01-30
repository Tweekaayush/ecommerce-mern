import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearOrderErrors } from '../slices/orderSlice'
import { RiErrorWarningFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'

const Failed = () => {

  const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <section id="failed">
      <div className="container">
          <RiErrorWarningFill />
          <h1 className="heading-2">Order failed!</h1>
          <p className='body-text-1'>Something went wrong while placing your order.</p>
          <button className="button-1" onClick={()=>navigate('/')}>Back to home</button>
      </div>
    </section>
  )
}

export default Failed