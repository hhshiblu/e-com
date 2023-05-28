import React, { useEffect, useState } from "react";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import styles from "../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { backend_URL } from "../serverUrl";
// import { addTocart, removeFromCart } from "../Redux/Action/cart";
import { toast } from "react-toastify";

function ProductCart() {
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const cartItems = allProducts && [allProducts.find((i) => i.id === cart.id)];

  const removeCartHandler = (data) => {
    // dispatch(removeFromCart(data));
  };

  // const subtotalPrices = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice
  // );
    // Calculate subtotal whenever cart changes
    const [subtotalPrices, setSubtotalPrices] = useState(0);
    useEffect(() => {
      const subtotal = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
      );
      setSubtotalPrices(subtotal);
    }, [cart]);

  const quantityChanger = (data) => {
    // dispatch(addTocart(data));
  };


  return (
    <div>
      <Header />
      <div className="h-full md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px) m-auto mb-4] max-w-[1200px]  my-5 mb-8">

{cart&&cart.length===0?(
  <div className="flex items-center justify-center !h-[60vh] ">
     Cart items is emty!!
  </div>
):(
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
                  {cartItems &&
                    cartItems.map((i, index) => {
                      return (
                        <CartSingle
                          key={index}
                          data={i}
                          removeCartHandler={removeCartHandler}
                          quantityChanger={quantityChanger}
                        />
                      );
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
                  <strong>৳ {subtotalPrices}</strong>
                </div>
                <div class="flex justify-between">
                  <p>Shipping</p>
                  <strong>৳ 1290</strong>
                </div>
                <div class="flex justify-between">
                  <p>discount</p>
                  <strong>
                    <span className="pr-1">-</span> ৳ 234
                  </strong>
                </div>
                <hr />
                <div class="flex justify-between mt-[-10px]">
                  <p>Total</p>
                  <strong>৳ 43138</strong>
                </div>

                <br />
                <div>
                  <input
                    type="text"
                    placeholder="Copon Code"
                    className="appearance-none  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                  />
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
)}
        
      </div>
      <Footer />
    </div>
  );
}
const CartSingle = ({ data, removeCartHandler, quantityChanger }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited");
    } else {
      setValue(value + 1);
      const UpdateCartData = { ...data, qty: value + 1 };
      quantityChanger(UpdateCartData);
    }
  };
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const UpdateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChanger(UpdateCartData);
  };
  return (
    <li class="flex gap-3">
      <div>
        <div>
          <img
            alt={`${data.name}`}
            loading="lazy"
            width="80"
            height="80"
            decoding="async"
            data-nimg="1"
            class="mx-auto text-transparent  transition-opacity duration-300 ease-in-out 
opacity-100  undefined "
            src={`${backend_URL}upload/${data?.images[0]}`}
          />
        </div>
      </div>
      <div class="flex flex-1">
        <div class="flex flex-col justify-between flex-1">
          <p class="text-base line-clamp-1">{data.name}</p>
          <div class="inline-flex ">
            <div
              className={`bg-[#e44343] border-[#e4434373] mt-2  rounded-full w-[25px] h-[25px] ${styles.normalFlex}  justify-center cursor-pointer `}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span class="inline-flex  justify-center w-8 p-2 px-5">
              {data.qty}
            </span>
            <div
              className="bg-[#a7abb14f]  rounded-full w-[25px] mt-2  h-[25px] flex items-center  justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879d" />
            </div>
          </div>
        </div>
        <div class="inline-flex flex-col items-end">
          <p class="text-lg">
            ৳ <span> </span>
            {totalPrice}
          </p>
          <button
            class="mt-2 font-medium text-gray-500 underline"
            onClick={() => removeCartHandler(data)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCart;
