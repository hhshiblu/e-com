import React, { useEffect, useState } from "react";
import styles from "../styles/style";

import ProductCart from "./Route/ProductCart/ProductCart";
import { useSelector } from "react-redux";

function SuggestProduct({ data }) {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, [allProducts]);
  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className=" grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]" onClick={() => window.location.reload()}>
            {productData &&
              productData.map((i, index) => (
                <ProductCart data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SuggestProduct;
