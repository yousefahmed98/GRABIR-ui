import { axiosInstance } from "../../network/axiosInstance";

const INITIAL_VALUE = {
  offers: [],
  deals:[],
  offers_counter: 0,
};

export default function getOffersReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
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

      return (
        axiosInstance
          .put(`/offers/${action.payload.id}/`, action.payload)
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        axiosInstance
          .post("deals/", deal)
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        {
          ...state,
          offers: [...newOffers], // 1
          deals: [...newOffers],
          offers_counter: newOffers.length,
        }
      );
    case "DELETE_OFFER":
      const index = state.offers.indexOf(action.payload);
      if (index > -1) {
        state.offers.splice(index, 1);

        return (
          axiosInstance
            .delete(`/offers/${action.payload.id}/`)
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
