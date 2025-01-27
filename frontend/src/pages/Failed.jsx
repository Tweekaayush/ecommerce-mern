import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearOrderErrors } from '../slices/orderSlice'

const Failed = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(clearOrderErrors())
  }, [])

  return (
    <div>Failed</div>
  )
}

export default Failed