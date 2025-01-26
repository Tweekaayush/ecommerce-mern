import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getProducts } from "../slices/productSlice";

const Browse = () => {
  const {data: {products, categories, totalPages}} = useSelector(state=>state.products)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('');
  const {pathname} = useLocation()


  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(()=>{
    dispatch(getProducts({page, category: currentCategory}))
  }, [page, currentCategory])
  
  useEffect(()=>{
    dispatch(getAllCategories())
  }, [])

  return (
    <>
      <section id="browse-filters">
        <div className="container">
          <div className="browse-container">
            <h4 className="heading-3">Categories</h4>
            <div className="category-container">
              <span className={currentCategory === "" ? "active-category" : ""} onClick={()=>setCurrentCategory('')}>All</span>
              {categories.map((category) => {
                return (
                  <span
                    key={category}
                    className={
                      currentCategory === category ? "active-category" : ""
                    }
                    onClick={()=>[setCurrentCategory(category), setPage(1)]}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
            <h4 className="heading-3">Price</h4>
          </div>
        </div>
      </section>
      <section id="browse-results">
        <div className="container">
          {products
            .map((product) => {
              return (
                <ProductCard key={product._id} {...product} slider={false} />
              );
            })}
        </div>
      </section>
      <section id="pagination">
        <div className="container">
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </>
  );
};

export default Browse;
