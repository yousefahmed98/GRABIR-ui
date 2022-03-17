import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { axiosInstance } from "../../network/axiosInstance"
import { getOffersAction } from "../../Store/Actions/getOffers"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import "./popup.css"
import logo from "../../static/navbar/logo-default.png"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import TextField from "@mui/material/TextField"
import axios from 'axios'

export default function Popup(props) {
  const [newNotifyObj, setNewNotifyObj] = useState({
    body: "",
    from_user_name: null,
    to_user: null,
  })
  //////////////////////////
  const [offerForm, setOfferForm] = useState({
    details: "",
    from_region: "",
    to_region: "",
    price: "",
    // status: 'None',
    post: props.postID,
    offer_owner: 1,
  });
  const [errors, setErrors] = useState({
    detailsErr: null,
    from_regionErr: null,
    to_regionErr: null,
    priceErr: null,
  });
/////////////////////////////////////////////////////////////////////////////
const handleNotification =(type)=>{
  //lmafrod acreate notification object f db
  //type hwa body
  props.socket.emit("sendNotification",{
    senderName:props.currentuser.username,
    reciverId:props.post.user,
    type,
  })

  setNewNotifyObj({
    ...newNotifyObj,
    body: type,
    from_user_name: props.currentuser.username,
    from_user:props.currentuser.id,
    to_user: props.post.user,
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

  //-------------------------------------------------------

  const submitForm = (e) => {
    e.preventDefault();
    // SEND API REQUEST
    axiosInstance
      .post("/offers/", offerForm)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

  };
  const changeData = (e) => {
    if (e.target.name === "details") {
      setOfferForm({
        ...offerForm,
        details: e.target.value,
      });
      setErrors({
        ...errors,
        detailsErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "from_region") {
      setOfferForm({
        ...offerForm,
        from_region: e.target.value,
      });
      setErrors({
        ...errors,
        from_regionErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "to_region") {
      setOfferForm({
        ...offerForm,
        to_region: e.target.value,
      });
      setErrors({
        ...errors,
        to_regionErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "price") {
      setOfferForm({
        ...offerForm,
        price: e.target.value,
      });
      setErrors({
        ...errors,
        priceErr: e.target.value.length === 0 ? "This field is required" : null,
      });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header ">
              <img className="modaaalcss" src={logo} alt="logo"></img>
              <h5 className="modal-title" id="exampleModalLabel">
                Make Your Offer
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => submitForm(e)}>
                <div className="mb-2 mr-5">
                  <TextField
                    id="outlined-search"
                    className="form-control"
                    label="Details"
                    type="text"
                    style={{ marginBottom: 5 }}
                    name="details"
                    value={offerForm.details}
                    onChange={(e) => changeData(e)}
                  />
                  <div id="usernameHelp" className="form-text text-danger">
                    {errors.detailsErr}
                  </div>
                </div>
                <div className="mb-2 mr-5">
                  <TextField
                    style={{ marginRight: 3 , marginBottom: 8}}
                    type="text"
                    id="outlined-required"
                    label="From"
                    defaultValue="USA"
                    value={offerForm.from_region}
                    onChange={(e) => changeData(e)}
                    name="from_region"
                  />
                  <TextField
                    type="text"
                    id="outlined-required"
                    label="To"
                    defaultValue="EGYPT"
                    style={{ marginRight: 3 , marginBottom: 8}}
                    value={offerForm.to_region}
                    onChange={(e) => changeData(e)}
                    name="to_region"
                  />
                  <div id="usernameHelp" className="form-text text-danger">
                    {errors.from_regionErr || errors.to_regionErr}
                  </div>
                </div>

                <div className="mb-2 mr-5">
                  <TextField
                    id="outlined-number"
                    label="Number"
                    style={{ marginRight: 3 , marginBottom: 8}}
                    type="number"
                    value={offerForm.price}
                    onChange={(e) => changeData(e)}
                    name="price"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Post id"
                    style={{ marginRight: 3 , marginBottom: 8}}
                    defaultValue={props.postID}
                    onChange={(e) => changeData(e)}
                    name="post_id"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div id="usernameHelp" className="form-text text-danger">
                  {errors.priceErr}
                </div>
                <div className="modal-footer">
                  <Button
                    style={{ margin: 3 }}
                    variant="outlined"
                    data-bs-dismiss="modal"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    type="submit"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    disabled={
                      errors.detailsErr ||
                      errors.from_regionErr ||
                      errors.to_regionErr ||
                      errors.priceErr
                    }
                    onClick={()=>handleNotification("send you offer")} /////////////////

                  >
                    Send Offer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Your offer has been successfully submitted
                <DoneIcon data-bs-dismiss="modal" aria-label="Close"></DoneIcon>
              </h5>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-outline-success"
                data-bs-dismiss="modal"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="outlined"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
        endIcon={<LocalOfferIcon />}
      >
        Make Offer
      </Button>
    </>
  );
}
