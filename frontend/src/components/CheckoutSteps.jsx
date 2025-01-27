import React from "react";

const CheckoutSteps = ({ stepNo, checkoutSteps, setStep }) => {
  return (
    <section id="checkoutSteps">
      <div className="container">
        <span className="progress" style={{width: `calc(${(stepNo-1)/(checkoutSteps.length-1)}*100% - 40px)`}}></span>
        {
          checkoutSteps.map((step, i)=>{
            return <button
            key={i}
            className={`step ${
              stepNo === i+1 ? "current-step" : stepNo > i+1 ? "completed-step" : ""
            }`}
            disabled={stepNo < i+1}
            onClick={()=>setStep(i+1)}
          >
            {i+1}
          </button>    
          })
        }
      
      </div>
    </section>
  );
};

export default CheckoutSteps;
