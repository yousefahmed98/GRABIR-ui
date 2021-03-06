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
  }, [dispatch]);
  // console.log("test user",rates)

  const [rating, setRating] = useState({
    stars: "",
    review: "",
    reviewerName: localStorage.getItem("id"),
    user: props.offerOwner,
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
  const getid = () => {
    console.log("sssssssssssssssssssssssssssssssssss");
    axios
      .get(`http://127.0.0.1:8000/posts/posts/${props.PostID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (props.offerOwner == localStorage.getItem("id"))
          setRating({ ...rating, user: res.data.user });

      });
  };

  return (
    <div className="mt-2">
      <>
        {window.location.pathname === "/deals" ||
        window.location.pathname === "/deals/" ? (
          <>
            <form onSubmit={(e) => submitForm(e)}>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <>
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
                  </>
                );
              })}
              <input
                placeholder="Leave your message"
                type="text-area"
                name="review"
                onChange={(e) => onChange(e)}
              />
              <button
                type="submit"
                className="btn btn-info bt-lg ms-2 reviewbtn "
                onMouseEnter={() => getid()}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </form>
          </>
        ) : null}

        {window.location.pathname === "/rate/" ||
        window.location.pathname === "/rate" ||
        window.location.pathname === "/myprofile" ||
        window.location.pathname === "/myprofile/" ? (
          <>
            {rates.map((rate) => {
              return (
                <>
                  <Reviews
                    rateReviewMsg={rate.review}
                    rateReviewUser={rate.user}
                    rateReviewID={rate.id}
                    rateReviewStars={rate.stars}
                  />
                </>
              );
            })}
          </>
        ) : null}
      </>
    </div>
  );
}
