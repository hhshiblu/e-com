import React, { useEffect, useState } from "react";
import Footer from "../component/Layout/Footer.jsx";
import Header from "../component/Layout/Header.jsx";
import styles from "../styles/style.js";
import { useSearchParams } from "react-router-dom";

import ProductCart from "../component/Route/ProductCart/ProductCart.jsx";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CateProductCard from "../component/Route/ProductCart/CateProductCard.jsx";


// Define the SubmitHendel function outside the component

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);



  return (
    <div>
      {/* {
    isLoading ? (
      <Loader />
    ) : ( */}
      <Header activeHeading={3} />
      <br />

      <div className={`${styles.section}  `}>
        <h2 className="text-lg font-[600] py-1"> Just for You :</h2>
        <hr /> <hr />
        <div>
          <div className="pb-8 pt-6 grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
            {allProducts &&
              allProducts.map((i, index) => (
                <CateProductCard data={i} key={index} />
              ))}
          </div>
          <div>
            {allProducts && allProducts.length === 0 ? (
              <h1 className="text-center text-gray-600 pb-[100px] md:text-base text-sm">
                {" "}
                no products found!
              </h1>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
      {/* )
  } */}
    </div>
  );
}

export default ProductsPage;
