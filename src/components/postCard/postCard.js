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
import { Modal, Button } from "react-bootstrap";

export default function PostCard({ post }) {
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
  const getpostTags = () => {
    for (let tag of post.tags) {
      for (let t of tags) {
        if (t.id === tag) {
          postTags.push(t.name);
        }
      }
    }
  };
  getpostTags();
  //--------------------
  return (
    <div className="container">
      <div className="postsCards col-sm-7 col-lg-12 col-md-11 ">
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
                <br />
                <p>{post.description}</p>
                <p>From : {post.from_region}</p>
                <p>I am in: {post.to}</p>
                <p>Price: {post.price}$</p>
                <div className="row">
                  {postTags.map((tag, index) => (
                    <span key={index} className="tagg me-1 col-lg-3 col-sm-6">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <br />
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
                  <Popup
                    postID={post.id}
                    post={post}
                    socket={socket}
                    currentuser={currentuser}
                  />
                </div>
              )}
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
                      label={"Add the country from where you want your order "}
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

              {/* modal */}
              {/* <div className="modal" id="staticBackdropupdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
              aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header ">
                    <h5 className="modal-title" id="staticBackdropLabel">Update post</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                  <div className="modal-body">
                    <form method="post" onSubmit={(e) => submitForm(e)} >
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

                      <div className="modal-footer">
                        <button type="button" className="btn btn-lg  darkcustombtn mt-3" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-lg  darkcustombtn mt-3" data-bs-dismiss="modal">Update</button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div> */}
              {/* modal end */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
