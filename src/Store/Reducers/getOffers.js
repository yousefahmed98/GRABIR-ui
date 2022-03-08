const INITIAL_VALUE = {
    offers: [],
    offers_counter: 0,
  };
  
  export default function getOffersReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
      case "GET_OFFERS":
        // if (!(action.payload === 0)) { // payload == value
        //   return {
        //     ...state,
        //     fav: [...state.fav, action.payload], // 1
        //     counter: state.fav.length + 1, 
        //   };
        // } else {
        //   console.log("exist before");
        //   return {
        //     ...state,
        //     counter: state.fav.length,
        //   };
        // }
  
      default:
        return state;
    }
  }
  