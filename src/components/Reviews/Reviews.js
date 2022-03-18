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
  }, []);

  const current_user = localStorage.getItem("id");
  return (
    <>
      {current_user == props.rateReviewUser ? (
                  <div className="mt-5">
          {props.rateReviewStars === 1 ? (
            <>
            <h6 className="text-danger"> 1/5 <span className="text-danger">Very bad</span></h6>
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
            </>
          ) : props.rateReviewStars === 2 ? (
            <>
             <h6 className="text-danger"> 2/5 <span className="text-danger">Bad</span></h6>
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
            </>
          ): props.rateReviewStars === 3 ?(
              <>
               <h6 className="text-primary"> 3/5 <span className="text-primary">Good</span></h6>
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />

              </>
          ) : props.rateReviewStars === 4 ?(
            <>
             <h6 className="text-success"> 4/5 <span className="text-success">Very Good</span></h6>
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#e4e5e9"} size={30} />
            </>
          ): (
            <>
             <h6 className="text-success"> 5/5 <span className="text-success">Excellent</span></h6>
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
           
            </>
          )}
            <h5 className="text-secondary text-capitalize mt-3"> <span className="text-dark">Review:</span> {props.rateReviewMsg}</h5>
            <hr />
        </div>
      ) : null}
    </>
  );
}
