import { combineReducers } from "redux";
import postsList from "./getPosts"
import loader from "./setLoader"
import offers from "./getOffers"
import deals from "./getDeals";
import auth from "./auth";

// combineReducers is built in function in redux
export default combineReducers(
    {
        POSTS: postsList,
        LOADER :loader,
        OFFERS: offers,
        DEALS: deals,
        auth: auth,
    }
);
