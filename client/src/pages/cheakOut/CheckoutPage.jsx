import React from 'react'

import CheckoutSteps from "../../component/Checkout/CheckoutSteps.jsx";
import Checkout from "../../component/Checkout/Checkout.jsx";
import Header from '../../component/Layout/Header.jsx';
import Footer from '../../component/Layout/Footer.jsx';


const CheckoutPage = () => {
 
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout  />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage