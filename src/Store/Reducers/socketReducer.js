//socket for notifications
import { io } from "socket.io-client";

const INITIAL_VALUE={
    socket:io("http://localhost:5000"),

}
//component function
export default function socketReducer(state = INITIAL_VALUE,action) {
 //according to action type change state specific value or default intial state or previous state
 switch(action.type){
    case "Connected_SOCKET":
    return (
        {
            ...state,
            socket:action.payload,
        }
    )
    default:
        return state;
} 
}


