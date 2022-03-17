const intial_value = {
    rateList: [],
}

export default function getRateReducer (state = intial_value, action){
    switch (action.type) {
        case 'GET_RATE':
            return {
                ...state,
                rateList: action.payload,
            }
        default:
            return state
    }
}
