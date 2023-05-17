import React from 'react'
import styles from '../../../styles/style'
import { productData } from '../../../staticData/data'
import ProductCart from '../ProductCart/ProductCart'

function FeaturedProduct() {
  return (
    <div>
       <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h2>Best Seal</h2>

        </div>
        <div className=" grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
                {
                    productData && productData.map((i,index)=>{
                        return(
                            <ProductCart key={index } data={i}/>
                        
                        )
                    })
                }
        </div>

       </div>
    </div>
  )
}

export default FeaturedProduct
