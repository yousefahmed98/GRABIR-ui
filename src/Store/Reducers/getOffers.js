import { axiosInstance } from "../../network/axiosInstance";

const INITIAL_VALUE = {
  offers: [],
  deals: [],
  offersList: [],
  offers_counter: 0,
};

export default function getOffersReducer(state = INITIAL_VALUE, action) {


  switch (action.type) {
    case "LIST_OFFERS":
      return {
        ...state,
        offersList: action.payload,
      };
    case "GET_OFFERS":
      let newOffersState = [...state.offers, ...action.payload];
      return {
        ...state,
        offers: [...newOffersState], // 1
        offers_counter: newOffersState.length,
      };
    case "UPDATE_OFFER_STATE":
      
      action.payload = { ...action.payload, status: action.booleanVar };
      const updatedOffers = state.offers.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
      let newOffers = [...updatedOffers];

      let deal = {
        offer: action.payload.id,
      };
      let newdealssState = [...state.deals, action.payload];
      // form_data.preventDefault();

      return (
        axiosInstance
          .put(`/offers/${action.payload.id}/`, action.payload, {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        axiosInstance
          .post("/deals/", deal, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        {
          ...state,
          offers: [...newOffers], // 1
          deals: [...newdealssState],
          offers_counter: newOffers.length,
        },
        console.log("deallllllllls222: ", state.deals)
      );

    case "DELETE_OFFER":
      const index = state.offers.indexOf(action.payload);
      if (index > -1) {
        state.offers.splice(index, 1);

        return (
          axiosInstance
            .delete(`/offers/${action.payload.id}/`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err)),
          {
            ...state,
            offers: state.offers,
            offers_counter: state.offers.length,
          }
        );
      } else {
        console.log("does not exist before");
        return {
          ...state,
          offers_counter: state.offers.length,
        };
      }
    default:
      return state;
  }
}
