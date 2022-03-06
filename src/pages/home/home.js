import React from 'react'
import { useEffect } from 'react'
import PostCard from '../../components/postCard/postCard'
import Navbar from '../../components/navbar/navbar'
import Loader from '../../components/loader/loader'
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from '../../Store/Actions/getPosts'

export default function Home() {
    const posts = useSelector((state) => state.POSTS.postsList)
    const isloading = useSelector((state) => state.LOADER.isloading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, []);

    return (
        <>
            {/* <Navbar /> */}
            <div className="container mx-auto px-10 mb-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 col-span-1">
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
