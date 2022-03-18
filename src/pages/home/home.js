import React from "react";
import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/postCard";
import Navbar from "../../components/navbar/navbar";
import Loader from "../../components/loader/loader";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../Store/Actions/getPosts";
import { getTags } from "../../Store/Actions/getTags";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//animated select react
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextField from "@mui/material/TextField";
import "../../components/fonts.css";
//

export default function Home() {
  //get all posts
  const posts = useSelector((state) => state.POSTS.postsList);
  const isloading = useSelector((state) => state.LOADER.isloading);
  const user = useSelector((state) => state.auth.user);
  console.log(
    user,
    "*/*/*/*/**************///////////////*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"
  );
  console.log(localStorage.getItem("region"), "this is region");
  console.log(
    localStorage.getItem("username"),
    "this is username of current user"
  );
  console.log(localStorage.getItem("isVerfied"), "verfieeeeeeeeeeeed or not");
  // console.log(user.email,"this is current user email email");
  const dispatch = useDispatch();
  // get all tags
  const tags = useSelector((state) => state.TAGS.allTags);
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getTags());
    console.log("tagssss", tags);
    console.log("postsss", posts);
  }, []);

  const animatedComponents = makeAnimated();

  const tagsoptions = [];
  tags.map((tag) => tagsoptions.push({ value: tag.id, label: `${tag.name}` }));

  //------------new post---------------------------------------------------
  const history = useHistory();
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    postpicture: null,
    from_region: "",
    to: "",
    price: 0.0,
    ownerName: localStorage.getItem("username"),
    user: localStorage.getItem("id"),
    tags: [],
  });
  // select tags------------
  const changeSelectedTags = (e) => {
    console.log(Object.values(e));
    let list_of_tagsobjects = Object.values(e);
    let chosen = [];
    for (let t of list_of_tagsobjects) {
      chosen.push(parseInt(t.value));
    }
    console.log(chosen);
    setNewPost({
      ...newPost,
      tags: chosen,
    });
  };
  // store values in newPost state
  const changeData = (e) => {
    if (e.target.name === "title") {
      console.log(e.target.value);
      setNewPost({
        ...newPost,
        title: e.target.value,
      });
    } else if (e.target.name === "details") {
      setNewPost({
        ...newPost,
        description: e.target.value,
      });
    } else if (e.target.name === "photo") {
      setNewPost({
        ...newPost,
        postpicture: e.target.files[0],
      });
    } else if (e.target.name === "price") {
      setNewPost({
        ...newPost,
        price: e.target.value,
      });
    } else if (e.target.name === "from") {
      setNewPost({
        ...newPost,
        from_region: e.target.value,
      });
    } else if (e.target.name === "to") {
      setNewPost({
        ...newPost,
        to: e.target.value,
      });
    }
  };
  // send post api------------------
  const submitForm = (e) => {
    e.preventDefault();
    // SEND API REQUEST
    let form_data = new FormData();
    form_data.append("title", newPost.title);
    form_data.append("description", newPost.description);
    if (newPost.postpicture !== null) {
      console.log("object", newPost.postpicture);
      form_data.append(
        "postpicture",
        newPost.postpicture,
        newPost.postpicture.name
      );
    }
    form_data.append("from_region", newPost.from_region);
    form_data.append("to", newPost.to);
    form_data.append("price", newPost.price);
    form_data.append("ownerName", newPost.ownerName);
    form_data.append("user", newPost.user);
    //form_data.append('tags', newPost.tags);
    newPost.tags.forEach((item) => {
      form_data.append("tags", item);
    });
    console.log("taags ", form_data);
    axios
      .post("http://127.0.0.1:8000/posts/posts/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(getPosts());
      })
      .catch((err) => console.log(err));
    return history.push("/home");
  };
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log("lower caseee: ", lowerCase);
  };
  const filteredData = posts.filter((el) => {
    //if no input the return the original
    if (inputText === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      for (let tag of el.tags) {
        for (let t of tags) {
          if (t.id === tag && t.name.toLowerCase().includes(inputText)) {
            return el;
          }
        }
      }

    }
  });

  return (
    <div className="home">
      {localStorage.getItem("email") ? (
        <>
          {/* navbar */}
          <Navbar />

          {/* body */}
          <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 col-span-1">
                {/* add post */}
                <div className="pt-5">
                  <section className="border rounded shadow-lg p-5 postcard  mt-5 ">
                    <div className="main">
                      <div className="search">
                        <TextField
                          id="outlined-basic"
                          onChange={inputHandler}
                          variant="outlined"
                          fullWidth
                          label="Search Posts with Tags"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="border rounded shadow-lg p-5 postcard  mt-5 ">
                    {/* profile + date  */}

                    <div className="row align-items-center mb-4">
                      <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start mb-lg-3 ">
                        <img
                          src={localStorage.getItem("ProfilePic")}
                          className="me-2 userImage"
                          height="80"
                          alt="ProfilePic"
                          loading="lazy"
                        />
                        <Link to="#" className="ps-2 text-link">
                          {" "}
                          <span>{localStorage.getItem("username")}</span>{" "}
                        </Link>
                      </div>
                      <div className="col-lg-6  col-md-12  col-sm-12 text-center text-lg-start  p-5">
                        <button
                          type="submit"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          className="btn btn-lg  darkcustombtn  ms-5  text-lg-end pe-3 m-lg-0"
                        >
                          Add new post
                        </button>
                      </div>
                      {/* <!-- Modal --> */}

                      <div
                        className="modal"
                        id="staticBackdrop"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header ">
                              <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                              >
                                add post
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>

                            <div className="modal-body">
                              <form
                                method="post"
                                onSubmit={(e) => submitForm(e)}
                              >
                                <label>TiTle</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="title"
                                  required
                                  onChange={(e) => changeData(e)}
                                />
                                <label>details</label>
                                <input
                                  type="text"
                                  className="form-control offertxt"
                                  name="details"
                                  required
                                  onChange={(e) => changeData(e)}
                                />
                                <label>Post photo</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="photo"
                                  onChange={(e) => changeData(e)}
                                />
                                <label>price</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="price"
                                  required
                                  onChange={(e) => changeData(e)}
                                />
                                <label>From </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="from"
                                  required
                                  onChange={(e) => changeData(e)}
                                />
                                <label>Delivery location </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="to"
                                  required
                                  onChange={(e) => changeData(e)}
                                />
                                <label>Choose relevant tags</label>
                                <Select
                                  closeMenuOnSelect={true}
                                  components={animatedComponents}
                                  isMulti
                                  options={tagsoptions}
                                  onChange={(e) => changeSelectedTags(e)}
                                  name="tags"
                                  setValue
                                />
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-lg  darkcustombtn mt-3"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-lg  darkcustombtn mt-3"
                                    data-bs-dismiss="modal"
                                  >
                                    Post
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end Modal  */}
                    </div>
                  </section>
                </div>

                {/* add post end */}
                {/* posts */}
                {isloading ? (
                  <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                    <div className="flex items-center justify-center mb-8 lg:mb-4 w-full lg:w-auto mr-8 items-center">
                      <h1 className="align-middle mt-8">
                        <Loader />
                      </h1>
                    </div>
                  </div>
                ) : (
                  filteredData.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))
                )}
              </div>
            </div>
          </div>
          <div></div>
          {/* { localStorage.getItem("isVerfied") ? console.log("truetruetruetruetruetruetruetrue") : console.log("FalseFalseFalseFalseFalseFalseFalse") } */}
        </>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}
