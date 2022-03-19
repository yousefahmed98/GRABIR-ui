import React from "react"
import {useEffect , useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import Navbar from "../../components/navbar/navbar";
import OffersCard from "../../components/card/offerCard";
// import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useHistory } from "react-router-dom";
import { getOffersAction } from '../../Store/Actions/getOffers'
import { Button } from "@mui/material";
import { getPosts } from '../../Store/Actions/getPosts'
import SweetAlert from 'react-bootstrap-sweetalert';

export default function Offers(props) {
  const history = useHistory();
  //get all offers
  const offersArray = useSelector((state) => state.OFFERS.offers); //[]
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.POSTS.postsList)
  useEffect(() => {
    dispatch(getOffersAction())
    dispatch(getPosts())
    console.log("oferrrs", offersArray);
  
}, []);

///////////////////////////////////////////////////////////

const [MyOffers, setMyOffers] = useState([]);
const [CloseAlert, setCloseAlert] = useState(false);

const getmyOffersListFun = () => {
    let myOffersList = []
    let myPostsList =[]
    console.log("AllPosts" , posts)
    console.log("AllOffers" , offersArray)
  
      for( let p of posts){
        console.log("p" , p)
        console.log("localStorage.getItem(" , localStorage.getItem("id"))
          if(p.user == localStorage.getItem("id")){
              myPostsList.push(p.id)
          }
      }
      console.log("myPostsList" , myPostsList)
     for (let o of offersArray ){
         console.log("o" , o)
         if(myPostsList.includes(o.post) )
         {
             console.log("****************************", o)
             myOffersList.push(o)
             setMyOffers((prev)=>[...prev,o])
         }
     }
    console.log("myOffersList",myOffersList)
         setMyOffers(myOffersList)
        setCloseAlert(true)
    
}
///////////////////////////////////////////////////////////

  return (
    <div className="offers">
      {localStorage.getItem("email") ? (
        <>
          <Navbar />
          {!CloseAlert &&
             <SweetAlert title="Do you want to show all your offers to your posts" onConfirm={()=>{ getmyOffersListFun()}}  />
            
            }
        
          {/* <Button className="mt-5 p-t-5" onClick={ ()=>getmyOffersListFun()}>hellllllllllllo</Button> */}
          <OffersCard offers={MyOffers} />
        </>
      ) : history.push("/login")}
    </div>
  );
}
