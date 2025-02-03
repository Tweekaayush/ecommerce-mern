import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getWishlist } from '../slices/userSlice'

const Wishlist = () => {


    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWishlist())
    }, [])

  return (
    <section id="wishlist">
        <div className="container">
            <h1 className="heading-3">Wishlist</h1>
        </div>
    </section>
  )
}

export default Wishlist