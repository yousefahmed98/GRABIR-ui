import * as React from "react";
import "./DealsCard.css";
import { useDispatch } from "react-redux";
import DealCountDown from "../../components/countDown/countdown";
import StarRating from "../StarRating/StarRating";
import { getOffersAction } from "../../Store/Actions/getOffers";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../card/card.css";
import { deleteOffer } from "../../Store/Actions/updateState";

function MyCard(props) {
  function deleteDeal() {
    props.dispatch(deleteOffer(props.offer));
  }
  return (
    <div className="offerCard ">
      <div className="">
        <img src={props.img} class="card__image" />
      </div>
      <div className="p-3 ">
        <div className=" pt-3 mb-5  ">
          <img
            src={props.ownerProfilePic}
            className="me-2 ps-2  card__prof_pic"
            height="60"
            alt="offer owner"
            loading="lazy"
          />
          <span className="card__title">{props.title}</span>
          <div className="smallText p-2">created on: {props.delivery_date} </div>
        </div>
        <p className="ded p-2 mt-5 countt  ">Deal Details</p>
        <div className="p-3 tet">
          <p className="card__description">{props.description}</p>
        </div>
        <div className=" text-left p-4">
          <div className=" detailsss p-2">
            <span className="details"> from:</span>{" "}
            <span className="mx-2"> {props.from} </span>
          </div>
          <div className=" detailsss p-2">
            <span className="details"> to:</span>{" "}
            <span className="mx-2"> {props.to} </span>
          </div>
          <div className=" detailsss p-2">
          <span className="details"> price:</span>{" "}
          <span className="mx-2 price p-2 rounded-pill ">
            {" "}
            {props.price} ${" "}
          </span>
          </div>
          <div className=" detailsss p-2">
          <span className="details"> Delivery date:</span>{" "}
          <span className="mx-2"> {props.delivery_date} </span>
          </div>
        </div>
        <div className="text-center p2">
          <p className="details timerrr mt-2 counter">Countdown Timer</p>
          <DealCountDown date={props.delivery_date} />
        </div>
        <div className=" text-center">
          {props.offer.offer_owner == localStorage.getItem("id") ? (
            <button
              className="card__btn "
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Mark as Completed
            </button>
          ) : (
            <div>
              <button
                className="card__btn "
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Rate {props.offer.offer_owner_name}
              </button>
              <Link to="/paypal">
                <button
                  className="card__btn ms-5 "
                  onClick={() => deleteDeal()}
                >
                  {" "}
                  Checkout{" "}
                </button>
              </Link>
            </div>
          )}
        </div>
        <div
          className="modal"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header ">
                <h5 className="modal-title counter" id="staticBackdropLabel">
                  Send Review about {props.offer.offer_owner_name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <StarRating
                  offerOwner={props.offer.offer_owner}
                  PostID={props.offer.post}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function DealsCard(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getOffersAction());
  }, [dispatch]);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {/* add post */}
          <div className="pt-5">
            {props.deals.map((offer, index) => {
              if (offer.status) {
                return (
                  <div className="wrapper mt-5 p-2" key={index}>
                    <MyCard
                      offer={offer}
                      dispatch={dispatch}
                      img={offer.postPic}
                      title={offer.offer_owner_name}
                      description={offer.details}
                      ownerProfilePic={offer.ownerProfilePic}
                      to={offer.to_region}
                      from={offer.from_region}
                      price={offer.price}
                      delivery_date={offer.delivery_date}
                      created_at={offer.created_at}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
