import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductErrors,
  getAllCategories,
  getProducts,
} from "../slices/productSlice";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";

const Browse = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  const {
    loading,
    data: { products, categories, totalPages },
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    dispatch(getProducts({ page, category: currentCategory }));
    document.title = `Browse ${currentCategory}`
  }, [page, currentCategory]);

  useEffect(()=>{
    setCurrentCategory(category||'')
    setPage(1)
  }, [category])

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return !loading ? (
    <>
      <section id="browse-filters">
        <div className="container">
          <div className="browse-container">
            <h4 className="heading-3">Categories</h4>
            <div className="category-container">
              <span
                className={currentCategory === "" ? "active-category" : ""}
                onClick={() => [setCurrentCategory(""), setPage(1)]}
              >
                All
              </span>
              {categories.map((category) => {
                return (
                  <span
                    key={category}
                    className={
                      currentCategory === category ? "active-category" : ""
                    }
                    onClick={() => [setCurrentCategory(category), setPage(1)]}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section id="browse-results">
        <div className="container">
          {products.map((product) => {
            return (
              <ProductCard key={product._id} {...product} slider={false} />
            );
          })}
        </div>
      </section>
      <section id="pagination">
        <div className="container">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </section>
    </>
  ) : (
    <Loader />
  );
};

export default Browse;
