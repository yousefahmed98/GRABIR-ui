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
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PublicIcon from "@mui/icons-material/Public";
import "./card.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OffersCard(props) {
  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", position: "fixed", marginTop: 15 }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "#151A1E" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={6}>
          <Item>
            {" "}
            <CardMedia
              component="img"
              sx={{ height: "100%", width: "100%", objectFit: "cover" }}
              image={item}
              alt="post offer image"
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            {" "}
            <CardActions sx={{ height: "100%" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={3}>
                  <Item>
                    <IconButton>
                      <Chip
                        icon={<AttachMoneyIcon style={{ fill: "#151A1E" }} />}
                        label="With Icon"
                        variant="outlined"
                        sx={{
                          backgroundColor: "#FAAF40",
                          color: "#151A1E",
                          height: "3vh",
                          paddingRight:10,
                        }}
                      />
                    </IconButton>

                    <IconButton aria-label="public">
                      <Chip
                        icon={<PublicIcon style={{ fill: "#151A1E" }} />}
                        label="With Icon"
                        variant="outlined"
                        sx={{
                          backgroundColor: "#FAAF40",
                          color: "#151A1E",
                          height: "3vh",
                          paddingRight:10,
                        }}
                      />
                    </IconButton>
                    
                    <IconButton aria-label="public">
                      <Chip
                        icon={<AccessTimeOutlinedIcon style={{ fill: "#151A1E" }} />}
                        label="With Icon"
                        variant="outlined"
                        sx={{
                          backgroundColor: "#FAAF40",
                          color: "#151A1E",
                          height: "3vh",
                          paddingRight:10,
                        }}
                      />
                    </IconButton>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                  </Item>
                </Grid>
                {/* ------------------------------------------------------------------ */}
                <Grid item xs={12}>
                  <Item>
                    <IconButton
                      aria-label="money"
                      style={{
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <Chip
                        icon={<CheckOutlinedIcon style={{ fill: "#85BB65" }} />}
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

                    <IconButton aria-label="public">
                      <Chip
                        icon={<CloseOutlinedIcon style={{ fill: "#c0392b" }} />}
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
  );
}
