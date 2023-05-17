import React, { useState } from "react";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import styles from "../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
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

function ProductCart() {
  const [value, setValue] = useState(1);
  // const[totalPrice]=useState(121)
  // const totalPrice=data.price*value;
  return (
    <div>
      <Header />
      <div className="h-full md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px) m-auto mb-4] max-w-[1200px]  my-5 mb-8">
        <div class="pt-5">
          <div class="flex flex-col gap-8 lg:flex-row">
            <div class="w-full p-5 bg-white rounded shadow lg:w-8/12">
              <div>
                <div class="flex gap-3 p-2 bg-gray-100 rounded">
                  <div class="overflow-hidden border rounded">
                    <div>
                      <img
                        alt="product"
                        loading="lazy"
                        width="50"
                        height="50"
                        decoding="async"
                        data-nimg="1"
                        class="mx-auto opacity-0 transition-opacity duration-300 ease-in-out 
                     undefined "
                        src="https://media.e-valy.com/cms/brands/logo/7bd5cdf9-b7b7-4c07-a5f1-501ce9fd1b7c?h=350&amp;w=350"
                      />
                    </div>
                  </div>
                  <p class="font-medium">Executive Machines Limited For PNP</p>
                </div>
                <ul class="flex flex-col gap-6 mt-4">
                  {cartData &&
                    cartData.map((i, index) => {
                      return <CartSingle key={index} data={i} />;
                    })}
                </ul>
              </div>
            </div>
            <div class="w-full lg:w-4/12">
              <div class="relative flex flex-col gap-4 p-4 bg-white rounded shadow">
                <div class="flex flex-col items-center justify-center p-4 bg-gray-100">
                  <p class="mb-2">Please add your address before order</p>
                 
                </div>
                <div class="flex justify-between">
                  <p>Subtotal</p>
                  <strong>৳ 43138</strong>
                </div>
                <div class="flex justify-between">
                  <p>Shipping</p>
                  <strong>৳ 1290</strong>
                </div>
                <div class="flex justify-between">
                  <p>discount</p>
                  <strong><span className="pr-1">-</span> ৳ 234</strong>
                </div>
                <hr />
                <div class="flex justify-between mt-[-10px]">
                  <p>Total</p>
                  <strong>৳ 43138</strong>
                </div>

                <br />
                <div >
                    <input type="text" placeholder="Copon Code" className="appearance-none  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"/>
                </div>
                <br />
                <button
                  class="btn type-primary size-lg  opacity-50 w-full  bg-[#e44343] border-[#e4434373] py-1 rounded-md text-white font-semibold "
                  disabled=""
                >
                  <span data-content="center">Confirm Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const CartSingle=({data})=>{
    const [value,setValue]=useState(1);

    const totalPrice=data.price*value
    return(
        <li class="flex gap-3">
        <div>
          <div>
            <img
              alt="Apple iPad (9th Gen) 3GB RAM - 64GB ROM - 12MP Camera - Wi-Fi - 10.2 Inch Display - Space Gray"
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              data-nimg="1"
              class="mx-auto text-transparent  transition-opacity duration-300 ease-in-out 
opacity-100  undefined "
              src="https://media.e-valy.com/cms/products/images/dd7a9ea4-8630-4d0a-86c5-68c1f4353026?h=350&amp;w=350"
            />
          </div>
        </div>
        <div class="flex flex-1">
          <div class="flex flex-col justify-between flex-1">
            <p class="text-base line-clamp-1">
              {data.name}
            </p>
            <div class="inline-flex ">
              <div
                className={`bg-[#e44343] border-[#e4434373] mt-2  rounded-full w-[25px] h-[25px] ${styles.normalFlex}  justify-center cursor-pointer `}
                onClick={() => setValue(value + 1)}
              >
                <HiPlus size={18} color="#fff" />
              </div>
              <span class="inline-flex  justify-center w-8 p-2 px-5">
                {value}
              </span>
              <div
                className="bg-[#a7abb14f]  rounded-full w-[25px] mt-2  h-[25px] flex items-center  justify-center cursor-pointer"
                onClick={() =>
                  setValue(value === 1 ? 1 : value - 1)
                }
              >
                <HiOutlineMinus size={16} color="#7d879d" />
              </div>
            </div>
          </div>
          <div class="inline-flex flex-col items-end">
            <p class="text-lg">৳ <span>-</span>{totalPrice}</p>
            <button class="mt-2 font-medium text-gray-500 underline">
              Remove
            </button>
          </div>
        </div>
      </li>
    )
 }

export default ProductCart;
