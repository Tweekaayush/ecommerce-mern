import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { addReview } from "../slices/productSlice";
import { FaStar } from "react-icons/fa6";

const Reviews = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null)
  const [formErrors, setFormErrors] = useState('')
  const {
    data: {
      productDetails: { _id, reviews },
    },
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const validate = () =>{
    let err = ''
    if(!rating){
        err= 'Please rate the product before submitting the review!'
    }
    if(!review){
        err = 'Please write a review before submitting the review!'
    }

    setFormErrors(err)

    return !err
  }

  const writeReview = (e) => {
    e.preventDefault();
    if(validate()){
        dispatch(addReview({_id: _id, rating, comment: review}));
    }
  };

  return (
    <div className="reviews-container">
        <h1 className="heading-3">Write review</h1>
      <form className="review-form" onSubmit={writeReview}>
        <div>
        {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
            <label key={index} style={{padding: '4px'}}>
              <input
                type="radio"
                name="rating"
                style={{display: 'none'}}
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <FaStar
                size={18}
                className={currentRating <= (hover || rating)?'active-star':''}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}

              />
            </label>
          );
        })}
        </div>
        <input
          type="text"
          placeholder="Write a review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <p className="form-error-msg">{formErrors}</p>
        <input type="submit" value="Submit" className="button-2"/>
      </form>
      {reviews?.length !== 0 ? (
        <ul className="user-reviews">
          {reviews?.map((r) => {
            return (
              <div key={r?._id} className="review">
                <div className="review-head">
                  <h1>{r?.name}</h1>
                  <div>
                    <Rating rating={r?.rating} />
                    <p>{r?.rating.toFixed(1)}</p>
                  </div>
                </div>
                <p className="comment">{r?.comment}</p>
              </div>
            );
          })}
        </ul>
      ) : (
        <p className="body-text-1" style={{ textAlign: "center" }}>
          No reviews yet
        </p>
      )}
    </div>
  );
};

export default Reviews;
