import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
// import {IoBagHandleOutLine}  from "react-icons/io5"
import { IoBagHandleOutline } from "react-icons/io5";
import {BsCartPlus} from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai";
// import CartSingle from "./CartSingle.jsx"


function WishProduct({ setOpenWishCart }) {
  const cartData = [
    {
      name: "Iphone 13 pro max 256 gb ssd 8gb ram",
      description: "test",
      price: 654,
    },
    {
      name: "Iphone 13 pro max 256 gb ssd 8gb ram",
      description: "test",
      price: 654,
    },
    {
      name: "Iphone 13 pro max 256 gb ssd 8gb ram",
      description: "test",
      price: 654,
    },
  ];

  return (
    <div className="fixed  top-0 left-0 w-full bg-[#0000004b] h-screen text-black z-50">
      <div className=" fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shawdow-md">
        <div>
          <div className=" flex  w-full justify-start pt-5 pl-5">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenWishCart(false)}
            />
          </div>

          {/* items.length */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className=" pl-2 text-[20px] font-[500]"> 3 items</h5>
          </div>
          {/* ------------------------cart data */}

          <br />
          <div className="w-full border-t">
            {
                cartData&& cartData.map((i,index)=>{
                    return(
                         <CartSingle key={index} data={i}/>
                    )
                })
            }

          </div>
        </div>

      </div>
    </div>
   
  );
}

 const CartSingle=({data})=>{
    const [value,setValue]=useState(1);

    const totalPrice=data.price*value
    return(
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <RxCross1 className="cursor-pointer" size={25}/>
                <img src="https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png" alt="" className="w-[50px] h-[50px] ml-2 " />
              
               <div className="ol-5px">
                <h1>{data.name.slice(0,35)}.. </h1>
                <h4 className=" pl-4 font-[600] text-[17px] pt-[3x]  font-Roboto text-[#da1919]   ">{data.price} </h4>
            
               </div>
               <div>
                <BsCartPlus size={20 } className="cursor-pointer " />
               </div>
            </div>
        

        </div>
    )
 }

export default WishProduct;