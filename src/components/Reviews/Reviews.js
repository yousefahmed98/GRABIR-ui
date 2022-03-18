import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";
import { useDispatch } from "react-redux";
import { getRate } from "../../Store/Actions/getRate";
import { useSelector } from "react-redux";


export default function Reviews(props) {
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.RATE.rateList);
  useEffect(() => {
    dispatch(getRate());
    //   console.log("ratesssss", rates)
  }, []);
  //   console.log("test user",rates)
  const current_user = localStorage.getItem("id");
  return (
    <div className="reviews">
      {/* <label>
            <input type="radio" name="rating" />
            <FaStar className="star" color={"#ffc107"} size={70} />
          </label> */}
      {/* check for user review only  */}

      {current_user == props.rateReviewUser ? (
                  <div className="text-center mt-5">
          {props.rateReviewStars === 1 ? (
            <>
              <FaStar className="star" color={"#ffc107"} size={70} />
              <FaStar className="star" color={"e4e5e9"} size={70} />
              <FaStar className="star" color={"e4e5e9"} size={70} />
              <FaStar className="star" color={"e4e5e9"} size={70} />
              <FaStar className="star" color={"e4e5e9"} size={70} />
            </>
          ) : props.rateReviewStars === 2 ? (
            <>
              <FaStar className="star" color={"#ffc107"} size={70} />
              <FaStar className="star" color={"#ffc107"} size={70} />
              <FaStar className="star" color={"#e4e5e9"} size={70} />
              <FaStar className="star" color={"#e4e5e9"} size={70} />
              <FaStar className="star" color={"#e4e5e9"} size={70} />
            </>
          ): props.rateReviewStars === 3 ?(
              <>
              <FaStar className="star" color={"#ffc107"} size={70} />
              <FaStar className="star" color={"#ffc107"} size={70} />
              <FaStar className="star" color={"#ffc107"} size={70} />
              <FaStar className="star" color={"#e4e5e9"} size={70} />
              <FaStar className="star" color={"#e4e5e9"} size={70} />

              </>
          ) : props.rateReviewStars === 4 ?(
            <>
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#e4e5e9"} size={70} />
            </>
          ): (
            <>
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            <FaStar className="star" color={"#ffc107"} size={70} />
            </>  
          )}
            { console.log(rates,"ratessssssssssss")}
            <p className="text-info mt-4 text-center"> {props.rateReviewMsg}</p>
            <hr />
        </div>
      ) : null}
    </div>
  );
}
