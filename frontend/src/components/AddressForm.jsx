import React, { useState } from 'react'

const AddressForm = ({submitFunction}) => {

    const [formData, setFormData] = useState({
        address: 'A-101, Milan Vihar 1, Abhay Khand 3, Indirapuram',
        city: 'Ghaziabad',
        postalCode: '201014',
        country: 'India'
     })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        submitFunction(formData)
    }


  return (
    <form action="" className='address-form' onSubmit={handleSubmit}>
        <label htmlFor="address" className="form-label">
            <input
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={formData.address}
            />
            <span>address</span>
          </label>
          <label htmlFor="postalCode" className="form-label">
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={handleChange}
              value={formData.postalCode}
            />
            <span>postal code</span>
          </label>
          <label htmlFor="city" className="form-label">
            <input
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={formData.city}
            />
            <span>city</span>
          </label>
          <label htmlFor="country" className="form-label">
            <input
              type="text"
              name="country"
              id="country"
              onChange={handleChange}
              value={formData.country}
            />
            <span>country</span>
          </label>
          <input type="submit" value="Update" className='button-1' />
    </form>
  )
}

export default AddressForm