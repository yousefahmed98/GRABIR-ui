import axios from "axios";
import { setLoaderAction } from "./setLoader";
import { updateStateAction } from "./updateState";

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
        .then((res2) => {
          const offers = res2.data;
          return offers.map(offer => {
             deals.map(deal => {
              if (deal.offer === offer.id) {
                console.log("deal oofer iddddd: ", deal.offer)
                console.log("offer iddddd: ", offer.id)

                console.log("matchiiiinnnnggggggggg", offer);
                 dispatch({
                  type: "LIST_DEALS",
                  payload: res.data,
                });
                // updateStateAction
                // dispatch(updateStateAction(deal));

                 
              }
            });
            dispatch(setLoaderAction(false));

          });
         

        })
        .catch((err) => console.log(err));
    });
};
