import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../slices/productSlice";

const ProductListItem = ({ _id, name, price, category, brand}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading} = useSelector(state=>state.products)

  const handleDelete = () =>{
    if(!loading){
      dispatch(deleteProduct(_id))
    }
  }

  return (
    <div
      className="product-item-container"
    >
      <p className="ellipses">{_id}</p>
      <p className="ellipses">{name}</p>
      <p className="ellipses">${price}</p>
      <p className="ellipses">{category}</p>
      <p className="ellipses">{brand}</p>
      <RiEditBoxLine onClick={(e)=>[e.stopPropagation(), navigate(`/product/${_id}/edit`)]}/>
      <LuTrash className="failed" onClick={handleDelete}/>
    </div>
  );
};

export default ProductListItem;
