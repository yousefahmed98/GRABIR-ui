import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../network/axiosInstance";
import {getRate} from "../../Store/Actions/getRate"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import Navbar from "../../components/navbar/navbar";
import "./PublicProfile.css"
export default function PublicProfile() {
    const params = useParams();   // return object for dynamic params  like /:id
    const [user, setUser] = useState({})
    const dispatch = useDispatch();
    const rates = useSelector((state) => state.RATE.rateList);
    const [userRates, setUserRates] = useState([])

    


    useEffect(()=>{
        dispatch(getRate());
     
        axiosInstance.get(`/base/users/${params.id}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }})
        .then((res) => 
        {
        setUser(res.data)
        // for(let rate of rates){
        //     if (rate.user == res.data.id)
        //     {
        //         setUserRates(prevState => [...prevState,rate]
        //           )
        //     }
        // }
        }        
        )
        .catch((err) => console.log(err))
        

    },[])

  return(
      <>
       <Navbar />
    <div className="ppprofileee container pt-5">
    <div className="row pt-5 coverr">
        <div className="col-lg-2 col-md-3 col-sm-3">
                      <img
                        src={user.ProfilePic}
                        className="mb-1 userImage border border-warning"
                        height="120"
                        alt="deal owner"
                        loading="lazy"
                      />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 pt-5">
        <h2 className="username text-capitalize">{ user.username}</h2>
        </div>

   </div>
   <section className=" rounded shadow-lg row pt-3  border border-warning px-3 " >
   <div className=" text-start">
          <span className="titles">  Full Name :</span> <span> {" "} {user.first_name}{" "}{user.last_name} </span>
   </div>
   <div className=" text-start mb-3">
          <span className="titles">  Email : </span> <span>{" "} {user.email}</span>
   </div>
   <hr className="titles"/>
   <p className="titles"> Reviews </p>
         <div>
         { rates.map((r, index) => (
            
                    ( r.user == user.id)
                    ?
                    <>
                    <div className="" key={index}>
          {r.stars === 1 ? (
            <>
            <h6 className="text-danger"> 1/5 <span className="text-danger">Very bad</span></h6>
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
              <FaStar className="star" color={"e4e5e9"} size={30} />
            </>
          ) : r.stars === 2 ? (
            <>
             <h6 className="text-danger"> 2/5 <span className="text-danger">Bad</span></h6>
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
            </>
          ): r.stars === 3 ?(
              <>
               <h6 className="text-primary"> 3/5 <span className="text-primary">Good</span></h6>
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#ffc107"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />
              <FaStar className="star" color={"#e4e5e9"} size={30} />

              </>
          ) : r.stars=== 4 ?(
            <>
             <h6 className="text-success"> 4/5 <span className="text-success">Very Good</span></h6>
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#e4e5e9"} size={30} />
            </>
          ): (
            <>
             <h6 className="text-success"> 5/5 <span className="text-success">Excellent</span></h6>
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
            <FaStar className="star" color={"#ffc107"} size={30} />
           
            </>
          )}
            <h5 className="text-secondary text-capitalize mt-3"> <span className="text-dark">Review:</span> {r.review}</h5>
            <hr />
        </div>
                    </>
                    :
                    <></>
  
                  ))
            }
         </div>
     
   </section>
     
        

    </div>
      </>
     
  )
      
  
}
