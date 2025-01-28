import { useEffect } from "react";
import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories";
import BestSeller from "../components/BestSeller";
import PromotionBanner from "../components/PromotionBanner";
import TrendingProducts from "../components/TrendingProducts";
import { useDispatch, useSelector } from "react-redux";
import { clearProductErrors, getBestSellingProducts, getTrendingProducts } from "../slices/productSlice";
import { toast, Bounce } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch()

  const {error} = useSelector(state=>state.products)

  useEffect(()=>{
    if(error){
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
      dispatch(clearProductErrors())
    }
  }, [error])

  useEffect(()=>{
    dispatch(getTrendingProducts())
    dispatch(getBestSellingProducts())
  },[])

  return (
    <>
      <Hero />
      <TrendingProducts />
      <TrendingCategories />
      <PromotionBanner />
      <BestSeller />
    </>
  );
};

export default Home;
