import React, { useEffect, useState } from "react";
import Footer from "../component/Layout/Footer.jsx";
import Header from "../component/Layout/Header.jsx";
import styles from "../styles/style.js";
import { useLocation, useSearchParams } from "react-router-dom";

import ProductCart from "../component/Route/ProductCart/ProductCart.jsx";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CateProductCard from "../component/Route/ProductCart/CateProductCard.jsx";

import Filters from "../component/Route/Cetagories/Filters.jsx";



function CateProductsPage() {
    const location = useLocation();
  const [searchParams] = useSearchParams();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const categoryData = searchParams.get("search_query");
console.log(categoryData);
  const [data, setData] = useState([]);
  
 useEffect(() => {
   if (categoryData && allProducts) {
     const filteredProducts = allProducts.filter((product) =>
       product.name.toLowerCase().includes(categoryData.toLowerCase())
     );
     setData(filteredProducts);
   } else {
     setData(allProducts);
   }
 }, [categoryData, allProducts]);

  return (
    <div>
      {/* {
    isLoading ? (
      <Loader />
    ) : ( */}
      <Header  />
      <br />
      <br />

      <div className={`${styles.section} 800px:w-full `}>
        <h2 className="text-lg font-[600] py-1"> Category Name :</h2>
        <hr /> <hr />
        <div className="800px:flex  py-6">
          <div className="hidden 800px:flex  w-[350px] pt-3   justify-center   items-center bg-white px-2 mx-4">
            <Filters />
          </div>
          <div>
            <h2 className="text-lg font-semibold pb-2">Results :</h2>
            <div className="pb-8 grid grid-cols-2 gap-[15px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[15px] xl:grid-cols-4 xl:gap-[15px]">
              {data &&
                data.map((i, index) => (
                  <CateProductCard data={i} key={index} />
                ))}
            </div>
            <div>
              {data && data.length === 0 ? (
                <h1 className="text-center text-gray-600 pb-[100px] md:text-base text-sm">
                  {" "}
                  no products found!
                </h1>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* )
  } */}
    </div>
  );
}

export default CateProductsPage;
