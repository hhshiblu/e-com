import React, { useEffect, useState } from "react";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import styles from "../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { backend_URL } from "../serverUrl";
import { Link, useNavigate } from "react-router-dom";
import { delete_card_product, get_card_products, quantity_dec, quantity_inc } from "../Redux/Action/cart";
import { toast } from "react-toastify";
import CheckoutPage from "./cheakOut/CheckoutPage.jsx";
function ProductCart() {
  const navigate = useNavigate();
  const [subtotalPrices, setSubtotalPrices] = useState(0);
  const {
    card_products,
    successMessage,
    price,
    buy_product_item,
    shipping_fee,
    outofstock_products,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    // dispatch(removeFromCart(data));
  };
      const redirect = () => {
        navigate("/shipping", {
          state: {
            products: card_products,
            price: price,
            shipping_fee: shipping_fee,
            items: buy_product_item,
          },
        });
      };

  const totalPrice = card_products.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    // dispatch(addTocart(data));
    console.log(data);
  };
  <CheckoutPage user={totalPrice} />;

  // const cartItems = allProducts && [allProducts.find((i) => i.id === cart.id)];

  // const subtotalPrices = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice
  // );
  //  Calculate subtotal whenever cart changes

  console.log(card_products);

  useEffect(() => {
    dispatch(get_card_products(user?._id));
  }, [user?._id, dispatch]);
  useEffect(() => {
    const subtotal = card_products.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
    setSubtotalPrices(subtotal);
  }, [card_products]);


      const inc = (quantity, stock, card_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
          dispatch(quantity_inc(card_id));
        }
      };

      const dec = (quantity, card_id) => {
        const temp = quantity - 1;
        if (temp !== 0) {
          dispatch(quantity_dec(card_id));
        }
      };
  return (
    <div>
      <Header />
      {/* <div className="h-full md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px) m-auto mb-4] max-w-[1200px]  my-5 mb-8">
        {card_products && card_products.length === 0 ? (
          <div className="flex items-center justify-center !h-[60vh] ">
            Cart items is emty!!
          </div>
        ) : (
          <div className="pt-5">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-full p-5 bg-white rounded shadow lg:w-8/12">
                <div>
                  <div className="flex gap-3 p-2 bg-gray-100 rounded">
                    <div className="overflow-hidden border rounded"></div>
                    <p className="font-medium m-auto">all cart products</p>
                  </div>
                  <ul className="flex flex-col gap-6 mt-4">
                    {card_products &&
                      card_products.map((i, index) => {
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
      </div> */}
      <section className='bg-[url("http://localhost:3000/images/banner/card.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  {/* <MdOutlineKeyboardArrowRight /> */}
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {card_products.length}
                      </h2>
                    </div>
                    {card_products?.map((p, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600">
                            {p.productDetails?.name}
                          </h2>
                        </div>
                        {/* {p.products.map((pt, i) => ( */}
                        <div className="w-full flex flex-wrap">
                          <div className="flex sm:w-full gap-2 w-7/12">
                            <div className="flex gap-2 justify-start items-center">
                              <img src="" alt="" />
                              <div className="pr-4 text-slate-600">
                                <h2 className="text-md">
                                  {p.productDetails.name}
                                </h2>
                                <span className="text-sm">
                                  Brand : {p.productDetails.brand}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                            <div className="pl-4 sm:pl-0">
                              <h2 className="text-lg text-orange-500">
                                {/* $
                                {pt.productInfo.price -
                                  Math.floor(
                                    (pt.productInfo.price *
                                      pt.productInfo.discount) /
                                      100
                                  )}{" "} */}
                              </h2>
                              <p className="line-through">
                                {/* {pt.productInfo.price} */}
                              </p>
                              {/* <p>-{pt.productInfo.discount}%</p> */}
                            </div>
                            <div className="flex gap-2 flex-col">
                              <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                <div
                                  // onClick={() => dec(pt.quantity, pt._id)}
                                  className="px-3 cursor-pointer"
                                >
                                  -
                                </div>
                                {/* <div className="px-3">{pt.quantity}</div> */}
                                <div
                                  // onClick={() =>
                                  //   inc(
                                  //     pt.quantity,
                                  //     pt.productInfo.stock,
                                  //     pt._id
                                  //   )
                                  // }
                                  className="px-3 cursor-pointer"
                                >
                                  +
                                </div>
                              </div>
                              <button
                                // onClick={() =>
                                //   // dispatch(delete_card_product(pt._id))
                                // }
                                className="px-5 py-[3px] bg-red-500 text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* ))} */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products?.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>{buy_product_item} Item</span>
                        <span>${price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee</span>
                        <span>${shipping_fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-blue-500 text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-orange-500">
                          ${price + shipping_fee}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase"
                      >
                        Proceed to checkout {buy_product_item}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
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
