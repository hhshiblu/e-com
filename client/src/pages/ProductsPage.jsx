import React, { useEffect, useState } from "react";

import Header from "../component/Layout/Header.jsx";
import styles from "../styles/style.js";
import { useSearchParams } from "react-router-dom";
import { productData } from "../staticData/data.js";
import ProductCart from "../component/Route/ProductCart/ProductCart.jsx";
import { useNavigate } from "react-router-dom";

// Define the SubmitHendel function outside the component

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
 

  useEffect(() => {

    if (categoryData === null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
        
      setData(d);
     
    } else {
      const d =
        productData && productData.filter((i) => i.category === categoryData);
      setData(d);
      
    }

    window.scrollTo(0, 0);
  }, [categoryData]);

  return (
    <div>
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
    </div>
  );
}

export default ProductsPage;
