import React, { useEffect, useRef } from 'react'
import { IoClose } from "react-icons/io5";
const Cart = ({cartStatus, setCartStatus}) => {

    const ref = useRef(0)

    const handleClickOutside = (e) =>{
        if(ref.current && !ref.current.contains(e.target)){
            setCartStatus(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('click', handleClickOutside, true)
        return ()=>window.removeEventListener('click', handleClickOutside, true)
    }, [])

  return (
    <div ref={ref} className={`cart-container ${cartStatus?'cart-active': ''}`}>
        <div className="cart-header">
            <h1>Cart</h1>
            <IoClose onClick={()=>setCartStatus(false)}/>
        </div>
        <div className="cart-content">
            <div className="cart-items"></div>
            <div className="cart-summary"></div>
        </div>
    </div>
  )
}

export default Cart