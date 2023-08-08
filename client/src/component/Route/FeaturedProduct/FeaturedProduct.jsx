// import React from 'react'
// import styles from '../../../styles/style'

// import ProductCart from '../ProductCart/ProductCart'
// import { useSelector } from 'react-redux';

// function FeaturedProduct() {
//   const {allProducts} = useSelector((state) => state.products);
//   return (
//     <div>
//        <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//             <h2>For you !</h2>

//         </div>
//         <div className=" grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
//         {
//             allProducts && allProducts.length !== 0 &&(
//               <>
//                {allProducts && allProducts.map((i, index) => <ProductCart data={i} key={index} />)}
//               </>
//             )
//            }
//         </div>

//        </div>
//     </div>
//   )
// }
// export default FeaturedProduct;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../styles/style";
import ProductCart from "../ProductCart/ProductCart";
import { useSelector, useDispatch } from "react-redux";

function FeaturedProduct() {
  // Usage in the component
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  // Function to fetch more products

  const getCardData = async () => {
    const {data} = await axios.get(
      `http://localhost:5000/api/v1/product/get-all-products?page=${page}`
    );
console.log(data);
    
   
    // setProducts((pre)=> [...pre, ...data]);

    setLoading(false);
  };

  useEffect(() => {

    getCardData();
  }, [page]);
  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollHeight + 1 >=
        document.documentElement.scrollTop
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h2>For you !</h2>
        </div>
        <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
          {products && products?.length !== 0 && (
            <>
              {products?.map((product, index) => (
                <ProductCart data={product} key={index} />
              ))}
            </>
          )}
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default FeaturedProduct;
