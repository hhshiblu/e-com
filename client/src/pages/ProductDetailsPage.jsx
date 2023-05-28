import React, { useEffect, useState } from "react";
import ProductDetails from "../component/ProductDetails/ProductDetails.jsx"
// import {productData} from "../staticData/data.js"
import Footer from "../component/Layout/Footer.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestProduct from "../component/SuggestProduct.jsx"
// import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";
 import Header from "../component/Layout/Header.jsx"
function ProductDetailsPage() {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
 

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div>
   <Header/>
   <ProductDetails data={data} />
        {
          !eventData && (
            <>
            {data && <SuggestProduct data={data} />}
            </>
          )
        }
      
    <Footer />
  </div>
  )
}

export default ProductDetailsPage
