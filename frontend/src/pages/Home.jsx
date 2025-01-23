import React from 'react'
import Hero from '../components/Hero'
import TrendingCategories from '../components/TrendingCategories'
import BestSeller from '../components/BestSeller'
import PromotionBanner from '../components/PromotionBanner'
import TrendingProducts from '../components/TrendingProducts'

const Home = () => {
  return (
    <>
      <Hero/>
      <TrendingProducts/>
      <TrendingCategories/>
      <PromotionBanner/>
      <BestSeller/>
    </>
  )
}

export default Home