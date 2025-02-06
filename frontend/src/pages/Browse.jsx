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
import Skeleton from "../components/Skeleton";

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
    document.title = `Browse ${currentCategory}`;
  }, [page, currentCategory]);

  useEffect(() => {
    setCurrentCategory(category || "");
    setPage(1);
  }, [category]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <section id="browse-filters">
        <div className="container">
          <div className="browse-container">
            <h4 className="heading-3">Categories</h4>
            <div className="category-container">
              {!loading && (
                <span
                  className={currentCategory === "" ? "active-category" : ""}
                  onClick={() => [setCurrentCategory(""), setPage(1)]}
                >
                  All
                </span>
              )}
              {!loading
                ? categories?.map((category) => {
                    return (
                      <span
                        key={category}
                        className={
                          currentCategory === category ? "active-category" : ""
                        }
                        onClick={() => [
                          setCurrentCategory(category),
                          setPage(1),
                        ]}
                      >
                        {category}
                      </span>
                    );
                  })
                : new Array(6).fill(0).map((_, i) => {
                    return <Skeleton cls="category-skeleton" />;
                  })}
            </div>
          </div>
        </div>
      </section>
      <section id="browse-results">
        <div className="container">
          {!loading
            ? products?.map((product) => {
                return (
                  <ProductCard key={product._id} {...product} slider={false} />
                );
              })
            : new Array(5).fill(0).map((_, i) => {
                return <Skeleton cls="product-card-skeleton" />;
              })}
        </div>
      </section>
      <section id="pagination">
        <div className="container">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
};

export default Browse;
