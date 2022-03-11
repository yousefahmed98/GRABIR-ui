const INITIAL_VALUE = {
    deals: [],
    deals_counter: 0,
  };
  
  export default function getDealsReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
      case "GET_DEALS":
        // if (!(action.payload === 0)) { // payload == value
        //   return {
        //     ...state,
        //     offers: [...state.offers, action.payload], // 1
        //     offers_counter: state.offers.length + 1, 
        //   };
        // } else {
        //   console.log("exist before");
        //   return {
        //     ...state,
        //     offers_counter: state.offers.length,
        //   };
        // }
  
      default:
        return state;
    }
  }
  