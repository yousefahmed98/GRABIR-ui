import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from "../../components/navbar/navbar";
import "./paypal.css"
export default function PayPal() {
    const history = useHistory();
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: 600.00,
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    history.push("/")
                    alert('Thanks for paying dear' + details.payer.name.given_name)
                });
            }
        }).render('#paypal-button')
    }, [])
    return (
        <>
            <Navbar />
            <div className='text-center ' style={{ padding: 150 }}>
                <h1 className='text-dark p-4 title'>Click here to pay</h1>
                <div id="paypal-button"></div>
            </div>
        </>


    )
}
