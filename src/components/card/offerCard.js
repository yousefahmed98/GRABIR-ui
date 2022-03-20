import * as React from "react";
import { useEffect ,useState } from "react";
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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import "./card.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {useSelector, useDispatch } from "react-redux";
import {
  updateStateAction,
  deleteOffer,
} from "../../Store/Actions/updateState";
import StarRating from "../StarRating/StarRating";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../network/axiosInstance";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MyCard(props) {
 
  const updateOfferStatusRejected = (offer) => {
    props.dispatch(deleteOffer(offer));
    // window.alert("This offer is rejected!");
    // history.push("/offers");
  };
  const updateOfferStatusAccepted = (offer,reciverid) => {
    
    props.handleNotification("accepts your offer",reciverid,localStorage.getItem("username")) /////////////////
    console.log("////////////",props.handleNotification)
    props.dispatch(updateStateAction(offer, true));
    // dispatch(deleteOffer(offer));
    // window.alert("This offer if accepted successfully!");
    // history.push("/offers");
  };


  return (
    <div className="offerCard ">
      <div className="">
        <img src={props.img} class="card__image" />

      </div>
      <div className="p-3">
        <div className=" pt-3 mb-2">
          <img src={props.ownerProfilePic} className="me-2 ps-2  card__prof_pic" height="60" alt="offer owner" loading="lazy" />
          <span className="card__title">{props.title}</span>
        </div>
        <div className="ms-3">
          <p className="card__description">{props.description}</p>
        </div>
        <div className=" text-center">
          <span className="details"> from:</span> <span className="me-3"> {props.from} </span>
          <span className="details"> to:</span> <span className="me-3"> {props.to}  </span>
          <span className="details"> price:</span> <span className="me-3"> {props.price}  </span>
          <span className="details"> Delivery date:</span> <span className="me-3"> {props.delivery_date}  </span>
        </div>
        <div className=" text-center">
          <button className="card__btn me-5 " onClick={() => updateOfferStatusAccepted(props.offer,props.offer.offer_owner)}>Accept</button>
          <button className="card__btn ms-5 " onClick={() => updateOfferStatusRejected(props.offer)}>Reject</button>
        </div>
      </div>


    </div>
  );
}

export default function OffersCard(props) {
  const socket = useSelector((state) => state.SOCKET.socket);
  const history = useHistory();
  const dispatch = useDispatch();
  const [newNotifyObj, setNewNotifyObj] = useState({
    body: "",
    from_user_name: null,
    to_user: null,
  })

  
  const handleNotification =(type ,reciverId,senderName)=>{
    console.log("******************************", type)
    //lmafrod acreate notification object f db
    //type hwa body
      socket.emit("sendNotification",{
      senderName:senderName,
      reciverId:reciverId,
      type,
    })
  
    setNewNotifyObj({
      ...newNotifyObj,
      body: type,
      from_user_name: localStorage.getItem("username"),
      from_user:localStorage.getItem("id"),
      to_user: reciverId,
    })
  
  }
  useEffect(() => {
    //post request new notification object 
    if (newNotifyObj.body.length > 0) {
      console.log("sending api post request" ,newNotifyObj)
      axiosInstance.post('/notification/notifications/',newNotifyObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        }
      })
        .then((res) => {
          console.log(newNotifyObj)
        })
        .catch((err) => console.log(err))
    }
  }, [newNotifyObj])
  /////////////////////////////////////////////////////////////////////////////



  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {/* add post */}
          <div className="pt-5">

            {
              props.offers.map((offer, index) => {
                if (!offer.status) {
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
                        handleNotification ={handleNotification}
                      />

                    </div>
                  )

                }


              })

            }



          </div>
        </div>
      </div>
    </div>



    // <div style={{ backgroundColor: "#151A1E" }} className="offersCard">
    //   {props.offers.map((offer, index) => {
    //     if (!offer.status)
    //       return (
    //         <Grid key={index} container>
    //           <Card
    //             variant="outlined"
    //             sx={{ width: "100%", marginTop: 10, height: "50%" }}
    //           >
    //             <CardHeader
    //               avatar={
    //                 // <Avatar
    //                 //   columns={{ xs: 4, sm: 8, md: 12 }}
    //                 //   sx={{ backgroundColor: "#151A1E" }}
    //                 //   aria-label="recipe"
    //                 // >

    //                 // </Avatar>
    //                 <img
    //                   src={offer.ownerProfilePic}
    //                   className="me-2 userImage"
    //                   height="80"
    //                   alt="offer owner"
    //                   loading="lazy"
    //                 />
    //               }
    //               action={
    //                 <IconButton aria-label="settings">
    //                   <MoreVertIcon />
    //                 </IconButton>
    //               }
    //               title={offer.offer_owner_name}
    //               subheader={offer.created_at}
    //             />
    //             <Grid
    //               container
    //               spacing={{ xs: 2, md: 3 }}
    //               columns={{ xs: 4, sm: 8, md: 12 }}
    //             >
    //               <Grid item xs={3}>
    //                 <Item>
    //                   {" "}
    //                   {/* <CardMedia
    //                     component="img"
    //                     spacing={{ xs: 2, md: 3 }}
    //                     columns={{ xs: 4, sm: 8, md: 12 }}
    //                     sx={{ height: "100%", width: "100%" }}
    //                     image={item}
    //                     alt="post offer image"
    //                   /> */}
    //                   <img src={offer.postPic} alt="post" />
    //                 </Item>
    //               </Grid>
    //               <Grid item xs={9}>
    //                 <Item sx={{ height: "100%" }}>
    //                   {" "}
    //                   <CardActions
    //                     columns={{ xs: 4, sm: 2, md: 12 }}
    //                     // sx={{ height: "100%" }}
    //                     sx={{ height: "100%", width: "100%" }}
    //                   >
    //                     <Grid
    //                       container
    //                       style={{ border: "0" }}
    //                       spacing={{ xs: 2, md: 3 }}
    //                       columns={{ xs: 4, sm: 8, md: 12 }}
    //                     >
    //                       <Grid item xs={12}>
    //                         <Item>
    //                           <IconButton>
    //                             <Chip
    //                               icon={
    //                                 <AttachMoneyIcon
    //                                   style={{ fill: "#151A1E" }}
    //                                 />
    //                               }
    //                               label={offer.price}
    //                               variant="outlined"
    //                               sx={{
    //                                 backgroundColor: "#FAAF40",
    //                                 color: "#151A1E",
    //                               }}
    //                             />
    //                           </IconButton>

    //                           <IconButton aria-label="public">
    //                             <Chip
    //                               icon={
    //                                 <PublicIcon style={{ fill: "#151A1E" }} />
    //                               }
    //                               label={offer.from_region}
    //                               variant="outlined"
    //                               sx={{
    //                                 backgroundColor: "#FAAF40",
    //                                 color: "#151A1E",
    //                               }}
    //                             />
    //                           </IconButton>
    //                           <IconButton aria-label="public">
    //                             <Chip
    //                               icon={
    //                                 <PublicIcon style={{ fill: "#151A1E" }} />
    //                               }
    //                               label={offer.to_region}
    //                               variant="outlined"
    //                               sx={{
    //                                 backgroundColor: "#FAAF40",
    //                                 color: "#151A1E",
    //                               }}
    //                             />
    //                           </IconButton>

    //                           <IconButton aria-label="public">
    //                             <Chip
    //                               icon={
    //                                 <AccessTimeOutlinedIcon
    //                                   style={{ fill: "#151A1E" }}
    //                                 />
    //                               }
    //                               label={offer.delivery_date}
    //                               variant="outlined"
    //                               sx={{
    //                                 backgroundColor: "#FAAF40",
    //                                 color: "#151A1E",
    //                               }}
    //                             />
    //                           </IconButton>
    //                         </Item>
    //                       </Grid>
    //                       <Grid item xs={12}>
    //                         <Item>
    //                           <CardContent>
    //                             <Typography
    //                               variant="body2"
    //                               color="text.secondary"
    //                             >
    //                               {offer.details}
    //                             </Typography>
    //                           </CardContent>
    //                         </Item>
    //                       </Grid>
    //                       {/* ------------------------------------------------------------------ */}
    //                       <Grid item xs={12}>
    //                         <Item>
    //                           <IconButton
    //                             aria-label="money"
    //                             // onClick={() => setOfferStatus(true)}
    //                             href="/deals"
    //                             onClick={() => updateOfferStatusAccepted(offer)}
    //                           >
    //                             <Chip
    //                               icon={
    //                                 <CheckOutlinedIcon
    //                                   style={{ fill: "#85BB65" }}
    //                                 />
    //                               }
    //                               label="Accept"
    //                               variant="outlined"
    //                               sx={{
    //                                 backgroundColor: "#151A1E",
    //                                 color: "#FFFF",
    //                                 width: "200px",
    //                                 height: "3vh",
    //                               }}
    //                             />
    //                           </IconButton>
    //                           <StarRating/>
    //                           <IconButton
    //                             aria-label="public"
    //                             // onClick={() => setOfferStatus(true)
    //                             // href="/offers"
    //                             onClick={() => updateOfferStatusRejected(offer)}
    //                           >
    //                             {/* {offer.status = offerStatus} */}
    //                             <Chip
    //                               icon={
    //                                 <CloseOutlinedIcon
    //                                   style={{ fill: "#c0392b" }}
    //                                 />
    //                               }
    //                               label="Reject"
    //                               variant="outlined"
    //                               sx={{
    //                                 backgroundColor: "#151A1E",
    //                                 color: "#FFFF",
    //                                 width: "200px",
    //                                 height: "3vh",
    //                               }}
    //                             />
    //                           </IconButton>
    //                         </Item>
    //                       </Grid>
    //                     </Grid>
    //                   </CardActions>
    //                 </Item>
    //               </Grid>
    //             </Grid>
    //           </Card>
    //         </Grid>

    //       );
    //     else return (
    //       console.log("nothing to show")
    //     );
    //   })}
    // </div>
  );
}
