import React ,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import QueryString from 'query-string'
export default function PaymentTest() {
    const location = useLocation();
    useEffect(() => {
        const values = QueryString.parse(location.search)
        console.log(values)
        const query = new URLSearchParams(window.location.search)
        if (values.success){
            console.log('order placed! You will recieve an email confirmation')
        }
        if (values.canceled){
            console.log( "order canceled" )
        }
    }, [])



  return (
    <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="http://127.0.0.1:8000/api/stripe/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
  )
}
