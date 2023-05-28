import React, { useEffect, useState } from "react";

import Header from "../component/Layout/Header.jsx";
import styles from "../styles/style.js";


import ProductCart from "../component/Route/ProductCart/ProductCart.jsx";
import { useSelector } from "react-redux";
import Footer from "../component/Layout/Footer.jsx";

function ProductsPage() {
  const [data, setData] = useState([]);
  const {allProducts,isLoading} = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    setData(sortedData);
  }, [allProducts]);

  return (
    <div>
       {/* {
    isLoading ? (
      <Loader />
    ) : ( */}
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
          {data && data.map((i, index) => <ProductCart data={i} key={index} />)}
        </div>
        <div></div>
      </div>
      <Footer/>
      {/* )
   } */}
    </div>
  );
}

export default ProductsPage;
