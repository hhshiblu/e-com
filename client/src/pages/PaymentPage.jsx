import React from 'react'
import Payment from "../component/payment/Payment.jsx"
import Header from '../component/Layout/Header.jsx'
import Footer from '../component/Layout/Footer.jsx'
import CheckoutSteps from '../component/Checkout/CheckoutSteps.jsx'
function PaymentPage() {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage
