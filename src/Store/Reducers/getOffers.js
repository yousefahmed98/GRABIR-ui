const INITIAL_VALUE = {
  offers: [],
  offers_counter: 0,
};

export default function getOffersReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "GET_OFFERS":
      return {
        ...state,
        offers: [...state.offers, action.payload], // 1
        offers_counter: state.offers.length + 1,
      };

    default:
      return state;
  }
}
