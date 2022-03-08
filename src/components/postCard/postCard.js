import { Link } from 'react-router-dom'
import "./postCard.css"
import {useHistory} from "react-router-dom"
import {useState} from 'react';
import Popup from '../popup/popup'


export default function PostCard({ post }) {
  const [style, setStyle] = useState("darkcustombtn");
  const history=useHistory();  //hook for props.history
  const postDetails =(e,post_id) =>{
    e.preventDefault()
    console.log(post_id)
    setStyle('darkcustombtnActive')
    history.push(`/PostDetails/${post_id}`)
  }
  return (
    // <div className="container postcard pt-5">
    //    <div className="row pt-5 align-items-center">
    //    {/* Grid column */}
    //    <div className="col-md-12 mb-4">
        <div className="pt-5">
        {/* post section  start*/}
        <section className="border rounded shadow-1-strong p-5 postcard mt-5 mb-5" >
          {/* profile + date  */}
            <div className="row align-items-center mb-4">
              <div className="col-lg-6 col-sm-6 text-center text-lg-start mb-lg-3 ">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg" className="rounded-5 shadow-1-strong me-2"
                  height="80" alt="" loading="lazy" />
                <Link href="#" className="ps-2 text-link"> <span>Rahma</span> </Link>
              </div>
              <span className='pt-2'> Published on<u>15.07.2020</u></span>
            </div>
              {/* profile + date end  */}
              {/* post content start */}
            <div className="row align-items-center mb-4">
            <div class="col-md-6 inline">
              <h1>{post.title}</h1>
              <p>
                {post.description}
              </p>
              <p>want it from : {post.from_region}</p>
              <p>Delivery will be in: {post.to}</p>
              <p>Price maximun limit: {post.price} $</p>
            </div>
            <img src={post.postpicture} className="col-md-6 img-fluid shadow-2-strong rounded-5 mb-4" 
            alt="post image" width= '60%' length = '180px' />
            </div>
             {/* post content end */}
             <div className="row align-items-center mb-4">
              <div className="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
              {/* <button type="button" className={`btn px-3 me-1 ${style}`} onClick={(e) => {postDetails(e,post.id)}}>
                 show details </button> */}
                  <Popup postID={post.id} post={post}/>

              </div>


              <div className="col-lg-6 text-center text-lg-end pe-5">
                <button type="button" className="btn px-3 me-1 darkcustombtn">
                 add to favourite
                </button>
              
              </div>
            </div>
          </section>
          
          </div>
    
         

  )

}
        
//src="https://mdbootstrap.com/img/Photos/Slides/img%20(144).jpg"
  // <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">

  //   <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
  //     {/* <Link href='#'>{post.title}</Link> */}
  //     {post.title}
  //   </h1>
  //   <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
  //     <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
  //       <img
  //         unoptimized
  //         alt={post.title}
  //         className="align-middle rounded-full"
  //         src={post.postpicture}
  //         width= '318px'
  //         length = '180px'
  //       />
  //       <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">post.author.name</p>
  //     </div>
  //     <div className="font-medium text-gray-700">
  //       {/* <svg xmlns="http://www.w3.org/2000/svg" className="inline " fill="none"  stroke="currentColor">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  //       </svg> */}
  //       {/* <span>{moment(post.created_at).format('MMM DD, YYYY')}</span> */}
  //     </div>
  //   </div>
  //   <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
  //     {/* {post.description} */}
  //   </p>
  //   <div className="text-center">
  //     <Link to='#'>
  //       <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-black px-8 py-3 cursor-pointer">Continue Reading</span>
  //     </Link>
  //   </div>
  // </div>


