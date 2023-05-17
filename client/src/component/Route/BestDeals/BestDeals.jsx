import React, { useEffect, useState } from "react";
import { productData } from "../../../staticData/data";
import styles from "../../../styles/style";
import ProductCart from "../ProductCart/ProductCart.jsx"

function BestDeals() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstSix = d.slice(0, 6);
    setData(firstSix);
  },[]);

  return (
    <div>
      <div className={`${styles.section}  my-3`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
       <div className=" grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
                {
                    data && data.map((i,index)=>{
                        return(
                            <ProductCart key={index } data={i}/>
                        
                        )
                    })
                }
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
