import { combineReducers } from "redux";
import postsList from "./getPosts"
import loader from "./setLoader"
import tagsList from './getTags'
import offers from "./getOffers"
import deals from "./getDeals";
import auth from "./auth";
import rateList from "./getRate"
import notificationsList from "./getNotifications"
import socket from "./socketReducer";

// combineReducers is built in function in redux
export default combineReducers(
    {
        POSTS: postsList,
        LOADER :loader,
        TAGS:tagsList,
        OFFERS: offers,
        DEALS: deals,
        auth: auth,
        RATE: rateList,

        NOTIFICATIONS:notificationsList,
        SOCKET:socket,
    }
);
