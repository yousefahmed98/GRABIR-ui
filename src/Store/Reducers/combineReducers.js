import { combineReducers } from "redux";
import postsList from "./getPosts"
import loader from "./setLoader"
// combineReducers is built in function in redux
export default combineReducers(
    {
        POSTS: postsList,
        LOADER :loader,
    }
);
