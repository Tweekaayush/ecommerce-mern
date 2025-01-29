import { useEffect } from "react";
import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories";
import BestSeller from "../components/BestSeller";
import PromotionBanner from "../components/PromotionBanner";
import TrendingProducts from "../components/TrendingProducts";
import { useDispatch, useSelector } from "react-redux";
import { clearProductErrors, getBestSellingProducts, getTrendingProducts } from "../slices/productSlice";

const Home = () => {
  const dispatch = useDispatch()

  const {error} = useSelector(state=>state.products)

  useEffect(()=>{
    if(error){
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
