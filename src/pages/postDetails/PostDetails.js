// import axios from 'axios';
import React from "react"

import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import PostCard from '../../components/postCard/postCard'
import Navbar from '../../components/navbar/navbar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from '../../Store/Actions/getPosts'
// import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useHistory } from 'react-router-dom';

export default function PostDetails() {
  const history = useHistory();
  const posts = useSelector((state) => state.POSTS.postsList)
  const dispatch = useDispatch();
  const params = useParams();   // return object for dynamic params  like /:id
  const [details, setDetails] = useState({})  //to store returned data
  // const [owner, setOwner] = useState(false);

  useEffect(() => {
    dispatch(getPosts())
    for (let post of posts) {
      if (post.id === params.id) {
        console.log(post)
        setDetails(post)
      }
    }
  }, [])

  return (
    <>
    { localStorage.getItem("email") ? (
      <>
 <Navbar />
      <div className="container mx-auto px-10 mb-8 ">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="mt-3 lg:col-span-8 col-span-1 ">
            <PostCard post={details} />
            {/* add offer */}
            {/* {owner} ? <></> : */}
            <section className="border rounded shadow-1-strong p-5 postcard  mb-5" >
              {/* profile + date  */}
              <div className="row align-items-center mb-4">
                <div className="col-lg-3 col-sm-3 text-center text-lg-start mb-lg-3 ">
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg" className="rounded-5 shadow-1-strong me-2"
                    height="80" alt="" loading="lazy" />
                  <Link to="#" className="ps-2 text-link"> <span>Rahma</span> </Link>
                </div>
                <div className="col-lg-9 col-sm-9 text-center text-lg-start mb-lg-3  mb-5">
                  <button type="submit" ata-bs-toggle="modal" className="btn btn-lg  darkcustombtn mt-3 ">send offer</button>

                </div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                  aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">add post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form id="contact_form" className="form" action="login.html" encType="multipart/form-data" method="post">

                          <label>details</label>
                          <input type="text" className='form-control offertxt' />
                          <label>price</label>
                          <input type='text' className='form-control' />
                          <label>Delivery date</label>
                          <input type='text' className='form-control' />
                          <button type="submit" className="btn btn-lg  darkcustombtn mt-3 ">send offer</button>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </section>
          </div>
        </div>
      </div>
      </>
    ) : history.push("/login")}
    </>
  )
}
