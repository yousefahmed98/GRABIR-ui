import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import item from "../../static/iphone.png";
import Chip from "@mui/material/Chip";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import "./DealsCard.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";
import DealCountDown from "../../components/countDown/countdown";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DealsCard() {
  const offers = useSelector((state) => state.OFFERS.offers);
  // const [dateInMs, setDateMs] = useState()
  return (
    <div style={{ backgroundColor: "#151A1E" }}>
      {offers.map((offer, index) => {
        if (offer.status == true)
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
                                // onClick={() => updateOfferStatusAccepted(offer)}
                              >
                                <Chip
                                  icon={
                                    <CheckOutlinedIcon
                                      style={{ fill: "#FFFF" }}
                                    />
                                  }
                                  label="Accepted Offer"
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: "#2ecc71",
                                    color: "#FFFF",
                                    width: "200px",
                                    height: "3vh",
                                  }}
                                />
                              </IconButton>

                             
                            </Item>
                          </Grid>
                          <Grid item xs={12}>
                            <Item>
                              {/* { setDateMs(new Date(...prepareDate(offer.delivery_date)))} */}
                              <DealCountDown date = {offer.delivery_date}/>
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
      })}
    </div>
  );
}