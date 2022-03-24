import * as React from "react";
import { useEffect, useState } from "react";
import "./card.css";
import { useSelector, useDispatch } from "react-redux";

import {
  updateStateAction,
  deleteOffer,
} from "../../Store/Actions/updateState";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../network/axiosInstance";
import { Link } from "react-router-dom";
function MyCard(props) {
  const updateOfferStatusRejected = (offer) => {
    props.dispatch(deleteOffer(offer));
    // window.alert("This offer is rejected!");
    // history.push("/offers");
  };
  const updateOfferStatusAccepted = (offer, reciverid) => {
    props.handleNotification(
      "accepts your offer",
      reciverid,
      localStorage.getItem("username")
    );
    props.dispatch(updateStateAction(offer, true));
    // dispatch(deleteOffer(offer));
    // window.alert("This offer if accepted successfully!");
    // history.push("/offers");
  };

  return (
    <div className="offerCard row">
      <div className="col-lg-6">
        <img src={props.img} className="card__image" />
      </div>
      <div className="p-3 col-lg-6">
        <div className="p-3 my-2">
          <img src={props.ownerProfilePic} className="card__prof_pic" height="60" alt="offer owner" loading="lazy" />

          <span className="card__title">{props.title}</span>
        </div>
        <div className="p-3 my-2 bbb">
          <p className="card__description">{props.description}</p>
        </div>
        <div className=" text-left p-4">
          <div>
          <span className="details"> from:</span> <span className="mx-2"> {props.from} </span>
          </div>
          <div>
          <span className="details"> to:</span> <span className="mx-2"> {props.to}  </span>
          </div>
          <div>
          <span className="details"> price:</span> <span className="mx2"> {props.price}  </span>
          </div>
          <div>          
            <span className="details"> Delivery date:</span> <span className="mx-2"> {props.delivery_date}  </span>
          </div>
        </div>
        <div className=" text-center">
          <Link
            className="btn btn-primary card__btn me-5 "
            onClick={() => updateOfferStatusAccepted(props.offer,props.offer.offer_owner)}
            to="/deals"
          >
            Accept
          </Link>
          <Link
            className="card__btn ms-5 "
            onClick={() => updateOfferStatusRejected(props.offer)}
            to="/offers"
          >
            Reject
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OffersCard(props) {
  const socket = useSelector((state) => state.SOCKET.socket);
  const dispatch = useDispatch();
  const [newNotifyObj, setNewNotifyObj] = useState({
    body: "",
    from_user_name: null,
    to_user: null,
  });

  const handleNotification = (type, reciverId, senderName) => {
    //lmafrod acreate notification object f db
    //type hwa body
    socket.emit("sendNotification", {
      senderName: senderName,
      reciverId: reciverId,
      type,
    });

    setNewNotifyObj({
      ...newNotifyObj,
      body: type,
      from_user_name: localStorage.getItem("username"),
      from_user: localStorage.getItem("id"),
      to_user: reciverId,
    });
  };
  useEffect(() => {
    //post request new notification object
    if (newNotifyObj.body.length > 0) {
      axiosInstance
        .post("/notification/notifications/", newNotifyObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          console.log(newNotifyObj);
        })
        .catch((err) => console.log(err));
    }
  }, [newNotifyObj]);
  /////////////////////////////////////////////////////////////////////////////

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {/* add post */}
          <div className="pt-5">
            {props.offers.map((offer, index) => {
              if (!offer.status) {
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
                      handleNotification={handleNotification}
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
