//----------------------------------------------------------------
import { axiosInstance } from "../../network/axiosInstance";
import logo from "../../pages/landing/assets/img/logo2.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "../popup/popup.css";
// ----------------------------------------------------------------
import React from "react";
//style
import "./postCard.css";
//hooks
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//actions
import { getTags } from "../../Store/Actions/getTags";
//animated select react
import Select from "react-select";
import makeAnimated from "react-select/animated";
//API requests
import axios from "axios";
import Popup from "../popup/popup";
import CustomInput from "../CustomInput";
import { Modal } from "react-bootstrap";

export default function PostCard(props) {
  // const [postTest, setPost] = useState();
  // setPost(post)
  // console.log("tesssssssssttttt: ",postTest)

  // -----------------------------------------------------
  // console.log("propss posttt: ", props.post);
  const [offerForm, setOfferForm] = useState({
    details: "",
    from_region: "",
    to_region: "",
    price: "",
    post: "",
    delivery_date: "",
    created_at: "",
    title: "",
    description: "",
    postpicture: "",
    from_region: "",
    to: "",
    price: "",
    ownerName: "",
    user: "",
    tags: "",

    offer_owner: localStorage.getItem("id"),
  });
  // setPost(post)
  // console.log("tesssssssssttttt: ",postTest)
  function handleShowOffer(postId, postPic) {
    console.log("iddddddd: ", postId);
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
        setOfferForm({
          ...offerForm,
          post: postId,
          title: res.data.title,
          description: res.data.description,
          postpicture: postPic,
          from_region: res.data.from_region,
          to: res.data.to,
          price: res.data.price,
          ownerName: res.data.ownerName,
          user: res.data.user,
          tags: res.data.tags,
          created_at: res.data.created_at,
        });
      })
      .catch((err) => console.log(err));
  }
  const [newNotifyObj, setNewNotifyObj] = useState({
    body: "",
    from_user_name: null,
    to_user: null,
  });

  /////////////////////////////////////////////////////////////////////////////
  const handleNotification = (type) => {
    //lmafrod acreate notification object f db
    //type hwa body
    socket.emit("sendNotification", {
      senderName: currentuser.username,
      reciverId: offerForm.user,
      type,
    });

    setNewNotifyObj({
      ...newNotifyObj,
      body: type,
      from_user_name: currentuser.username,
      from_user: currentuser.id,
      to_user: offerForm.user,
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

  const submitFormOffer = (e) => {
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
  const changeOfferData = (e) => {
    if (e.target.name === "details") {
      setOfferForm({
        ...offerForm,
        details: e.target.value,
      });
      setOfferErrors({
        ...offerErrors,
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
      setOfferErrors({
        ...offerErrors,
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
      setOfferErrors({
        ...offerErrors,
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
      setOfferErrors({
        ...offerErrors,
        priceErr:
          e.target.value.length === 0
            ? "Price is required"
            : !/^[0-9]+$/.test(e.target.value)
            ? "Enter valid price"
            : e.target.value > 0 || !/\s/.test(e.target.value)
            ? ""
            : "",
      });
    } else if (e.target.name === "delivery_date") {
      setOfferForm({
        ...offerForm,
        delivery_date: e.target.value,
      });
      setOfferErrors({
        ...offerErrors,
        delivery_dateErr:
          e.target.value === null
            ? "This field is required"
            : e.target.value < offerForm.created_at
            ? "Enter valid date, you chose date before today! "
            : "",
      });
    }
  };

  // -----------------------------------------------------
  const [show, setShow] = useState(false);
  function handleShow(postId) {
    axios
      .get(`http://127.0.0.1:8000/posts/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setupdatedPost({
          ...updatedPost,
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
    setShow(true);
  }
  const handleClose = () => {
    submitForm();
    setShow(false);
  };
  const handleClosewithoutChanges = () => {
    setShow(false);
  };
  const [style, setStyle] = useState("darkcustombtn");
  const history = useHistory();
  //socket
  const socket = useSelector((state) => state.SOCKET.socket);
  // ------------------------------update post if owner---------------------------------
  // get all tags
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.TAGS.allTags);
  console.log("taaaaags: ", tags);
  const [currentuser, setCurrentuser] = useState({
    username: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    setuser();
  }, [localStorage.getItem("id")]);

  useEffect(() => {
    if (currentuser.id !== null) {
      console.log(
        socket.on("welcomeMessage", (msg) => {
          console.log(msg, currentuser);
        })
      );

      //send event to server
      socket?.emit("newUser", currentuser);
    }
  }, [socket, currentuser]);

  const setuser = () => {
    setCurrentuser({
      ...currentuser,
      username: localStorage.getItem("username"),
      id: localStorage.getItem("id"),
    });
  };
  // for tags select component
  const animatedComponents = makeAnimated();
  const tagsoptions = [];
  tags.map((tag) => tagsoptions.push({ value: tag.id, label: `${tag.name}` }));
  // -----updated post ---------------------------------------------

  const [updatedPost, setupdatedPost] = useState({
    title: "",
    description: "",
    postpicture: null,
    from_region: "",
    to: "",
    price: "",
    ownerName: "",
    user: "",
    tags: "",
  });
  const [errors, setErrors] = useState(
    // initialState intial values
    {
      title: "",
      description: "",
      postpicture: "",
      from_region: "",
      to: "",
      price: "",
      tags: "",
    }
  );

  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };

  // selected tags------------
  const changeSelectedTags = (e) => {
    let list_of_tagsobjects = Object.values(e);
    let chosen = [];
    for (let t of list_of_tagsobjects) {
      chosen.push(parseInt(t.value));
    }
    setupdatedPost({
      ...updatedPost,
      tags: chosen,
    });
  };
  // store values in updatedPost state
  const changeData = (e) => {
    if (e.target.name === "title") {
      setupdatedPost({
        ...updatedPost,
        title: e.target.value,
      });
      setErrors({
        ...errors,
        title:
          e.target.value.length === 0 || e.target.value.length < 10
            ? "Title is required at least 10 Character"
            : e.target.value[0] === " "
            ? "Enter valid title"
            : /^[a-zA-Z\s]+$/.test(e.target.value)
            ? ""
            : "Title should contains letters only",
      });
    } else if (e.target.name === "details") {
      setupdatedPost({
        ...updatedPost,
        description: e.target.value,
      });
      setErrors({
        ...errors,
        description:
          e.target.value.length === 0 && e.target.value.length < 10
            ? "You should write details to facilitate handling"
            : e.target.value[0] === " "
            ? "enter valid title"
            : /^[a-zA-Z\s 0-9]+$/.test(e.target.value)
            ? ""
            : "details shouldn't contain !@#$%^&*",
      });
    } else if (e.target.name === "postpic") {
      setupdatedPost({
        ...updatedPost,
        postpicture: e.target.files[0],
      });
      setErrors({
        ...errors,
        postpicture:
          e.target.files[0].name.split(".")[1] === "jpg" ||
          e.target.files[0].name.split(".")[1] === "png" ||
          e.target.files[0].name.split(".")[1] === "svg" ||
          e.target.files[0].name.split(".")[1] === "jpeg" ||
          e.target.files[0].name.split(".")[1] === "JEPG" ||
          e.target.files[0].name.split(".")[1] === "JPG" ||
          e.target.files[0].name.split(".")[1] === "PNG" ||
          e.target.files[0].name.split(".")[1] === "SVG"
            ? null
            : "you should upload images only",
      });
    } else if (e.target.name === "price") {
      const has_WhiteSpace = hasWhiteSpace(e.target.value);
      setupdatedPost({
        ...updatedPost,
        price: e.target.value,
      });
      setErrors({
        ...errors,
        price:
          e.target.value.length === 0
            ? "Price is required"
            : !/^[0-9]+$/.test(e.target.value)
            ? "Enter valid price"
            : e.target.value > 0 || !has_WhiteSpace
            ? ""
            : "Enter valid price shouldn't contain spaces",
      });
    } else if (e.target.name === "from") {
      setupdatedPost({
        ...updatedPost,
        from_region: e.target.value,
      });
      setErrors({
        ...errors,
        from_region:
          e.target.value.length === 0 || e.target.value.length < 2
            ? " This field is required and must be at least 2 characters"
            : e.target.value[0] === " "
            ? "enter valid country name"
            : /^[a-zA-Z\s]+$/.test(e.target.value)
            ? ""
            : "enter valid country name",
      });
    } else if (e.target.name === "to_region") {
      setupdatedPost({
        ...updatedPost,
        to: e.target.value,
      });
      setErrors({
        ...errors,
        to:
          e.target.value.length === 0 || e.target.value.length < 2
            ? " This field is required and must be at least 2 characters"
            : e.target.value[0] === " "
            ? "enter valid country name"
            : /^[a-zA-Z\s]+$/.test(e.target.value)
            ? ""
            : "enter valid country name",
      });
    }
  };
  const submitForm = () => {
    // e.preventDefault();
    // SEND API REQUEST
    console.log(updatedPost.from_region, updatedPost.title, updatedPost.id);
    let form_data = new FormData();
    form_data.append("title", updatedPost.title);
    form_data.append("description", updatedPost.description);
    if (updatedPost.postpicture !== null) {
      form_data.append(
        "postpicture",
        updatedPost.postpicture,
        updatedPost.postpicture.name
      );
    }
    form_data.append("from_region", updatedPost.from_region);
    form_data.append("to", updatedPost.to);
    form_data.append("price", updatedPost.price);
    form_data.append("ownerName", updatedPost.ownerName);
    form_data.append("user", updatedPost.user);
    updatedPost.tags.forEach((item) => {
      form_data.append("tags", item);
    });
    axios
      .patch(
        `http://127.0.0.1:8000/posts/posts/${updatedPost.id}/`,
        form_data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then(history.push(`/home/`))
      .catch((err) => console.log(err));
  };

  // --------------------delete post if owner-----------------------------------
  const postDelete = (e, post_id) => {
    e.preventDefault();
    setStyle("darkcustombtnActive");
    axios
      .delete(`http://127.0.0.1:8000/posts/posts/${post_id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then(history.push(`/home/`))
      .catch((err) => console.log(err));
  };

  //-----getpostTags-------
  const postTags = [];
  const getpostTags = (post) => {
    // mkntsh btakhod post
    for (let tag of post.tags) {
      for (let t of tags) {
        if (t.id === tag) {
          postTags.push(t.name);
        }
      }
    }
  };
  // getpostTags();
  const [offerErrors, setOfferErrors] = useState({
    detailsErr: null,
    from_regionErr: null,
    to_regionErr: null,
    delivery_dateErr: null,
    priceErr: null,
  });
  //--------------------
  return (
    // getpostTags(post)

    <div className="container">
      {props.posts.map((post, index) => {
        console.log("postttttt mappp: ", post);
        getpostTags(post);
        return (
          <div key={index} className="postsCards col-sm-7 col-lg-12 col-md-11 ">
            <div className="py-4 ">
              {/* post section  start*/}
              <section className="boxxx rounded shadow-lg p-5 postcard mt-5 mb-5">
                {/* profile + date  */}
                <div className="row align-items-center mb-4">
                  <div className="col-lg-6 col-sm-6 text-center text-lg-start mb-lg-3 ">
                    <img
                      src={post.ownerProfilePic}
                      className="me-2 userImage"
                      height="80"
                      alt=""
                      loading="lazy"
                    />
                    <Link to="#" className="ps-2 text-link">
                      {" "}
                      <span>{post.ownerName}</span>{" "}
                    </Link>
                  </div>
                  <span className="pt-2 me-2">
                    {" "}
                    Published on <p className="p-1">{post.created_at}</p>
                  </span>
                </div>
                {/* profile + date end  */}
                <hr />
                {/* post content start */}
                <div className="row align-items-center mb-4">
                  <div className="col-lg-6 col-md-12 carddddd">
                    <h2 className="titlee">{post.title}</h2>
                    <div>
                      <p> {post.description}</p>
                    </div>
                    <div>
                      <p className=" colrrrr">From : </p>
                      <span>{post.from_region}</span>
                    </div>
                    <div>
                      <p className=" colrrrr">I am in:</p>
                      <span>{post.to}</span>
                    </div>
                    <div>
                      <p className=" colrrrr">Price: </p>
                      <span> {post.price}$</span>
                    </div>
                    <div className="row">
                      {postTags.map((tag, index) => (
                        <span
                          key={index}
                          className="tagg me-1 col-lg-3 col-sm-6"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* profile + date end  */}
                  {/* <hr /> */}
                  {/* post content start */}

                  {post.postpicture !== null ? (
                    <img
                      src={post.postpicture}
                      className=" p-0 img-box col-lg-6 col-md-12 img-fluid shadow-sm rounded-5 mb-4"
                      alt="post"
                      width="60%"
                      length="180px"
                    />
                  ) : (
                    <div className="col-lg-6 col-md-12  shadow-sm rounded-5 mb-4"></div>
                  )}
                </div>
                {/* post content end */}
                <div className="row align-items-center mb-4  ">
                  {localStorage.getItem("id") == post.user ? (
                    <>
                      {/* <div className="col-lg-3 col-md-3 col-sm-3 text-center">
                    <button type="button" className="btn px-3 me-1 darkcustombtn" onClick={() => {   history.push(`/PostDetails/${post.id}`) }}>
                      show offers</button>
                    </div> */}

                      <div className="col-lg-3 col-md-3 col-sm-3 text-center">
                        <button
                          type="button"
                          className={`btn px-3 me-1 btn-outline-dark`}
                          onClick={(e) => {
                            postDelete(e, post.id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          type="submit"
                          className="btn px-3 me-1 btn-outline-dark"
                          onClick={() => handleShow(post.id)}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropupdate"
                        >
                          Update
                        </button>
                      </div>
                      {/* <div className="col-lg-3 col-md-3 col-sm-3 text-center ">
        
                    </div> */}
                    </>
                  ) : (
                    <div className="col-lg-3 col-md-3 col-sm-3 text-center ">
                      {/* <Button
                        variant="outlined"
                        onClick={() =>
                          handleShowOffer(post.id, post.postpicture)
                        }
                        data-bs-toggle="modal"
                        href="#exampleModalToggle"
                        role="button"
                        type="submit"
                        endIcon={<LocalOfferIcon />}
                      >
                        Make Offer
                      </Button> */}
                      <button type="button" className="btn px-3  btn-outline-dark" data-bs-toggle="modal"  data-bs-target= "#exampleModalToggle"> Make Offer</button>

                    </div>
                  )}
                  {/* ------------------------------------------------------------------------ */}
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
                            <form onSubmit={(e) => submitFormOffer(e)}>
                              <div className="mb-2 mr-5">
                                <TextField
                                  id="outlined-search"
                                  className="form-control"
                                  label="Details"
                                  type="text"
                                  style={{ marginBottom: 5 }}
                                  name="details"
                                  value={offerForm.details}
                                  onChange={(e) => changeOfferData(e)}
                                />
                                <div
                                  id="usernameHelp"
                                  className="form-text text-danger"
                                >
                                  {offerErrors.detailsErr}
                                </div>
                              </div>
                              <div className="mb-2 mr-5">
                                <TextField
                                  style={{ marginRight: 3, marginBottom: 8 }}
                                  type="text"
                                  id="outlined-required"
                                  label="From"
                                  value={offerForm.from_region}
                                  onChange={(e) => changeOfferData(e)}
                                  name="from_region"
                                />
                                <TextField
                                  type="text"
                                  id="outlined-required"
                                  label="To"
                                  style={{ marginRight: 3, marginBottom: 8 }}
                                  value={offerForm.to_region}
                                  onChange={(e) => changeOfferData(e)}
                                  name="to_region"
                                />
                                <div
                                  id="usernameHelp"
                                  className="form-text text-danger"
                                >
                                  {offerErrors.from_regionErr ||
                                    offerErrors.to_regionErr}
                                </div>
                              </div>

                              <div className="mb-2 mr-5">
                                <TextField
                                  id="outlined-number"
                                  label="Price"
                                  style={{ marginRight: 3, marginBottom: 8 }}
                                  type="number"
                                  value={offerForm.price}
                                  onChange={(e) => changeOfferData(e)}
                                  name="price"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />

                                <TextField
                                  id="outlined-read-only-input"
                                  label="Post ID"
                                  style={{ marginRight: 3, marginBottom: 8 }}
                                  value={offerForm.post}
                                  // onChange={(e) => changeData(e)}
                                  name="post_id"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <div
                                  id="usernameHelp"
                                  className="form-text text-danger"
                                >
                                  {offerErrors.priceErr}
                                </div>
                              </div>

                              <div className="mb-2 mr-5">
                                <TextField
                                  id="outlined-number"
                                  label="Expected Delivery Date"
                                  style={{ marginRight: 3, marginBottom: 8 }}
                                  type="date"
                                  value={offerForm.delivery_date}
                                  onChange={(e) => changeOfferData(e)}
                                  name="delivery_date"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </div>
                              <div
                                id="usernameHelp"
                                className="form-text text-danger"
                              >
                                {offerErrors.delivery_dateErr}
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
                                    offerErrors.detailsErr ||
                                    offerErrors.from_regionErr ||
                                    offerErrors.to_regionErr ||
                                    offerErrors.priceErr ||
                                    offerErrors.delivery_dateErr ||
                                    offerErrors.priceErr ||
                                    offerForm.details.length === 0 ||
                                    offerForm.from_region.length === 0 ||
                                    offerForm.to_region.length === 0 ||
                                    offerForm.price.length === 0 ||
                                    offerForm.price == 0 ||
                                    offerForm.delivery_date.length === 0
                                  }
                                  onClick={() =>
                                    handleNotification("send you offer")
                                  } /////////////////
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
                            <h5
                              className="modal-title"
                              id="exampleModalToggleLabel2"
                            >
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
                    {/* ------------------------------------------------------------------------ */}
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form method="post">
                          <CustomInput
                            id="title"
                            label={"TiTle"}
                            errors={errors.title}
                            value={updatedPost.title}
                            handleChange={(e) => changeData(e)}
                            name={"title"}
                            type="text"
                          />
                          <CustomInput
                            id="details"
                            label={"Details about your order"}
                            errors={errors.description}
                            value={updatedPost.description}
                            handleChange={(e) => changeData(e)}
                            name={"details"}
                            type="text"
                          />
                          <CustomInput
                            id="postpic"
                            label={"Add image of your order"}
                            errors={errors.postpicture}
                            handleChange={(e) => changeData(e)}
                            name="postpic"
                            type="file"
                          />
                          <CustomInput
                            id="price"
                            label={"Add price you well pay"}
                            errors={errors.price}
                            value={updatedPost.price}
                            handleChange={(e) => changeData(e)}
                            name="price"
                            type="text"
                          />
                          <CustomInput
                            id="from"
                            label={
                              "Add the country from where you want your order "
                            }
                            errors={errors.from_region}
                            value={updatedPost.from_region}
                            handleChange={(e) => changeData(e)}
                            name="from"
                            type="text"
                          />
                          <CustomInput
                            id="to_region"
                            label={
                              "Add the country  you want to recive your order in "
                            }
                            errors={errors.to}
                            value={updatedPost.to}
                            handleChange={(e) => changeData(e)}
                            name="to_region"
                            type="text"
                          />
                          <label>Choose relevant tags</label>
                          <Select
                            id="tags"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            isMulti
                            options={tagsoptions}
                            onChange={(e) => changeSelectedTags(e)}
                            name="tags"
                            setValue
                          />

                          {/* <div className="modal-footer">
                        <button type="button" className="btn btn-lg  darkcustombtn mt-3" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-lg  darkcustombtn mt-3" data-bs-dismiss="modal">Update</button>
                      </div> */}
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          type="submit"
                          variant="secondary"
                          onClick={handleClosewithoutChanges}
                        >
                          close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleClose}
                          disabled={
                            errors.title ||
                            errors.description ||
                            errors.postpicture ||
                            errors.from_region ||
                            errors.to ||
                            errors.price ||
                            errors.tags
                          }
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
}
