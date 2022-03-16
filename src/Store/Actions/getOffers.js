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
        
    }        
    )
    .catch((err) => console.log(err));
}

