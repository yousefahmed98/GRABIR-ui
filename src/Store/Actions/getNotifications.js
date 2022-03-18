import axios from 'axios'

export const getNotifications = () => (dispatch) => {

    return axios.get('http://127.0.0.1:8000/notification/notifications',{
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }})
    .then((res) => 
    {
        dispatch({
            type: "LIST_NOTIFICATIONS",
            payload: res.data,
        })
    }        
    )
    .catch((err) => console.log(err));
}
