import axios from 'axios'
import { setLoaderAction } from "./setLoader"
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from 'react';

export const getDeals = () => (dispatch) => {

    return axios.get('http://127.0.0.1:8000/deals/',{
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }})
    .then((res) => 
    {
      useEffect()
        const offersArray = useSelector((state) => state.OFFERS.offersList);
        console.log("offer arraaayyyy", offersArray),
        console.log("deals arrayyyy", res.data),
        // offersArray.map((offer, index) => {
        //   if (offersArray.)
        // })    
        //second dispatch de mesh bt fire 8er lma l data trga3 
        // ha set l data fl store

        dispatch({
            type: "LIST_DEALS",
            payload: res.data,

        })
        dispatch(setLoaderAction(false))
        
    }        
    )
    .catch((err) => console.log(err));
}
//action contains type(no3 action) ,payload (values)
