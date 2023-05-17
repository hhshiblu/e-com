import React from 'react'
import styles from '../../styles/style'
import { AiFillStar,AiOutlineArrowRight } from "react-icons/ai";
function EventProduct() {
  return (
    <div className={`w-full block bg-white rounded-lg md:flex p-2 shadow-lg`}>
         <div className='w-full md:w-[50%] overflow-hidden'>
          <img src="https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg" alt=""  className=' w-[80%] m-auto md:w-[70%] md:mt-10 lg:w-[60%] lg:m-auto  transition duration-300  object-contain  transform hover:scale-110'/>
         </div>
         <div className='w-full p-3  md:w-[50%] flex flex-col justify-center  '>
            <h2 className={`${styles.productTitle} md:text-[25px]`}> Gaming Headphone Asus with mutiple color</h2>
            <p className='text-[15px] sm:text-[18px]  text-gray-500'>Lorem, ipsum dolor sit amet Lorem ipsum, dolor sit amet consectetur adipisicing elit. In consequuntur, omnis doloremque atque a distinctio pariatur nostrum! Blanditiis, impedit corrupti.lorem10 Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, quod! odio? Expedita, odio.</p>
<div className='flex py-3 justify-around '>
 <div className='flex items-center '>
    <h5 className='font-[600] text-[18px] mt-3 text-[#d55b45] pr-5 line-through  '> 2499$</h5>
    <h5 className='font-bold text-[22px] text-[#000000] pr-3  '> 1699$</h5>
 </div>
 <div className="flex items-center">
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <div className="ml-3 text-gray-500"></div>
          <span>(80)</span>
        </div>
</div>

<div className={ ` w-[40%]  px-[px]  rounded-[20px] bg-[#e49589] md:mt-4 text-center  cursor-pointer`}>
    <p className='text-[#FFF] text-[23px] font-bold block align-center m-auto '> Buy Now</p>
</div>
<div className='flex items-center justify-end cursor-pointer hover:text-[#d55b45] '>
    <p>show more events   </p>
    <AiOutlineArrowRight className='ml-4 mt-1'/>
</div>
         </div>
    </div>
  )
}

export default EventProduct
