import { useEffect } from "react";
import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories";
import BestSeller from "../components/BestSeller";
import PromotionBanner from "../components/PromotionBanner";
import TrendingProducts from "../components/TrendingProducts";
import { useLocation } from "react-router-dom";

const Home = () => {
  const {pathname} = useLocation()

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [pathname])
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
