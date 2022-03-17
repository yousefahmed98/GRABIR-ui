import axios from 'axios'
import { setLoaderAction } from "./setLoader"

export const getPosts = () => (dispatch) => {

    return axios.get('http://127.0.0.1:8000/posts/posts',{
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }})
    .then((res) => 
    {
        dispatch({
            type: "LIST_POSTS",
            payload: res.data,

        })
        dispatch(setLoaderAction(false))
        
    }        
    )
    .catch((err) => console.log(err));
}
