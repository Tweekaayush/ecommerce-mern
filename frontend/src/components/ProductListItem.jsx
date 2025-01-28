import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";

const ProductListItem = ({ _id, name, price, category, brand}) => {
  return (
    <div
      className="product-item-container"
    >
      <p className="ellipses">{_id}</p>
      <p className="ellipses">{name}</p>
      <p className="ellipses">${price}</p>
      <p className="ellipses">{category}</p>
      <p className="ellipses">{brand}</p>
      <RiEditBoxLine/>
      <LuTrash className="failed"/>
    </div>
  );
};

export default ProductListItem;
