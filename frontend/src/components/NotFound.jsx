import React from 'react'
import { CiFaceFrown } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <section id="not-found">
        <div className="container">
            <CiFaceFrown/>
            <h1 className="heading-3">404 - Page Not Found</h1>
            <p className="body-text-1">
                The page you are looking for might have been removed, had its name changed or is temporarily unavailable
            </p>
            <button className="button-1" onClick={()=>navigate('/')}>Go to homepage</button>
        </div>
    </section>
  )
}

export default NotFound