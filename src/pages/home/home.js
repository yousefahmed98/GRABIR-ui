import React from "react";
import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/postCard";
import Navbar from "../../components/navbar/navbar";
import Loader from "../../components/loader/loader";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../Store/Actions/getPosts";
import { getTags } from "../../Store/Actions/getTags";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../components/fonts.css";
//animated select react
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./home.css";
import CustomInput from "../../components/CustomInput";

export default function Home() {
  //get all posts
  const posts = useSelector((state) => state.POSTS.postsList);
  const isloading = useSelector((state) => state.LOADER.isloading);
  // const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  // get all tags
  const tags = useSelector((state) => state.TAGS.allTags);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getTags());
  }, [dispatch]);

  const hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };

  const animatedComponents = makeAnimated();

  const tagsoptions = [];
  tags.map((tag) => tagsoptions.push({ value: tag.id, label: `${tag.name}` }));

  //------------new post---------------------------------------------------
  const history = useHistory();
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    postpicture: "",
    from_region: "",
    to: "",
    price: 0.0,
    ownerName: localStorage.getItem("username"),
    user: localStorage.getItem("id"),
    tags: [],
  });
  //------------------errors------------------------------------
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
  // select tags------------
  const changeSelectedTags = (e) => {
    setErrors({
      ...errors,
      tags: Object.values(e).length === 0 ? "required" : "",
    });

    let list_of_tagsobjects = Object.values(e);
    let chosen = [];
    for (let t of list_of_tagsobjects) {
      chosen.push(parseInt(t.value));
    }
    setNewPost({
      ...newPost,
      tags: chosen,
    });
  };

  // store values in newPost state
  const changeData = (e) => {
    if (e.target.name === "title") {
      setNewPost({
        ...newPost,
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
      setNewPost({
        ...newPost,
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
            : "Title shouldn't contain !@#$%^&*",
      });
    } else if (e.target.name === "postpic") {
      console.log(e.target.files[0].name.split(".")[1]);
      setNewPost({
        ...newPost,
        postpicture: e.target.files[0],
      });
      setErrors({
        ...errors,
        postpicture:
          e.target.files[0].name.split(".")[1] === "jpg" ||
          e.target.files[0].name.split(".")[1] === "png" ||
          e.target.files[0].name.split(".")[1] === "svg" ||
          e.target.files[0].name.split(".")[1] === "JPG" ||
          e.target.files[0].name.split(".")[1] === "PNG" ||
          e.target.files[0].name.split(".")[1] === "SVG"
            ? null
            : "you should upload images only",
      });
    } else if (e.target.name === "price") {
      const has_WhiteSpace = hasWhiteSpace(e.target.value);
      setNewPost({
        ...newPost,
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
      setNewPost({
        ...newPost,
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
      setNewPost({
        ...newPost,
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

  // send post api------------------
  const submitForm = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    let sendRequest = true;

    if (newPost.tags.length === 0) {
      sendRequest = false;
      setErrors({
        ...errors,
        tags: " required",
      });
    }
    if (document.getElementById("from").value.length === 0) {
      sendRequest = false;
      setErrors({
        ...errors,
        from_region: " required",
      });
    }
    if (document.getElementById("to_region").value.length === 0) {
      sendRequest = false;
      setErrors({
        ...errors,
        to: " required",
      });
    }
    if (document.getElementById("title").value.length === 0) {
      sendRequest = false;
      setErrors({
        ...errors,
        title: "Title is required",
      });
    }
    if (document.getElementById("details").value.length === 0) {
      sendRequest = false;
      setErrors({
        ...errors,
        description: "Description is required",
      });
    }
    if (
      document.getElementById("price").value.length === 0 ||
      document.getElementById("price").value == 0
    ) {
      sendRequest = false;
      setErrors({
        ...errors,
        price: "Title is required",
      });
    }
    if (
      !errors.title &&
      !errors.description &&
      !errors.postpicture &&
      !errors.from_region &&
      !errors.to &&
      !errors.price &&
      !errors.tags
    ) {
      history.push("/home");
    }

    // SEND API REQUEST
    if (sendRequest === true) {
      if (newPost.tags.length !== 0 || newPost.description.length !== 0) {
        form_data.append("title", newPost.title);
        form_data.append("description", newPost.description);
        if (newPost.postpicture !== "") {
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
      }
    }
  };
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
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
      if (
        el.ownerName.toLowerCase().includes(inputText) ||
        el.title.toLowerCase().includes(inputText) ||
        el.from_region.toLowerCase().includes(inputText) ||
        el.to.toLowerCase().includes(inputText)
      ) {
        return el;
      }
      return console.log("else return");
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
                  <div className="box  border mt-5 ms-3 me-3">
                    <i className="fa fa-search" aria-hidden="true"></i>

                    <input
                      type="text"
                      name=""
                      className="input p-2"
                      onChange={(e) => inputHandler(e)}
                      placeholder="Search Posts with Person, Title, Country or Tags"
                    />
                  </div>
                  
                  <section className="border rounded shadow-sm p-1 postcard  mt-5  ">
                    {/* profile + date  */}

                    <div className="row align-items-center ">
                      <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start ">
                        <img
                          src={localStorage.getItem("ProfilePic")}
                          className="me-2 ms-5 userImage"
                          height="80"
                          alt="ProfilePic"
                          loading="lazy"
                        />
                        <span className="">
                          {localStorage.getItem("username")}
                        </span>
                      </div>
                      <div className="col-lg-6  col-md-12  col-sm-12 text-center text-lg-end  p-5 ">
                        <button
                          type="submit"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          className="btn btn-lg btn-outline-dark    ms-5  text-lg-end pe-3 m-lg-0 card__btn"
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
                                <CustomInput
                                  id="title"
                                  label={"TiTle"}
                                  errors={errors.title}
                                  value={newPost.title}
                                  handleChange={(e) => changeData(e)}
                                  name={"title"}
                                  type="text"
                                />
                                <CustomInput
                                  id="details"
                                  label={"Details about your order"}
                                  errors={errors.description}
                                  value={newPost.description}
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
                                  value={newPost.price}
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
                                  value={newPost.from_region}
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
                                  value={newPost.to}
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
                                <div className="form-text text-danger">
                                  {errors.tags}
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-lg btn-danger  darkcustombtn mt-3"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    href="/home"
                                    data-bs-dismiss="modal"
                                    className="btn btn-lg btn-dark  darkcustombtn mt-3"
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
        </>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}
