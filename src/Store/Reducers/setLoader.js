const INITIAL_VALUE={
    isloading:true,

}
//component function
export default function LoaderReducer(state = INITIAL_VALUE,action) {
 //according to action type change state specific value or default intial state or previous state
 switch(action.type){
    case "SET_LOADER":
    return (
        {
            ...state,
            isloading:action.payload,
        }
    )
    default:
        return state;
} 
}


