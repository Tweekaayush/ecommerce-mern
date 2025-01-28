import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../slices/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    data: {
      productDetails: {
        name,
        description,
        brand,
        category,
        price,
        countInStock,
      },
    },
  } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    countInStock: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({...formData, id}))
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  useEffect(()=>{
    if(loading === false && name !== undefined){
        setFormData({
            name,
            description,
            brand,
            category,
            price,
            countInStock,
          })
    }
  }, [loading])

  return (
    <section id="edit-product">
      <div className="container">
        <h5 className="dashboard-link" onClick={()=>navigate('/dashboard')}>dashboard/</h5>
        <h1 className="heading-3">Edit Product</h1>
        <form onSubmit={handleSubmit} className="edit-product-form">
          <label htmlFor="name" className="form-label">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            <span>Name</span>
          </label>
          <label htmlFor="description" className="form-label">
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
            <span>Description</span>
          </label>
          <label htmlFor="price" className="form-label">
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
            <span>Price</span>
          </label>
          <label htmlFor="brand" className="form-label">
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <span>brand</span>
          </label>
          <label htmlFor="category" className="form-label">
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            />
            <span>category</span>
          </label>
          <label htmlFor="countInStock" className="form-label">
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
            />
            <span>stock</span>
          </label>
          <input type="submit" value="update" className="button-1" />
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
