// import axios from "axios";
// import { setLoaderAction } from "./setLoader";
// // import { updateStateAction } from "./updateState";

// export const getDeals = () => async (dispatch) => {
  
//   return axios
//     .get("http://127.0.0.1:8000/deals/", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access")}`,
//         Accept: "application/json",
//       },
//     })
//     .then((res) => {

//     //   if (res.data) {
//     //     const deals = res.data;
//     //     console.log("resss dealsss: ", res.data);
//     //     axios
//     //       .get("http://127.0.0.1:8000/offers/", {
//     //         headers: {
//     //           "Content-Type": "application/json",
//     //           Authorization: `Bearer ${localStorage.getItem("access")}`,
//     //           Accept: "application/json",
//     //         },
//     //       })
//     //       .then((res2) => {
            
//     //         let payload_data;
//     //         const offers = res2.data;
//     //         offers.map((offer) => {
//     //           deals.map(
//     //             (deal) => {
//     //               if (deal.offer === offer.id) {
//     //                 console.log("deal oofer iddddd: ", deal.offer);
//     //                 console.log("offer iddddd: ", offer.id);

//     //                 console.log("matchiiiinnnnggggggggg", res.data);

//     //                 payload_data = offer;
//     //                 // updateStateAction
//     //                 // dispatch(updateStateAction(deal));
//     //               }
//     //             },
//     //             dispatch({
//     //               type: "LIST_DEALS",
//     //               payload: payload_data,
//     //             }),

//     //             dispatch(setLoaderAction(false))
//     //           );
//     //         });
//     //       })
//     //       .catch((err) => console.log(err));
//     //   }
//     //   else{
//     //     console.log("There is not deals to show!")
//     //   }
//     })
//     .catch((err) => console.log(err));
// };
import axios from 'axios'
import { setLoaderAction } from "./setLoader"

export const getDeals = () => (dispatch) => {

    return axios.get('http://127.0.0.1:8000/deals/',{
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }})
    .then((res) => 
    {
        dispatch({
            type: "LIST_DEALS",
            payload: res.data,

        })
        dispatch(setLoaderAction(false))
        
    }        
    )
    .catch((err) => console.log(err));
}
