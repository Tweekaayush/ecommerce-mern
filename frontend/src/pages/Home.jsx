import { useEffect } from "react";
import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories";
import BestSeller from "../components/BestSeller";
import PromotionBanner from "../components/PromotionBanner";
import TrendingProducts from "../components/TrendingProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductErrors,
  getBestSellingProducts,
  getTrendingProducts,
} from "../slices/productSlice";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getTrendingProducts());
    dispatch(getBestSellingProducts());
  }, []);

  return !loading ? (
    <>
      <Hero />
      <TrendingProducts />
      <TrendingCategories />
      <PromotionBanner />
      <BestSeller />
    </>
  ) : (
    <Loader />
  );
};

export default Home;
