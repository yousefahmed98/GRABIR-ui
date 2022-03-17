import { combineReducers } from "redux";
import postsList from "./getPosts"
import loader from "./setLoader"
import tagsList from './getTags'
import offers from "./getOffers"
import deals from "./getDeals";
import auth from "./auth";
import notificationsList from "./getNotifications"

// combineReducers is built in function in redux
export default combineReducers(
    {
        POSTS: postsList,
        LOADER :loader,
        TAGS:tagsList,
        OFFERS: offers,
        DEALS: deals,
        auth: auth,
        NOTIFICATIONS:notificationsList,
    }
);
