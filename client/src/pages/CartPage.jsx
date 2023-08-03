import React, { useEffect, useState } from "react";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import styles from "../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { backend_URL } from "../serverUrl";
import { Link } from "react-router-dom";
import { addTocart, removeFromCart } from "../Redux/Action/cart";
import { toast } from "react-toastify";
import CheckoutPage from "./cheakOut/CheckoutPage.jsx";
function ProductCart() {
  const [subtotalPrices, setSubtotalPrices] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
    console.log(data);
  };
  <CheckoutPage user={totalPrice} />;

  // const cartItems = allProducts && [allProducts.find((i) => i.id === cart.id)];

  // const subtotalPrices = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice
  // );
  //  Calculate subtotal whenever cart changes

  useEffect(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
    setSubtotalPrices(subtotal);
  }, [cart]);

  return (
    <div>
      <Header />
      <div className="h-full md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px) m-auto mb-4] max-w-[1200px]  my-5 mb-8">
      {cart&&cart.length===0?(
  <div className="flex items-center justify-center !h-[60vh] ">
     Cart items is emty!!
  </div>
): (
          <div className="pt-5">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-full p-5 bg-white rounded shadow lg:w-8/12">
                <div>
                  <div className="flex gap-3 p-2 bg-gray-100 rounded">
                    <div className="overflow-hidden border rounded">
        
                    </div>
                    <p className="font-medium m-auto">
                          all cart products
                    </p>
                  </div>
                  <ul className="flex flex-col gap-6 mt-4">
                    {cart &&
                      cart.map((i, index) => {
                        return (
                          <CartSingle
                            key={index}
                            data={i}
                            quantityChangeHandler={quantityChangeHandler}
                            removeFromCartHandler={removeFromCartHandler}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-4/12">
                <div className="relative flex flex-col gap-4 p-4 bg-white rounded shadow">
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
                    <p className="mb-2">Total Price </p>
                  </div>
                  <div className="flex justify-between">
                    <p>total</p>
                    <strong>৳ {totalPrice}</strong>
                  </div>
                
            
                  <hr />

                  <button
                    className="btn type-primary size-lg  opacity-50 w-full  bg-[#e44343] border-[#e4434373] py-1 rounded-md text-white font-semibold "
                    disabled=""
                  >
                    <Link to="/checkout">
                      <span data-content="center">Confirm Order</span>
                    </Link>
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
const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };
  return (
    <li className="flex gap-3">
      <div>
        <div>
          <img
            alt={`${data.name}`}
            loading="lazy"
            width="80"
            height="80"
            decoding="async"
            data-nimg="1"
            className="mx-auto text-transparent  transition-opacity duration-300 ease-in-out opacity-100  undefined "
            src={`${backend_URL}upload/${data?.images[0]}`}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col justify-between flex-1">
          <p className="text-base line-clamp-1">{data.name}</p>
          <div className="inline-flex ">
            <div
              className={`bg-[#e44343] border-[#e4434373] mt-2  rounded-full w-[25px] h-[25px] ${styles.normalFlex}  justify-center cursor-pointer `}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="inline-flex  justify-center w-8 p-2 px-5">
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
        <div className="inline-flex flex-col items-end">
          <p className="text-lg">
            ৳ <span> </span>
            {totalPrice}
          </p>
          <button
            className="mt-2 font-medium text-gray-500 underline"
            onClick={() => removeFromCartHandler(data)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
export default ProductCart;
