import React, { useEffect, useState } from "react";
import ProductDetails from "../component/ProductDetails/ProductDetails.jsx"
import {productData} from "../staticData/data.js"
import Footer from "../component/Layout/Footer.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestProduct from "../component/SuggestProduct.jsx"
// import SuggestedProduct from "../components/Products/SuggestedProduct";
// import { useSelector } from "react-redux";
 import Header from "../component/Layout/Header.jsx"
function ProductDetailsPage() {
  const  {name}  = useParams();
  const [data, setData] = useState(null);
  const  productName= name.replace(/-/g," ")
  // const { allProducts } = useSelector((state) => state.products);
  // const { allEvents } = useSelector((state) => state.events);
  
  // const [searchParams] = useSearchParams();
  // const eventData = searchParams.get("isEvent");
 
  useEffect(() => {
    // if (eventData !== null) {
    //   const data = allEvents && allEvents.find((i) => i._id === id);
    //   setData(data);
    // } else {
    //   const data = allProducts && allProducts.find((i) => i._id === id);
    //   setData(data);
    // }

    const data=productData.find((i)=>i.name===productName)
    setData(data)
  }, []);
  return (
    <div>
   <Header/>
    <ProductDetails   data={data}/>
      {/* {
        !eventData && (
          <>
          {data && <SuggestedProduct data={data} />}
          </>
        )
      } */}
          {
            data&& <SuggestProduct data={data}/>
          }
      
    <Footer />
  </div>
  )
}

export default ProductDetailsPage
