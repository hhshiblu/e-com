import React from "react";

// import Lottie from "react-lottie";
// import animationData from "../Assests/animations/107043-success.json";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {

  return (
    <div>
      {/* <Lottie options={defaultOptions} width={300} height={300} /> */}
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
