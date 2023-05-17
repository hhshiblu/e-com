import React from 'react'
import styles from '../../styles/style'
import EventProduct from "./EventProduct.jsx"
import CountDown from "./CountDown.jsx"

function Events() {
  return (
    <div>
      <div className={`${styles.section} my-3`}>
        <div className={`${styles.heading} flex justify-around sm:justify-start  p-3  items-center  `}>
          <div>
          <h2>Popular Seal</h2>
            </div>  
               <div className=''>
                <CountDown/>
               </div>
        </div>
        <div className="w-full grid">
            <EventProduct/>
        </div>
      

       </div>
    </div>
  )
}

export default Events
