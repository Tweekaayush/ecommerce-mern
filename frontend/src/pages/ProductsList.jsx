import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearProductErrors, getProducts } from "../slices/productSlice";
import ProductListItem from "../components/ProductListItem";
import Pagination from "../components/Pagination";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    data: { products, totalPages, page: currentPage },
    error,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts({ page, category: "" }));
  }, [page]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      dispatch(clearProductErrors());
    }
  }, [error]);

  useEffect(() => {
    if (currentPage !== page) setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    document.title = "Products List";
  }, []);

  return (
    <section id="product-list">
      <div className="container">
        <h5 className="dashboard-link" onClick={() => navigate("/dashboard")}>
          dashboard /
        </h5>
        <div className="product-list-page-head">
          <h1 className="heading-5">Products List</h1>
          <button onClick={() => navigate("/product/create")}>create</button>
        </div>
        <div className="product-list-container">
          <div className="product-list-head">
            <span>id</span>
            <span>name</span>
            <span>price</span>
            <span>category</span>
            <span>brand</span>
          </div>
          {products?.map((product) => {
            return <ProductListItem key={product._id} {...product} />;
          })}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default ProductsList;
