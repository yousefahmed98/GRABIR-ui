import axios from 'axios'
import { setLoaderAction } from "./setLoader"

export const getPosts = () => (dispatch) => {

    return axios.get('http://127.0.0.1:8000/posts/')
    .then((res) => 
    {
        //second dispatch de mesh bt fire 8er lma l data trga3 
        // ha set l data fl store
        dispatch({
            type: "LIST_POSTS",
            payload: res.data.result,

        })
        dispatch(setLoaderAction(false))
    }        
    )
    .catch((err) => console.log(err));
}
//action contains type(no3 action) ,payload (values)
