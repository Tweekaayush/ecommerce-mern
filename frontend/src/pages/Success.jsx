import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCreatedOrder } from '../slices/orderSlice'

const Success = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(clearCreatedOrder())
  }, [])

  return (
    <div>Success</div>
  )
}

export default Success