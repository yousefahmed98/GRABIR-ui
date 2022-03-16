const intial_value = {
  dealsList: [],
}

export default function getDealsReducer (state = intial_value, action){

  switch (action.type) {
      case 'LIST_DEALS':
          return {
              ...state,
              dealsList: action.payload,
          }
      default:
          return state
  }
}
// reducer check type of action and compare values 
