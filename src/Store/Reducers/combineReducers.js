import { combineReducers } from "redux";
import postsList from "./getPosts"
import loader from "./setLoader"
import tagsList from './getTags'
// combineReducers is built in function in redux
export default combineReducers(
    {
        POSTS: postsList,
        LOADER :loader,
        TAGS:tagsList,
    }
);
