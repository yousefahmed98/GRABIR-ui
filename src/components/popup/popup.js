import React from "react";
import { axiosInstance } from "../../network/axiosInstance";
import logo from "../../pages/landing/assets/img/logo2.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./popup.css";

export default function Popup(props) {
  console.log("propss posttt: ", props.post);
  const [postOffer, setPost] = useState();
  // setPost(post)
  // console.log("tesssssssssttttt: ",postTest)
  function handleShow(postId) {
    //action = true --> if action get post for make offer
    axios
      .get(`http://127.0.0.1:8000/posts/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setPost({
          ...postOffer,
          id: postId,
          title: res.data.title,
          description: res.data.description,
          postpicture: null,
          from_region: res.data.from_region,
          to: res.data.to,
          price: res.data.price,
          ownerName: res.data.ownerName,
          user: res.data.user,
          tags: res.data.tags,
        });
      })
      .catch((err) => console.log(err));

    }
  const [newNotifyObj, setNewNotifyObj] = useState({
    body: "",
    from_user_name: null,
    to_user: null,
  });
  //////////////////////////
  const [offerForm, setOfferForm] = useState({
    details: "",
    from_region: "",
    to_region: "",
    price: "",
    post: props.post.id,
    delivery_date: "",
    postObj: props.post,

    offer_owner: localStorage.getItem("id"),
  });
  const [errors, setErrors] = useState({
    detailsErr: null,
    from_regionErr: null,
    to_regionErr: null,
    delivery_dateErr: null,
    priceErr: null,
  });
  /////////////////////////////////////////////////////////////////////////////
  const handleNotification = (type) => {
    //lmafrod acreate notification object f db
    //type hwa body
    props.socket.emit("sendNotification", {
      senderName: props.currentuser.username,
      reciverId: props.post.user,
      type,
    });

    setNewNotifyObj({
      ...newNotifyObj,
      body: type,
      from_user_name: props.currentuser.username,
      from_user: props.currentuser.id,
      to_user: props.post.user,
    });
  };
  useEffect(() => {
    //post request new notification object
    if (newNotifyObj.body.length > 0) {
      axiosInstance
        .post("/notification/notifications/", newNotifyObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          console.log(newNotifyObj);
        })
        .catch((err) => console.log(err));
    }
  }, [newNotifyObj]);

  //-------------------------------------------------------

  const submitForm = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("details", offerForm.details);
    form_data.append("from_region", offerForm.from_region);
    form_data.append("to_region", offerForm.to_region);
    form_data.append("price", offerForm.price);
    form_data.append("post", offerForm.post);
    form_data.append("delivery_date", offerForm.delivery_date);
    form_data.append("offer_owner", offerForm.offer_owner);

    // SEND API REQUEST
    axiosInstance
      .post("/offers/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
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
          e.target.value.length === 0 || e.target.value.length < 10
            ? "You should write details to facilitate handling"
            : e.target.value[0] === " "
            ? "enter valid details not starting with space"
            : /^[a-zA-Z\s 0-9]+$/.test(e.target.value)
            ? ""
            : "details shouldn't contain !@#$%^&*",
      });
    } else if (e.target.name === "from_region") {
      setOfferForm({
        ...offerForm,
        from_region: e.target.value,
      });
      setErrors({
        ...errors,
        from_regionErr:
          e.target.value.length === 0 || e.target.value.length < 3
            ? " This field is required and must be at least 2 characters"
            : e.target.value[0] === " "
            ? "enter valid country name"
            : /^[a-zA-Z\s]+$/.test(e.target.value)
            ? ""
            : "enter valid country name",
      });
    } else if (e.target.name === "to_region") {
      setOfferForm({
        ...offerForm,
        to_region: e.target.value,
      });
      setErrors({
        ...errors,
        to_regionErr:
          e.target.value.length === 0 || e.target.value.length < 3
            ? " This field is required and must be at least 2 characters"
            : e.target.value[0] === " "
            ? "enter valid country name"
            : /^[a-zA-Z\s]+$/.test(e.target.value)
            ? ""
            : "enter valid country name",
      });
    } else if (e.target.name === "price") {
      setOfferForm({
        ...offerForm,
        price: e.target.value,
      });
      setErrors({
        ...errors,
        priceErr:
          e.target.value.length === 0
            ? "Price is required"
            : !/^[0-9]+$/.test(e.target.value)
            ? "Enter valid price"
            : e.target.value > 0 || !/\s/.test(e.target.value)
            ? ""
            : "Enter valid price shouldn't contain spaces",
      });
    } else if (e.target.name === "delivery_date") {
      setOfferForm({
        ...offerForm,
        delivery_date: e.target.value,
      });
      setErrors({
        ...errors,
        delivery_dateErr:
          e.target.value === null
            ? "This field is required"
            : e.target.value > offerForm.postObj.created_at
            ? ""
            : "Enter valid date ",
      });
    }
  };

  return (
    <>
      {props.posts.map((post, index) => {
        return (
          <div className="popup" key={index}>
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
                    <img
                      className="modaaalcss"
                      src={logo}
                      alt="logo"
                      style={{ width: "25%" }}
                    ></img>
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
                        <div
                          id="usernameHelp"
                          className="form-text text-danger"
                        >
                          {errors.detailsErr}
                        </div>
                      </div>
                      <div className="mb-2 mr-5">
                        <TextField
                          style={{ marginRight: 3, marginBottom: 8 }}
                          type="text"
                          id="outlined-required"
                          label="From"
                          value={offerForm.from_region}
                          onChange={(e) => changeData(e)}
                          name="from_region"
                        />
                        <TextField
                          type="text"
                          id="outlined-required"
                          label="To"
                          style={{ marginRight: 3, marginBottom: 8 }}
                          value={offerForm.to_region}
                          onChange={(e) => changeData(e)}
                          name="to_region"
                        />
                        <div
                          id="usernameHelp"
                          className="form-text text-danger"
                        >
                          {errors.from_regionErr || errors.to_regionErr}
                        </div>
                      </div>

                      <div className="mb-2 mr-5">
                        <TextField
                          id="outlined-number"
                          label="Price"
                          style={{ marginRight: 3, marginBottom: 8 }}
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
                          label="Post ID"
                          style={{ marginRight: 3, marginBottom: 8 }}
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
                      <div className="mb-2 mr-5">
                        <TextField
                          id="outlined-number"
                          label="Expected Delivery Date"
                          style={{ marginRight: 3, marginBottom: 8 }}
                          type="date"
                          value={offerForm.delivery_date}
                          onChange={(e) => changeData(e)}
                          name="delivery_date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div id="usernameHelp" className="form-text text-danger">
                        {errors.delivery_dateErr}
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
                            errors.priceErr ||
                            errors.delivery_dateErr ||
                            offerForm.details.length === 0 ||
                            offerForm.from_region.length === 0 ||
                            offerForm.to_region.length === 0 ||
                            offerForm.price.length === 0 ||
                            offerForm.delivery_date.length === 0
                          }
                          onClick={() => handleNotification("send you offer")} /////////////////
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
                      <DoneIcon
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></DoneIcon>
                    </h5>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-success"
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

          </div>
        );
      })}
    </>
  );
}

