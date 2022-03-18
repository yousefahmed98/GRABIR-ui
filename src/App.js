import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './pages/login/Login';
import Home from './pages/home/home'
import PaymentTest from './pages/PaymentTest'
import PostDetails from './pages/postDetails/PostDetails'
import Test from './pages/Test';
import "./components/fonts.css"
import Register from './pages/register/register';
import NotFound from './pages/NotFound/NotFound';
import Offers from './pages/offers/offers';
import Deals from './pages/deals/Deals';
import Profile from './pages/profile/Profile';
import StarRating from "./components/StarRating/StarRating";
import Landing from "./pages/landing/landing";


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path={"/login"} exact component={Login} />
          <Route path={"/register"} exact component={Register} />
          <Route path={"/test"} exact component={Test} />
          <Route path={"/home"} exact component={Home} />
          <Route path={"/PostDetails/:id"} exact component={PostDetails} />
          <Route path={"/offers"} exact component={Offers} />
          <Route path={"/deals"} exact component={Deals} />
          <Route path={"/rate"} exact  component={StarRating} />
          <Route path={"/myprofile"} exact component={Profile} />
          <Route path={"/PaymentTest"} exact component={PaymentTest} />
          <Route path={"/"} exact component={Landing} />


          <Route path="*" exact component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
