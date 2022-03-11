import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import item from "../../static/iphone.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import "./card.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateStateAction,
  deleteOffer,
} from "../../Store/Actions/updateState";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OffersCard(props) {
  const [offerStatus, setOfferStatus] = useState();
  const dispatch = useDispatch();
  const updateOfferStatusAccepted = (offer) => {
    dispatch(updateStateAction(offer, true));
    window.alert("This offer if accepted successfully!");
  };
  const updateOfferStatusRejected = (offer) => {
    dispatch(deleteOffer(offer));
    window.alert("This offer is rejected!");
  };
  return (
    <div style={{ backgroundColor: "#151A1E" }}>
      {props.offers.map((offer, index) => {
        if (!offer.status)
          return (
            <Grid key={index} container>
              <Card
                variant="outlined"
                sx={{ width: "100%", marginTop: 10, height: "50%" }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      sx={{ backgroundColor: "#151A1E" }}
                      aria-label="recipe"
                    >
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader={offer.created_at}
                />
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={3}>
                    <Item>
                      {" "}
                      <CardMedia
                        component="img"
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ height: "100%", width: "100%" }}
                        image={item}
                        alt="post offer image"
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={9}>
                    <Item sx={{ height: "100%" }}>
                      {" "}
                      <CardActions
                        columns={{ xs: 4, sm: 2, md: 12 }}
                        // sx={{ height: "100%" }}
                        sx={{ height: "100%", width: "100%" }}
                      >
                        <Grid
                          container
                          style={{ border: "0" }}
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12}>
                            <Item>
                              <IconButton>
                                <Chip
                                  icon={
                                    <AttachMoneyIcon
                                      style={{ fill: "#151A1E" }}
                                    />
                                  }
                                  label={offer.price}
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#FAAF40",
                                    color: "#151A1E",
                                  }}
                                />
                              </IconButton>

                              <IconButton aria-label="public">
                                <Chip
                                  icon={
                                    <PublicIcon style={{ fill: "#151A1E" }} />
                                  }
                                  label={offer.from_region}
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#FAAF40",
                                    color: "#151A1E",
                                  }}
                                />
                              </IconButton>
                              <IconButton aria-label="public">
                                <Chip
                                  icon={
                                    <PublicIcon style={{ fill: "#151A1E" }} />
                                  }
                                  label={offer.to_region}
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#FAAF40",
                                    color: "#151A1E",
                                  }}
                                />
                              </IconButton>

                              <IconButton aria-label="public">
                                <Chip
                                  icon={
                                    <AccessTimeOutlinedIcon
                                      style={{ fill: "#151A1E" }}
                                    />
                                  }
                                  label={offer.delivery_date}
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#FAAF40",
                                    color: "#151A1E",
                                  }}
                                />
                              </IconButton>
                            </Item>
                          </Grid>
                          <Grid item xs={12}>
                            <Item>
                              <CardContent>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {offer.details}
                                </Typography>
                              </CardContent>
                            </Item>
                          </Grid>
                          {/* ------------------------------------------------------------------ */}
                          <Grid item xs={12}>
                            <Item>
                              <IconButton
                                aria-label="money"
                                // onClick={() => setOfferStatus(true)}
                                href="/offers"
                                onClick={() => updateOfferStatusAccepted(offer)}
                              >
                                <Chip
                                  icon={
                                    <CheckOutlinedIcon
                                      style={{ fill: "#85BB65" }}
                                    />
                                  }
                                  label="Accept"
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#151A1E",
                                    color: "#FFFF",
                                    width: "200px",
                                    height: "3vh",
                                  }}
                                />
                              </IconButton>

                              <IconButton
                                aria-label="public"
                                // onClick={() => setOfferStatus(true)
                                href="/offers"
                                onClick={() => updateOfferStatusRejected(offer)}
                              >
                                {/* {offer.status = offerStatus} */}
                                <Chip
                                  icon={
                                    <CloseOutlinedIcon
                                      style={{ fill: "#c0392b" }}
                                    />
                                  }
                                  label="Reject"
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#151A1E",
                                    color: "#FFFF",
                                    width: "200px",
                                    height: "3vh",
                                  }}
                                />
                              </IconButton>
                            </Item>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Item>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        else return null;
      })}
    </div>
  );
}
