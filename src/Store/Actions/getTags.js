import axios from 'axios'

export const getTags = () => (dispatch) => {

    return axios.get('http://127.0.0.1:8000/posts/tags/')
    .then((res) => 
    {
        dispatch({
            type: "LIST_Tags",
            payload: res.data,

        })
    }        
    )
    .catch((err) => console.log(err));
}
