import { useEffect, useState } from 'react'
import PostCard from '../../components/postCard/postCard'
import Navbar from '../../components/navbar/navbar'
import Loader from '../../components/loader/loader'
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from '../../Store/Actions/getPosts'
import { getTags } from '../../Store/Actions/getTags'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
//animated select react
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
//socket for notifications
import { io } from "socket.io-client";


export default function Home() {
  // notifications
  const[userName ,setUserName] = useState("")
  const[user,setUser] = useState(null)
  const[socket,setSocket] = useState(null)
  useEffect(() => {
    const socket =io("http://localhost:5000") 
    setSocket(socket)
  },[])

  console.log("userName",userName)
  useEffect(() => {
    if(user !== null){
        console.log(socket.on("welcomeMessage", (msg) => {
            console.log(msg,user)
        }))
    }
    //send event to server
    socket?.emit("newUser",user)
  }, [socket,user])

////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //get all posts
    const posts = useSelector((state) => state.POSTS.postsList)
    const isloading = useSelector((state) => state.LOADER.isloading)
    const dispatch = useDispatch();
    // get all tags 
    const tags = useSelector((state) => state.TAGS.allTags)
    useEffect(() => {
        dispatch(getPosts())
        dispatch(getTags())
    }, []);

    const animatedComponents = makeAnimated();

    const tagsoptions = []
    tags.map((tag) => (
        tagsoptions.push({ value: tag.id, label: `${tag.name}` })
    )
    )


    //------------new post---------------------------------------------------
    const history = useHistory()
    const gotohome = () => {
        console.log("hiii")
    }

    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        postpicture: null,
        from_region: "",
        to: "",
        price: 0.0,
        ownerName: "shrouk hussein",
        user: 1,
        tags: [],
    })
    // select tags------------
    const changeSelectedTags = (e) => {
        console.log(Object.values(e))
        let list_of_tagsobjects = Object.values(e)
        let chosen = []
        for (let t of list_of_tagsobjects) {
            chosen.push( parseInt(t.value))
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
    // send post api------------------
    const submitForm = (e) => {
        e.preventDefault();
        // SEND API REQUEST
        let form_data = new FormData();
        form_data.append('title', newPost.title);
        form_data.append('description', newPost.description);
        form_data.append('postpicture', newPost.postpicture, newPost.postpicture.name);
        form_data.append('from_region', newPost.from_region);
        form_data.append('to', newPost.to);
        form_data.append('price', newPost.price);
        form_data.append('ownerName', newPost.ownerName);
        form_data.append('user', newPost.user);
      
        //form_data.append('tags', newPost.tags);
        newPost.tags.forEach(item => {
            form_data.append('tags', item);
           });
        console.log("taags " ,form_data)
        axios.post("http://127.0.0.1:8000/posts/posts/", form_data,{
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
            .then((res) => {
                console.log(res.data)
                dispatch(getPosts())
            })
            .catch((err) => console.log(err))
            return history.push("/home");
    }

    return (
        <>
            {/* navbar */}
            <Navbar socket={socket} />

            {/* body */}
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 col-span-1">
                        {/* add post */}
                     
                        <div className="pt-5">
                            <section className="border rounded shadow-lg p-5 postcard  mt-5 " >
                                   {/* /////////////////////////////////////////////////////// */}
                      <input type="text"  placeholder="userid" onChange={(e)=> setUserName(e.target.value)}/>
                      <button onClick={()=> setUser(parseInt(userName))}></button>
                                {/* profile + date  */}
                                <div className="row align-items-center mb-4">
                                    <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start mb-lg-3 ">
                                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg" className="rounded-5 shadow-1-strong me-2"
                                            height="80" alt="" loading="lazy" />
                                        <Link to="#" className="ps-2 text-link"> <span>Rahma</span> </Link>
                                    </div>
                                    <div className="col-lg-6  col-md-12  col-sm-12 text-center text-lg-start  p-5">
                                        <button type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-lg  darkcustombtn  ms-5  text-lg-end pe-3 m-lg-0">Add new post</button>
                                    </div>
                                    {/* <!-- Modal --> */}
                                    <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header ">
                                                    <h5 className="modal-title" id="staticBackdropLabel">add post</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <div className="modal-body">
                                                    <form method="post" onSubmit={(e) => submitForm(e)} >
                                                        <label>TiTle</label>
                                                        <input type='text' className='form-control' name='title' required onChange={(e) => changeData(e)} />
                                                        <label>details</label>
                                                        <input type="text" className='form-control offertxt' name='details' onChange={(e) => changeData(e)} />
                                                        <label>Post photo</label>
                                                        <input type="file" className='form-control' name='photo' required onChange={(e) => changeData(e)} />
                                                        <label>price</label>
                                                        <input type='text' className='form-control' name='price' required onChange={(e) => changeData(e)} />
                                                        <label>From </label>
                                                        <input type='text' className='form-control' name='from' required onChange={(e) => changeData(e)} />
                                                        <label>Delivery location </label>
                                                        <input type='text' className='form-control' name='to' required onChange={(e) => changeData(e)} />
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
                                                            <button type="submit" className="btn btn-lg  darkcustombtn mt-3" onClick={gotohome()}>Post</button>
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
                        {isloading
                            ? (
                                <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                                    <div className="flex items-center justify-center mb-8 lg:mb-4 w-full lg:w-auto mr-8 items-center">
                                        <h1 className="align-middle mt-8">
                                            < Loader />
                                        </h1>

                                    </div>
                                </div>
                            )
                            : (
                                posts.map((post, index) => (
                                    <PostCard key={index} post={post} socket={socket} user={user}/>
                                ))
                            )
                        }
                    </div>

                </div>

            </div>
        </>

    )
}
