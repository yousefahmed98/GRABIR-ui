// import { setLoaderAction } from "./setLoader"
import { axiosInstance } from "../../network/axiosInstance";
export const getOffersAction = () => (dispatch) => {
 
    return  axiosInstance.get(`/offers/`,{
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }})
    .then((res) => 
    {
        dispatch({
            type: "GET_OFFERS",
            payload: res.data,

        })
        // dispatch(setLoaderAction(false))
        
    }        
    )
    .catch((err) => console.log(err));
}

// export const getOffersAction = (payload) => {
//   return {
//     type: "GET_OFFERS",
//     payload,
//   };
// };