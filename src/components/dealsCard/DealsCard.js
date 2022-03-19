import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import "./DealsCard.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import DealCountDown from "../../components/countDown/countdown";
import StarRating from "../StarRating/StarRating";
// import { getDeals } from "../../Store/Actions/getDeals";
import { getOffersAction } from "../../Store/Actions/getOffers";
import PayPal from "../PayPal/PayPal";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../card/card.css";
import {deleteOffer} from  "../../Store/Actions/updateState";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
/////////////////////////////////////////////////////

function MyCard(props) {
  function deleteDeal() {
    props.dispatch(deleteOffer(props.offer));
    
  }
  return (
    <div className="offerCard ">
      <div className="">
        <img src={props.img} class="card__image" />

      </div>
      <div className="p-3 ">
        <div className=" pt-3 ">
          <img src={props.ownerProfilePic} className="me-2 ps-2  card__prof_pic" height="60" alt="offer owner" loading="lazy" />
          <span className="card__title details">{props.title}</span>
          <div className="smallText">created on: {props.delivery_date}  </div>
        </div>
        <p className="details mt-2 counter  " >Deal  Details</p>
        <div className="ms-3">
          <p className="card__description">{props.description}</p>
        </div>
        <div className=" text-center">
          <span className="details"> from:</span> <span className="me-3"> {props.from} </span>
          <span className="details"> to:</span> <span className="me-3"> {props.to}  </span>
          <span className="details"> price:</span> <span className="me-3 price p-2 rounded-pill "> {props.price} $ </span>
          <span className="details"> Delivery date:</span> <span className="me-3"> {props.delivery_date}  </span>
        </div>
        <div className="text-center">
          <p className="details mt-2 counter" >Countdown Timer</p>
          <DealCountDown date={props.delivery_date} />
        </div>
        <div className=" text-center">
          {
            props.offer.offer_owner == localStorage.getItem("id")
              ?
              <button className="card__btn me-5 "  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Mark as Completed</button>
              :
              (
               <div>
                 <button className="card__btn me-5 "  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Rate {props.offer.offer_owner_name}</button>
                 <button className="card__btn ms-5 "  onClick={() => deleteDeal()} > Checkout </button>
              </div>
              )
              
              

          }
        </div>
        <div className="modal" id="staticBackdrop" data-bs-backdrop="static"data-bs-keyboard="false" tabIndex="-1"aria-labelledby="staticBackdropLabel"aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header ">
              <h5
                                className="modal-title counter"
                                id="staticBackdropLabel"
                              >
                               Send Review about {props.offer.offer_owner_name}
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
             
                </div>
                <div className="modal-body">
                <StarRating offerOwner={props.offer.offer_owner} PostID={props.offer.post} />
                </div>
                </div>
                </div>
                </div>
              </div>
            </div>
            );
}
////////////////////////////////////////////////////
 export default function DealsCard(props) {
  const offers = useSelector((state) => state.OFFERS.offers);
            const [userid, setUserid] = useState(null);
            const dispatch = useDispatch();
  React.useEffect(() => {
              dispatch(getOffersAction());

  }, []);
            return (
            <div className="container mx-auto px-10 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                  {/* add post */}
                  <div className="pt-5">
                    {props.deals.map((offer, index) => {
                      if (offer.status) {
                        return (
                          <div className="wrapper mt-5 p-2" key={index}>
                            <MyCard
                              offer={offer}
                              dispatch={dispatch}
                              img={offer.postPic}
                              title={offer.offer_owner_name}
                              description={offer.details}
                              ownerProfilePic={offer.ownerProfilePic}
                              to={offer.to_region}
                              from={offer.from_region}
                              price={offer.price}
                              delivery_date={offer.delivery_date}
                              ////
                              created_at={offer.created_at}
                            />

                          </div>


                          // <Grid key={index} container>
                          //   <Card
                          //     variant="outlined"
                          //     sx={{ width: "100%", marginTop: 10, height: "50%" }}
                          //   >
                          //     <CardHeader
                          //       avatar={
                          //         //                     <Avatar
                          //         //                       columns={{ xs: 4, sm: 8, md: 12 }}
                          //         //                       sx={{ backgroundColor: "#151A1E" }}
                          //         //                       aria-label="recipe"
                          //         //                     >
                          //         //                     R
                          //         //                     </Avatar>
                          //         <img
                          //           src={offer.ownerProfilePic}
                          //           className="me-2 userImage"
                          //           height="80"
                          //           alt="deal owner"
                          //           loading="lazy"
                          //         />
                          //       }
                          //       action={
                          //         <IconButton aria-label="settings">
                          //           <MoreVertIcon />
                          //         </IconButton>
                          //       }
                          //       title={offer.offer_owner_name}
                          //       subheader={offer.created_at}
                          //     />

                          //     <Grid
                          //       container
                          //       spacing={{ xs: 2, md: 3 }}
                          //       columns={{ xs: 4, sm: 8, md: 12 }}
                          //     >
                          //       <Grid item xs={3}>
                          //         <Item>
                          //           {" "}
                          //           <img src={offer.postPic} alt="post" />
                          //         </Item>
                          //       </Grid>
                          //       <Grid item xs={9}>
                          //         <Item sx={{ height: "100%" }}>
                          //           {" "}
                          //           <CardActions
                          //             columns={{ xs: 4, sm: 2, md: 12 }}
                          //             sx={{ height: "100%", width: "100%" }}
                          //           >
                          //             <Grid
                          //               container
                          //               style={{ border: "0" }}
                          //               spacing={{ xs: 2, md: 3 }}
                          //               columns={{ xs: 4, sm: 8, md: 12 }}
                          //             >
                          //               <Grid item xs={12}>
                          //                 <Item>
                          //                   <IconButton>
                          //                     <Chip
                          //                       icon={
                          //                         <AttachMoneyIcon
                          //                           style={{ fill: "#151A1E" }}
                          //                         />
                          //                       }
                          //                       label={offer.price}
                          //                       variant="outlined"
                          //                       sx={{
                          //                         backgroundColor: "#FAAF40",
                          //                         color: "#151A1E",
                          //                       }}
                          //                     />
                          //                   </IconButton>

                          //                   <IconButton aria-label="public">
                          //                     <Chip
                          //                       icon={
                          //                         <PublicIcon style={{ fill: "#151A1E" }} />
                          //                       }
                          //                       label={offer.from_region}
                          //                       variant="outlined"
                          //                       sx={{
                          //                         backgroundColor: "#FAAF40",
                          //                         color: "#151A1E",
                          //                       }}
                          //                     />
                          //                   </IconButton>
                          //                   <IconButton aria-label="public">
                          //                     <Chip
                          //                       icon={
                          //                         <PublicIcon style={{ fill: "#151A1E" }} />
                          //                       }
                          //                       label={offer.to_region}
                          //                       variant="outlined"
                          //                       sx={{
                          //                         backgroundColor: "#FAAF40",
                          //                         color: "#151A1E",
                          //                       }}
                          //                     />
                          //                   </IconButton>

                          //                   <IconButton aria-label="public">
                          //                     <Chip
                          //                       icon={
                          //                         <AccessTimeOutlinedIcon
                          //                           style={{ fill: "#151A1E" }}
                          //                         />
                          //                       }
                          //                       label={offer.delivery_date}
                          //                       variant="outlined"
                          //                       sx={{
                          //                         backgroundColor: "#FAAF40",
                          //                         color: "#151A1E",
                          //                       }}
                          //                     />
                          //                   </IconButton>
                          //                 </Item>
                          //               </Grid>
                          //               <Grid item xs={12}>
                          //                 <Item>
                          //                   <CardContent>
                          //                     <Typography
                          //                       variant="body2"
                          //                       color="text.secondary"
                          //                     >
                          //                       {offer.details}
                          //                     </Typography>
                          //                   </CardContent>
                          //                 </Item>
                          //               </Grid>
                          //               {/* ------------------------------------------------------------------ */}
                          //               <Grid item xs={12}>
                          //                 <Item>
                          //                   <IconButton aria-label="money">
                          //                     <Chip
                          //                       icon={
                          //                         <CheckOutlinedIcon
                          //                           style={{ fill: "#FFFF" }}
                          //                         />
                          //                       }
                          //                       label="Accepted Offer"
                          //                       variant="outlined"
                          //                       sx={{
                          //                         backgroundColor: "#2ecc71",
                          //                         color: "#FFFF",
                          //                         width: "200px",
                          //                         height: "3vh",
                          //                       }}
                          //                     />
                          //                   </IconButton>
                          //                 </Item>
                          //               </Grid>

                          //               <Grid item xs={12}>
                          //                 <Item>
                          //                   <DealCountDown date={offer.delivery_date} />
                          //                 </Item>
                          //                 {/* { localStorage.getItem("id") == getUSerID(offer.post) ? <p>sheif</p> :  

                          //                 <PayPal 
                          //                 USERID = {userid}
                          //                 />} */}
                          //                 <Link to="/paypal" className="btn btn-warning btn-lg">
                          //                   Checkout
                          //                 </Link>
                          //                 <StarRating
                          //                   offerOwner={offer.offer_owner}
                          //                   PostID={offer.post}
                          //                 />
                          //               </Grid>
                          //             </Grid>
                          //           </CardActions>
                          //         </Item>
                          //       </Grid>
                          //     </Grid>
                          //   </Card>
                          // </Grid>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>


            );
}
