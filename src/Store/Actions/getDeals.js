import axios from "axios";
import { setLoaderAction } from "./setLoader";
import { useSelector, useDispatch } from "react-redux";
import { getOffersReducer } from "../Reducers/getOffers";
// import { listOffersAction } from "./listOffers";
import store from "../store";
export const getDeals = () => async (dispatch) => {
  return axios
    .get("http://127.0.0.1:8000/deals/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      const deals = res.data;
      axios
        .get("http://127.0.0.1:8000/offers/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          const offers = res.data;
          // console.log("offer arraaayyyy", offers);
          // console.log("deals arrayyyy", deals);
          offers.map((offer, index) => {
            deals.map((deal, indx) => {
              if (offer.id == deal.offer) {
                console.log("matchiiiinnnnggggggggg", offer);
                dispatch({
                  type: "LIST_DEALS",
                  payload: res.data,
                });
                dispatch(setLoaderAction(false));
              }
            });
          });
        });

      // do stuff

      //second dispatch de mesh bt fire 8er lma l data trga3
      // ha set l data fl store
    })
    .catch((err) => console.log(err));
};
//action contains type(no3 action) ,payload (values)
