import React from 'react'
import { useEffect } from 'react'
import PostCard from '../../components/postCard/postCard'
import Navbar from '../../components/navbar/navbar'
import Loader from '../../components/loader/loader'
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from '../../Store/Actions/getPosts'
import { Link } from 'react-router-dom'

export default function Home() {
    const posts = useSelector((state) => state.POSTS.postsList)
    const isloading = useSelector((state) => state.LOADER.isloading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-10 mb-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 col-span-1">
                        {/* add post */}
                        <div className="pt-5">
                        <section className="border rounded shadow-1-strong p-5 postcard  mt-5 " >
                            {/* profile + date  */}
                            <div className="row align-items-center mb-4">
                                <div className="col-lg-3 col-sm-3 text-center text-lg-start mb-lg-3 ">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg" className="rounded-5 shadow-1-strong me-2"
                                        height="80" alt="" loading="lazy" />
                                    <Link href="#" className="ps-2 text-link"> <span>Rahma</span> </Link>
                                </div>
                                <div className="col-lg-9 col-sm-9 text-center text-lg-start mb-lg-3  mb-5">
                               <button type="submit" className="btn btn-lg  darkcustombtn  ms-5">Add new post</button> 
                                </div>

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
                                    <PostCard key={index} post={post} />
                                ))
                            )
                        }
                    </div>

                </div>

            </div>
        </>

    )
}
