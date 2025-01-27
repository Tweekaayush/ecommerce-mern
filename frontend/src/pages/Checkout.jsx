import React, { useEffect, useState, useCallback } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useSelector} from 'react-redux'
import ShippingAddress from '../components/ShippingAddress'
import CheckoutCart from '../components/CheckoutCart'
import Payment from '../components/Payment'

const Checkout = () => {

  const {itemsPrice, shippingPrice, taxPrice, totalPrice} = useSelector(state=>state.cart)
  const [step, setStep] = useState(1)


  const checkoutSteps = [
    {
      name: 'Cart',  
      component: <CheckoutCart/>,
      func: function(){
        console.log('cart')
      }
    },
    {
      name: 'Address',
      component: <ShippingAddress />,
      func: function(){
        console.log('shipping')
      }
    },
    {
      name: 'Payment',
      component: <Payment/>,
      func: function(){
        console.log('payment')
      }
    },
  ]

    const ActiveComponent = useCallback(() => { return checkoutSteps[step-1]?.component}, [step])

    const handleNextStep = () =>{
      if(step > checkoutSteps.length) return
      checkoutSteps[step-1].func()
      setStep(p=>p+1)
    }

  useEffect(()=>{
    
  }, [step])

  return (
    <>
      <CheckoutSteps stepNo={step} checkoutSteps={checkoutSteps} setStep={setStep}/>
      <section id="checkout">
        <div className="container">
          <ActiveComponent />
          <div className="checkout-summary">
            <h1 className="heading-3">cart summary</h1>
            <div>
              <h4 className='heading-4'>Items Price</h4>
              <p>${itemsPrice}</p>
            </div>
            <div>
              <h4 className='heading-4'>Shipping price</h4>
              <p>${shippingPrice}</p>
            </div>
            <div>
              <h4 className='heading-4'>Tax Price</h4>
              <p>${taxPrice}</p>
            </div>
            <div>
              <h4 className='heading-4'>total price</h4>
              <p>${totalPrice}</p>
            </div>
            <button className='button-1' onClick={handleNextStep}>Checkout</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout