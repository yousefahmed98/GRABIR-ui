import React from "react"
import {useEffect , useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import Navbar from "../../components/navbar/navbar";
import OffersCard from "../../components/card/offerCard";
import { useHistory } from "react-router-dom";
import { getOffersAction } from '../../Store/Actions/getOffers'
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
}, [dispatch]);

///////////////////////////////////////////////////////////

const [MyOffers, setMyOffers] = useState([]);
const [CloseAlert, setCloseAlert] = useState(false);

const getmyOffersListFun = () => {
    let myOffersList = []
    let myPostsList =[]
  
      for( let p of posts){
          if(p.user == localStorage.getItem("id")){
              myPostsList.push(p.id)
          }
      }
     for (let o of offersArray ){
         if(myPostsList.includes(o.post) )
         {
             myOffersList.push(o)
             setMyOffers((prev)=>[...prev,o])
         }
     }
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
        
          <OffersCard offers={MyOffers} />
        </>
      ) : history.push("/login")}
    </div>
  );
}
