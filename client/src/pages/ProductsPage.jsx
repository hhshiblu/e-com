import React, { useEffect, useState } from "react";
import Footer from "../component/Layout/Footer.jsx"
import Header from "../component/Layout/Header.jsx";
import styles from "../styles/style.js";
import { useSearchParams } from "react-router-dom";

import ProductCart from "../component/Route/ProductCart/ProductCart.jsx";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Define the SubmitHendel function outside the component

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
 

  useEffect(() => {

    if (categoryData === null) {
      const d = allProducts;
      setData(d);
     
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
      
    }

    window.scrollTo(0, 0);
  }, [allProducts]);

  return (
    <div>
       {/* {
    isLoading ? (
      <Loader />
    ) : ( */}
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
          {data && data.map((i, index) => <ProductCart data={i} key={index} />)}
        </div>
        <div>
          {data&& data.length===0?(
            <h1 className="text-center text-gray-600 pb-[100px] md:text-base text-sm"> no products found!</h1>
          ):null}
        </div>
      </div>
      <Footer/>
      {/* )
  } */}
    </div>
  );
}

export default ProductsPage;
