import React, { useEffect, useState } from "react";

import styles from "../../../styles/style";
import ProductCart from "../ProductCart/ProductCart.jsx"
import { useSelector } from "react-redux";

function BestDeals() {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  

  return (
    <div>
      <div className={`${styles.section}  my-3`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
       <div className=" grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
       {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCart data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
