import React, { useEffect, useState } from "react";

import Header from "../component/Layout/Header.jsx";
import styles from "../styles/style.js";

import { productData } from "../staticData/data.js";
import ProductCart from "../component/Route/ProductCart/ProductCart.jsx";

function ProductsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);

    setData(d);

    window.scrollTo(0, 0);
  }, [productData]);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
          {data && data.map((i, index) => <ProductCart data={i} key={index} />)}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ProductsPage;
