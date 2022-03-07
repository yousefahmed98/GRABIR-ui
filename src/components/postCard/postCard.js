import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'react-moment';

const PostCard = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">

    <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
      {/* <Link href='#'>{post.title}</Link> */}
      {post.title}
    </h1>
    <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
      <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
        <img
          unoptimized
          alt={post.title}
          className="align-middle rounded-full"
          src={post.postpicture}
          width= '318px'
          length = '180px'
        />
        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">post.author.name</p>
      </div>
      <div className="font-medium text-gray-700">
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="inline " fill="none"  stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg> */}
        {/* <span>{moment(post.created_at).format('MMM DD, YYYY')}</span> */}
      </div>
    </div>
    <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
      {/* {post.description} */}
    </p>
    <div className="text-center">
      <Link href='#'>
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-black px-8 py-3 cursor-pointer">Continue Reading</span>
      </Link>
    </div>
  </div>
);

export default PostCard;
