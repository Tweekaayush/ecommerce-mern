import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../slices/userSlice";
import Loader from '../components/Loader'
import WishlistCard from "../components/WishlistCard";

const Wishlist = () => {
  const {
    loading,
    error,
    data: {
      wishlist
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlist());
    document.title = 'Your Wishlist'
  }, []);

  return !loading ? (
    <section id="wishlist">
      <div className="container">
        <h1 className="heading-3">Wishlist</h1>
        {wishlist?.length !==0?<div className="wishlist-items">
            {
              wishlist?.map((item)=>{
                return <WishlistCard key={item.product} {...item}/>
              })
            }
        </div>:<p className="body-text-1">Your wishlist is empty</p>}
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default Wishlist;
