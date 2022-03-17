import axios from "axios";

export const getRate = () => (dispatch) => {
  return axios
    .get("http://127.0.0.1:8000/rate/")
    .then((res) => {
      dispatch({
        type: "GET_RATE",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

