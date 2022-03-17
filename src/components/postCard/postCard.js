//style
import "./postCard.css"
//hooks
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
//actions
import { getTags } from '../../Store/Actions/getTags'
//animated select react
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
//API requests 
import axios from 'axios'
import Popup from '../popup/popup'

export default function PostCard({ post }) {
  console.log("post.ownerProfilePic ",post.ownerProfilePic)
  const [style, setStyle] = useState("darkcustombtn");
  const history = useHistory()
  
  // ------------------------------update post if owner---------------------------------
  // get all tags 
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.TAGS.allTags)
  useEffect(() => {
    dispatch(getTags())
  }, []);
  // for tags select component
  const animatedComponents = makeAnimated();
  const tagsoptions = []
  tags.map((tag) => (
    tagsoptions.push({ value: tag.id, label: `${tag.name}` })
  )
  )
  // -----updated post ---------------------------------------------
  const [newPost, setNewPost] = useState({
    title: post.title,
    description: post.description,
    postpicture: null,
    from_region: post.from_region,
    to: post.to,
    price: post.price,
    ownerName: post.ownerName,
    user: post.user,
    tags: post.tags,
  })
  // selected tags------------
  const changeSelectedTags = (e) => {
    let list_of_tagsobjects = Object.values(e)
    let chosen = []
    for (let t of list_of_tagsobjects) {
      chosen.push(parseInt(t.value))
    }
    console.log(chosen)
    setNewPost({
      ...newPost,
      tags: chosen,
    })
  }
  // store values in newPost state
  const changeData = (e) => {
    if (e.target.name === "title") {
      console.log(e.target.value)
      setNewPost({
        ...newPost,
        title: e.target.value,
      })
    }

    else if (e.target.name === "details") {
      setNewPost({
        ...newPost,
        description: e.target.value,
      })
    }
    else if (e.target.name === "photo") {
      setNewPost({
        ...newPost,
        postpicture: e.target.files[0],
      })
    }
    else if (e.target.name === "price") {
      setNewPost({
        ...newPost,
        price: e.target.value,
      })
    }
    else if (e.target.name === "from") {
      setNewPost({
        ...newPost,
        from_region: e.target.value,
      })
    }
    else if (e.target.name === "to") {
      setNewPost({
        ...newPost,
        to: e.target.value,
      })
    }
  }
  const submitForm = (e) => {   
    e.preventDefault();
    // SEND API REQUEST
    let form_data = new FormData();
    form_data.append('title', newPost.title);
    form_data.append('description', newPost.description);
    if(newPost.postpicture !== null){
      console.log("not null")
      form_data.append('postpicture', newPost.postpicture, newPost.postpicture.name);
  }
    form_data.append('from_region', newPost.from_region);
    form_data.append('to', newPost.to);
    form_data.append('price', newPost.price);
    form_data.append('ownerName', newPost.ownerName);
    form_data.append('user', newPost.user);
    newPost.tags.forEach(item => {
      form_data.append('tags', item);
     });
    axios.patch(`http://127.0.0.1:8000/posts/posts/${localStorage.getItem('Updated_post_id')}/`, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      }
    })
      .then(history.push(`/home/`))
      .catch((err) => console.log(err))
  }



  //----------------------go to post details page------------------------------
  // const postDetails = (e, post_id) => {
  //   e.preventDefault()
  //   console.log(post_id)
  //   history.push(`/PostDetails/${post_id}`)
  // }
  // --------------------delete post if owner-----------------------------------
  const postDelete = (e, post_id) => {
    e.preventDefault()
    console.log(post_id)
    setStyle('darkcustombtnActive')
    axios.delete(`http://127.0.0.1:8000/posts/posts/${post_id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      }
    })
      .then(history.push(`/home/`))
      .catch((err) => console.log(err))
  }

  //-----getpostTags-------
  const postTags = []
  const getpostTags = () => {
    for (let tag of post.tags) {
      for (let t of tags) {
        if (t.id === tag) {
          postTags.push(t.name)
        }
      }
    }
  }
  getpostTags()
  //--------------------
  return (
    // https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg
    <div className="pt-5">
      {/* post section  start*/}
      <section className="border rounded shadow-lg p-5 postcard mt-5 mb-5" >
        {/* profile + date  */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-6 col-sm-6 text-center text-lg-start mb-lg-3 ">
            <img src={post.ownerProfilePic} className="me-2 userImage"
              height="80" alt="" loading="lazy" />
            <Link to="#" className="ps-2 text-link"> <span>{post.ownerName}</span> </Link>
          </div>
          <span className='pt-2 me-2'> Published on<u>{post.created_at}</u></span>
        </div>
        {/* profile + date end  */}
        {/* post content start */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-6 col-md-12 inline">
            <h1>{post.title}</h1>
            <p>
              {post.description}
            </p>
            <p>want it from : {post.from_region}</p>
            <p>Delivery will be in: {post.to}</p>
            <p>Price maximun limit: {post.price} $</p>
            {
              postTags.map((tag, index) => (
                <span key={index} className="me-3" >#{tag}</span>))
            }
          </div>
          { post.postpicture !== null
            ?
          <img src={post.postpicture} className="col-lg-6 col-md-12 img-fluid shadow-sm rounded-5 mb-4"
            alt="post" width='60%' length='180px' />
            :
            <div className="col-lg-6 col-md-12  shadow-sm rounded-5 mb-4">
              
            </div>
            }
        </div>
        {/* post content end */}
        <div className="row align-items-center mb-4  ">
          {

            localStorage.getItem("id") === post.user
              ?
              (
                <>
                  <div className="col-lg-3 col-md-3 col-sm-3 text-center">
                    <button type="button" className="btn px-3 me-1 darkcustombtn" onClick={() => { history.push("/offers") }}>
                      show offers</button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 text-center">
                    <button type="button" className={`btn px-3 me-1 darkcustombtn ${style}`} onClick={(e) => { postDelete(e, post.id) }}>
                      delete</button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 text-center">
                    <button type="submit" className="btn px-3 me-1 darkcustombtn"
                    onClick={() =>  localStorage.setItem("Updated_post_id", post.id)}  data-bs-toggle="modal" data-bs-target="#staticBackdropupdate" >
                      update</button>
                  </div>
                </>
              )
              :
              <div className="col-lg-3 col-md-3 col-sm-3 text-center ">
              <Popup postID={post.id} post={post} />
              </div>

          }

          {/* modal */}
          <div className="modal" id="staticBackdropupdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header ">
                  <h5 className="modal-title" id="staticBackdropLabel">Update post</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                  <form method="post" onSubmit={(e) => submitForm(e)} >
                    <label>TiTle</label>
                    <input type='text' className='form-control' name='title' onChange={(e) => changeData(e)} />
                    <label>details</label>
                    <input type="text" className='form-control offertxt' name='details' onChange={(e) => changeData(e)} />
                    <label>Post photo</label>
                    <input type="file" className='form-control' name='photo' onChange={(e) => changeData(e)} />
                    <label>price</label>
                    <input type='text' className='form-control' name='price' onChange={(e) => changeData(e)} />
                    <label>From </label>
                    <input type='text' className='form-control' name='from' onChange={(e) => changeData(e)} />
                    <label>Delivery location </label>
                    <input type='text' className='form-control' name='to' onChange={(e) => changeData(e)} />
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
                      <button type="button" className="btn btn-lg  darkcustombtn mt-3" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-lg  darkcustombtn mt-3" data-bs-dismiss="modal">Update</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
          {/* modal end */}
        </div>

      </section>

    </div>



  )

}


