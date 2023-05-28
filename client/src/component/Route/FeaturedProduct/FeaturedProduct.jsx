import React from 'react'
import styles from '../../../styles/style'

import ProductCart from '../ProductCart/ProductCart'
import { useSelector } from 'react-redux';

function FeaturedProduct() {
  const {allProducts} = useSelector((state) => state.products);
  return (
    <div>
       <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h2>Best Seal</h2>

        </div>
        <div className=" grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
        {
            allProducts && allProducts.length !== 0 &&(
              <>
               {allProducts && allProducts.map((i, index) => <ProductCart data={i} key={index} />)}
              </>
            )
           }
        </div>

       </div>
    </div>
  )
}

export default FeaturedProduct
