import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import PostCard from '../../components/postCard/postCard'
import Navbar from '../../components/navbar/navbar'
import { Link } from 'react-router-dom'

export default function PostDetails() {
  const params = useParams();   // return object for dynamic params  like /:id
  const [details, setDetails] = useState({})  //to store returned data
  // const [owner, setOwner] = useState(false);

  console.log(params.id)

  useEffect(() => {
    return () => {
      axios.get(`http://127.0.0.1:8000/posts/${params.id}/`)
        .then((res) => setDetails(res.data))
        .catch((err) => { console.log(err) });
    };
  }, [])
  console.log("details", details)

  return (
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
                <Link href="#" className="ps-2 text-link"> <span>Rahma</span> </Link>
              </div>
              <div className="col-lg-9 col-sm-9 text-center text-lg-start mb-lg-3  mb-5">
                <form className=''>
                  <label>details</label>
                <input type="text" className='form-control offertxt' />
                <label>price</label>
                <input type='text' className='form-control'/>
                <label>Delivery date</label>
                <input type='text' className='form-control'/>
                <button type="submit" className="btn btn-lg  darkcustombtn mt-3 ">send offer</button>
                </form>
              </div>
             
            </div>
              
          </section>
          </div>
        </div>
      </div>
    </>
  )
}
/**
 * details = models.CharField(max_length=300)
    from_region= models.CharField(null=True,max_length=50)
    to_region   = models.CharField(null=True,max_length=50) 
    price = models.FloatField()
    delivery_date = models.DateField(auto_now_add=True,null=True)
    post = models.ForeignKey(Post,related_name="offer_post", on_delete=models.CASCADE)
    status = models.ForeignKey(OfferStatus,related_name="offer_status", on_delete=models.CASCADE)
    offer_owner
 */