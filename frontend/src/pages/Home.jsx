import { useEffect } from "react";
import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories";
import BestSeller from "../components/BestSeller";
import PromotionBanner from "../components/PromotionBanner";
import TrendingProducts from "../components/TrendingProducts";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBestSellingProducts, getProducts, getTrendingProducts } from "../slices/productSlice";

const Home = () => {
  const dispatch = useDispatch()

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
