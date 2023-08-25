import React from "react";
import Header from "../component/Layout/Header.jsx";
import HomeHero from "../component/Route/HomeHero/HomeHero.jsx";
import Cetagories from "../component/Route/Cetagories/Cetagoris.jsx";
import BestDeals from "../component/Route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../component/Route/FeaturedProduct/FeaturedProduct.jsx";
// import Events from "../component/Event/Events.jsx";
// import Sponsored from "../component/Route/Sponsored/Sponsored.jsx"
import Footer from "../component/Layout/Footer.jsx";
// import Subscribe from "../component/Layout/Subscribe.jsx";
// import Feature from "../component/Route/Feature/Feature.jsx";
import CateUnderP from "../component/Route/cateUnderAmount/CateUnderP.jsx";

import BestElectronics from "../component/Route/BestElectroncis/BestElectronics.jsx";
function HomePage() {



  return (
    <div>
      <Header activeHeading={1} />
      <HomeHero />
      {/* <Feature /> */}
      <BestDeals />
      <br />
      <br />

      <Cetagories />
      <BestElectronics />
      <br />
      <br />
      
      <CateUnderP />
      {/* <Events /> */}
      <FeaturedProduct />
      <br />
      <br />
      <br />
      {/* <Subscribe/> */}
      <Footer />
    </div>
  );
}

export default HomePage;
