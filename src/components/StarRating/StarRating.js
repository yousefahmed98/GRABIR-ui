import { RateReview } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getRate } from "../../Store/Actions/getRate";
import { useDispatch } from "react-redux";
import Reviews from "../Reviews/Reviews";

export default function StarRating(props) {
  // const history = useHistory();
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.RATE.rateList);
  useEffect(() => {
    dispatch(getRate());
    // console.log("ratesssss", rates)
  }, []);
  // console.log("test user",rates)

  //   rates.map((rate) => (
  //     console.log("user id is",rate.user)
  // )
  // )
  ///////////////////////////////////////////////////////////////////////////////
  // console.log(props.offerOwner, "offer Owner id")
  const [rating, setRating] = useState({
    stars: "",
    review: "",
    reviewerName: localStorage.getItem("id"), // logged in user
    user: props.offerOwner, // offer user id
  });
  const [hover, setHover] = useState();
  const onChange = (e) =>
    setRating({ ...rating, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/rate/", rating)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  {
    console.log(window.location.pathname);
  }
  return (
    <div className="mt-2">
      {window.location.pathname === "/deals" ||
      window.location.pathname === "/deals/" ? (
        <>
          <form onSubmit={(e) => submitForm(e)}>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() =>
                      setRating({
                        ...rating,
                        stars: ratingValue,
                      })
                    }
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating.stars)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            <input
              placeholder="Leave your message"
              type="text-area"
              name="review"
              onChange={(e) => onChange(e)}
              className="ms-2"
            />
            <button type="submit" className="btn btn-info bt-lg ms-2">
              Submit
            </button>
          </form>
        </>
      ) : null}

      {window.location.pathname === "/rate/" ||
      window.location.pathname === "/rate" ? (
        <>
          {rates.map((rate) => {
            return (
              <Reviews
                rateReviewMsg={rate.review}
                rateReviewUser={rate.user}
                rateReviewID={rate.id}
                rateReviewStars={rate.stars}
              />
            );
          })}
        </>
      ) : null}
    </div>
  );
}
