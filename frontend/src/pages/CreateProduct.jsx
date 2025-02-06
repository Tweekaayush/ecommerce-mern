import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../slices/productSlice";
import Loader from "../components/Loader";
import { ImSpinner2 } from "react-icons/im";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    countInStock: "",
    image: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { loading } = useSelector((state) => state.products);

  const handleImages = (e) => {
    const file = Array.from(e.target.files)[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({ ...formData, image: reader.result });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.description !== "" &&
      formData.brand !== "" &&
      formData.category !== "" &&
      formData.price !== "" &&
      formData.countInStock !== "" &&
      formData.image !== ""
    ) {
      dispatch(createProduct({ ...formData }));
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        countInStock: "",
        image: "",
      })
    }
  };

  useEffect(() => {
    document.title = "Create a new Product";
  }, []);
  return (
    <section id="create-product">
      <div className="container">
        <h1 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard /
        </h1>
        <h1 className="heading-5">Create Product</h1>
        <form onSubmit={handleSubmit} className="create-product-form">
          <label htmlFor="name" className="form-label">
            <input
              type="text"
              name="name"
              id="name"
              value={formData?.name}
              onChange={handleChange}
              required
            />
            <span>Name</span>
          </label>
          <label htmlFor="description" className="form-label">
            <textarea
              type="text"
              name="description"
              id="description"
              rows={5}
              value={formData?.description}
              onChange={handleChange}
              required
            />
            <span>Description</span>
          </label>
          <label htmlFor="price" className="form-label">
            <input
              type="number"
              name="price"
              id="price"
              value={formData?.price}
              onChange={handleChange}
              required
            />
            <span>Price</span>
          </label>
          <label htmlFor="brand" className="form-label">
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData?.brand}
              onChange={handleChange}
              required
            />
            <span>brand</span>
          </label>
          <label htmlFor="category" className="form-label">
            <input
              type="text"
              name="category"
              id="category"
              value={formData?.category}
              onChange={handleChange}
              required
            />
            <span>category</span>
          </label>
          <label htmlFor="countInStock" className="form-label">
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              value={formData?.countInStock}
              onChange={handleChange}
              required
            />
            <span>stock</span>
          </label>
          <label htmlFor="image" className="form-label">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImages}
              required
            />
            <span>image</span>
          </label>
          {formData.image && (
            <div className="product-img-preview">
              <img src={formData?.image} alt={formData?.name} />
            </div>
          )}
          <button type="submit" disabled={loading} className="button-1">
            {loading ? <ImSpinner2 className="fa-spin" /> : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
