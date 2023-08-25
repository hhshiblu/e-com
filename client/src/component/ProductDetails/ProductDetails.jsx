import React, {  useState } from "react";
import {
  AiFillDashboard,
  AiFillHeart,
  AiOutlineHeart,

  AiOutlineShoppingCart,

} from "react-icons/ai";
// import { BsChatDots } from "react-icons/bs";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { GrServices } from "react-icons/gr";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../styles/style";
import { backend_URL, server } from "../../serverUrl";
import { useSelector, useDispatch } from "react-redux";
import {  add_To_cart, get_card_products } from "../../Redux/Action/cart";

import Rating from "./Rating";
import { CgProfile } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
 
const ProductDetails = ({ data, products ,loading}) => {
  // const location = useLocation();
  const [state, setState] = useState("reviews");

  const { user, isAuthenticated } = useSelector((state) => state.user);
  // const { products } = useSelector((state) => state.products);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const percentageDiscount =
    data?.originalPrice === 0
      ? 0
      : ((data?.originalPrice - data?.discountPrice) / data?.originalPrice) *
        100;

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // const addToCartHandler = (id) => {
  //   const isItemExists = cart && cart.find((i) => i._id === id);
  //   if (isItemExists) {
  //     toast.error("Item already in cart!");
  //   } else {
  //     if (data?.stock < 1) {
  //       toast.error("Product stock limited!");
  //     } else {
  //       const cartdata? = { ...data?, qty: count };
  //       dispatch(addTocart(cartdata?));
  //       toast.success("Item added to cart successfully!");
  //     }
  //   }
  // };
  // const inc = () => {
  //   if (quantity >= data?.stock) {
  //     toast.error("Out of stock");
  //   } else {
  //     setQuantity(quantity + 1);
  //   }
  // };

  // const dec = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const addToCartHandler = () => {
    if (user) {
      const info = {
        userId: user._id,
        cartItems: [
          {
            quantity: count,
            productId: data?._id,
          },
        ],
      };

      dispatch(add_To_cart(info));
      dispatch(get_card_products(user?._id));
    } else {
      navigate("/login");
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  // const handleMessageSubmit = async () => {
  //   if (isAuthenticated) {
  //     const groupTitle = data?._id + user._id;
  //     const userId = user._id;
  //     const sellerId = data?.seller._id;
  //     await axios
  //       .post(`${server}/conversation/create-new-conversation`, {
  //         groupTitle,
  //         userId,
  //         sellerId,
  //       })
  //       .then((res) => {
  //         navigate(`/inbox?${res.data?.conversation._id}`);
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data?.message);
  //       });
  //   } else {
  //     toast.error("Please login to create a conversation");
  //   }
  // };
  return (
    <div>
      <div className="bg-white ">
        {data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[90%]`}>
            <div className="w-full py-7">
              <div className="block w-full md:flex gap-5 ">
                {/* ---------------------------------------image part------------------- */}

                <div className="w-full md:w-[50%] lg:w-[30%] h-[55vh]">
                  <div className="h-[80%]  m-auto">
                    {data && data.images && data.images[select] && (
                      <img
                        src={`${backend_URL}upload/${data.images[select]}`}
                        alt=""
                        className=" overflow-hidden  w-[100%] 800px:w-[98%] m-auto h-[100%]"
                      />
                    )}
                  </div>

                  <div className=" flex gap-4 w-full pt-6">
                    {data &&
                      data?.images?.map((i, index) => (
                        <div
                          className={`${
                            select === index
                              ? "border-[2px] border-red-400"
                              : "null border"
                          } cursor-pointer h-[40px] w-[40px] flex justify-center items-center `}
                        >
                          <img
                            src={`${backend_URL}upload/${i}`}
                            alt=""
                            className="  h-full overflow-hidden mx-auto"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                {/* ------------------------ product Information part ---------------------------- */}

                <div className="!w-full md:!w-[50%] lg:w-[40%] pt-5 ">
                  <p className="pb-2">
                    {" "}
                    {data?.stock > 0 ? (
                      <span className=" text-red-700 font-[400]">In Stock</span>
                    ) : (
                      <span>no Stock</span>
                    )}
                  </p>

                  <hr />
                  <h1 className={`font-semibold text-[17px] py-2`}>
                    {data?.name}
                  </h1>
                  <hr />
                  <p className="font-semibold pt-2">
                    Brand:
                    {data?.brand ? (
                      <span>{data?.brandName}</span>
                    ) : (
                      <span className="pl-2">No brand</span>
                    )}{" "}
                  </p>

                  <div className="flex items-center pb-2">
                    <Rating rating={data?.ratings} />
                    <div className="ml-3 text-gray-500"></div>
                    <span>
                      ({data?.ratings ? <span>{averageRating}/5</span> : ""})
                    </span>
                    <span className="pl-3">
                      {" "}
                      |{" "}
                      <span className="text-[#0d14e4]">
                        {" "}
                        {totalReviewsLength} Ratings
                      </span>{" "}
                    </span>
                  </div>
                  <hr />

                  <div className="flex pt-3 my-2">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      <span className="font-semibold pr-2">৳</span>{" "}
                      {data?.discountPrice}
                    </h4>
                    <h3 className={`${styles.price} pl-5 flex`}>
                      {data?.originalPrice ? (
                        <span>{"৳" + data?.originalPrice} </span>
                      ) : null}
                    </h3>
                    <div className="text-sm  text-blue-950 pl-4">
                      ({percentageDiscount.toFixed(0)}%)
                    </div>
                    {/* <h3 className="pl-3 mt-[-4px] "> {data?.originalPrice? ( "("+discountPercentage+"% )") :null }</h3> */}
                  </div>
                  <hr />
                  <div className="py-2 flex items-center">
                    <h1 className="font-semibold text-sm md:text-lg">
                      {data?.color?.length > 0 ? "Color :" : ""}{" "}
                    </h1>
                    {data?.color ? (
                      <div className="flex">
                        {data?.color.map((color, index) => {
                          // Change 'i' to 'color' here
                          return (
                            <span
                              key={index}
                              className={`${
                                selectedColor === index
                                  ? "border border-red-400"
                                  : null
                              } cursor-pointer p-[3px] mx-2`}
                            >
                              <h1 onClick={() => setSelectedColor(index)}>
                                {color}{" "}
                              </h1>{" "}
                              {/* Change 'i.color' to 'color' here */}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  <div className="py-2 flex items-center">
                    <h1 className="font-semibold text-sm md:text-lg">
                      {data?.size?.length > 0 ? "Size :" : ""}{" "}
                    </h1>
                    {data?.size ? (
                      <h1 className="flex">
                        {data?.size.map((size, index) => {
                          // Change 'i' to 'color' here
                          return (
                            <span
                              key={index}
                              className={`${
                                selectedSize === index
                                  ? "border border-red-400"
                                  : null
                              } cursor-pointer px-[2px] mx-2`}
                            >
                              <h1 onClick={() => setSelectedSize(index)}>
                                {size}{" "}
                              </h1>{" "}
                              {/* Change 'i.color' to 'color' here */}
                            </span>
                          );
                        })}
                      </h1>
                    ) : null}
                  </div>

                  <div className="flex items-center mt-4 justify-between pr-3">
                    <div class="inline-flex pl-12">
                      <div
                        className={`bg-[#f24729] border-[#e4434373] mt-2  rounded-sm w-[30px] h-[30px] ${styles.normalFlex}  justify-center cursor-pointer  shadow-lg hover:opacity-75 transition duration-300 ease-in-out`}
                        onClick={incrementCount}
                      >
                        <HiPlus size={30} color="#fff" className="" />
                      </div>
                      <span class="inline-flex  justify-center w-8 p-2 px-5">
                        {count}
                      </span>
                      <div
                        className="bg-[#3435364f]  rounded-sm w-[30px] mt-2  h-[30px] flex items-center  justify-center cursor-pointer shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        <HiOutlineMinus size={16} color="" />
                      </div>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          // onClick={() => removeFromWishlistHandler(data?)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          // onClick={() => addToWishlistHandler(data?)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  {/* -------------------------buy now /add to cart----------- */}
                  {/* <div className="hidden md:block"> */}
                  <div className="flex justify-center mr-5 mt-4 ">
                    <div
                      className={`w-[150px] bg-[#050320]  my-3  justify-center  cursor-pointer !mt-6 !rounded !h-10 flex items-center mr-5`}
                      // onClick={() => addToCartHandler(data?._id)}
                    >
                      <span className="text-white flex items-center">
                        Buy Now
                        <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                    <div
                      className={`w-[150px] bg-[#D61355]  my-3  justify-center  cursor-pointer !mt-6 !rounded !h-10 flex items-center`}
                      onClick={() => addToCartHandler(data?._id)}
                    >
                      <span className="text-white flex items-center">
                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  </div>
                  {/* </div> */}

                  {/* -----------------------------------shop name------ */}
                </div>
                {/* ------------------------------------------- shop adress part------------------------           */}
                <div className="hidden lg:block lg:w-[25%] border float-left  shadow-md px-4">
                  <div className="flex justify-between pt-8  text-base ">
                    <div className="text-gray-400">
                      <p> shop Location</p>
                    </div>

                    <IoLocation size={20} className="text-gray-400 " />
                  </div>

                  <div className="block py-4 text-[15px] text-gray-700 ">
                    <h1 className="text-[#007185]"> {data?.seller?.name} </h1>
                    <h1 className="">{data?.seller?.address}</h1>
                  </div>
                  <hr />

                  <div className="flex justify-between pt-8  text-base ">
                    <div className="text-lg text-gray-500">
                      <p> service</p>
                    </div>

                    <GrServices size={15} className="text-gray-400" />
                  </div>
                  <div className="flex flex-col pb-5">
                    <div className="pt-2 pl-3 text-[18px]">
                      <h2>7 days Returns</h2>
                      <p className="text-gray-400 text-sm">
                        {" "}
                        change mind not allow
                      </p>
                    </div>
                    <div className="pl-3 text-lg pt-2">
                      <h3>Warranty not available</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="py-5">
                    <h2> Cash on Delivery Available</h2>
                  </div>
                  <hr />
                  <div className="flex justify-around items-center py-4">
                    <div>
                      <p className="text-gray-400">Ship on Time</p>
                      <h1 className=" text-bold text-xl pt-4 text-center">
                        90%
                      </h1>
                    </div>
                    <div>
                      <p className="text-gray-400">Chat Response</p>
                      <h1 className=" text-bold text-xl pt-4 text-center">
                        100%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------------------------- shop name---------------------- */}
            </div>
            {/* ------------------product details info-------------------- */}

            <br />
            <br />
          </div>
        ) : null}
      </div>
      <section>
        <div className="w-[100%] md:w-[90%] sm:w-[95%] lg:w-[90%] h-full mx-auto pb-16   bg-[#efeeee]">
          <div className="flex flex-wrap">
            <div className="w-10/12 lg:w-8/12 mx-auto  md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div>
                  <h1 className="text-[20px] md:text-[22px] py-2 text-slate-800  ">
                    Product description
                  </h1>
                  <hr />
                  <hr />
                  <p className="py-5 text-slate-600">{data?.description}</p>
                </div>
                <div>
                  <h1 className="text-[20px] md:text-[22px] py-2 text-slate-800  ">
                    Some popular reviews
                  </h1>
                  <Link to={`/shop/view/${data?.seller?._id}`}>
                    <h2 className="text-[15px] cursor-pointer hover:text-[#db3615] text-gray-500 pb-2">
                      {" "}
                      Shop : {data?.seller?.name}
                    </h2>
                  </Link>

                  <hr />
                  <hr />
                  {data &&
                    data?.reviews?.map((item, index) => {
                      return (
                        <div
                          className="w-full h-min   my-4 p-4 rounded-md "
                          key={index}
                        >
                          <div className="flex ">
                            {item && item.user.avatar ? (
                              <img
                                src={`${backend_URL}upload/${item.user.avatar}`}
                                alt={item.name}
                                className="w-[50px] h-[50px] rounded-full"
                              />
                            ) : null}
                            <div className="w-full flex  pl-6 relative">
                              <h1 className="font-[500] mr-3">
                                {item.user.name}
                              </h1>
                              <span className="mr-2 !mt-1">
                                {" "}
                                <Rating rating={data?.ratings} />{" "}
                              </span>{" "}
                            </div>
                          </div>

                          <div className="pl-16 mt-[-22px] text-gray-500 text-sm">
                            {item.comment}
                          </div>
                        </div>
                      );
                    })}

                  <div className="w-full flex justify-center py-3">
                    {data && data?.reviews?.length === 0 && (
                      <h5>No Reviews have for this product!</h5>
                    )}
                  </div>
                </div>
                {/* <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 hover:bg-green-500 ${
                      state === "reviews"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 hover:text-white hover:bg-green-500 ${
                      state === "description"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Description
                  </button>
                </div> */}
                {/* <div>
                  {state === "reviews" ? (
                    // <Reviews />

                    <div className="w-full min-h-[40vh]  py-2 mt-2  bg-white rounded-md ">
                      <div className="flex   items-center  bg-[#031735] text-white ">
                        <div className="flex items-center pl-10 ">
                          <Link to={`/shop/view/${data?.seller?._id}`}>
                            <img
                              src={`${backend_URL}upload/${data?.seller?.avatar}`}
                              alt=""
                              className="w-[30px] h-[30px] rounded-full mr-2 mx-auto"
                            />
                          </Link>
                          <div className="pl-3 mt-[-10px]">
                            <Link to={`/shop/view/${data?.seller?._id}`}>
                              <h3 className={`${styles.shop_name} `}>
                                {data?.seller?.name}
                              </h3>
                            </Link>
                            <h5 className="mt-[-10px] pb-1 text-[15px]">
                              ({averageRating}/5) Ratings
                            </h5>
                          </div>
                          {/* <div className="flex justify-start items-center gap-3 pl-10 md:lg-20  text-sm md:text-md font-[760] cursor-pointer    text-current">
                            <div onClick={handleMessageSubmit}>
                              <h1>live chat</h1>
                            </div>
                            <div>
                              <BsChatDots className="" />
                            </div>
                          </div> */}
                {/* </div>
                      </div>
                      <hr />
                      <hr />
                      <hr />
                      {data &&
                        data?.reviews?.map((item, index) => {
                          return (
                            <div
                              className="w-full h-min   my-4 p-4 rounded-md "
                              key={index}
                            >
                              <div className="flex ">
                                {item && item.user.avatar ? (
                                  <img
                                    src={`${backend_URL}upload/${item.user.avatar}`}
                                    alt={item.name}
                                    className="w-[50px] h-[50px] rounded-full"
                                  />
                                ) : null}
                                <div className="w-full flex  pl-6 relative">
                                  <h1 className="font-[500] mr-3">
                                    {item.user.name}
                                  </h1>
                                  <span className="mr-2 !mt-1">
                                    {" "}
                                    <Rating rating={data?.ratings} />{" "}
                                  </span>{" "}
                                </div>
                              </div>

                              <div className="pl-16 mt-[-22px] text-gray-500 text-sm">
                                {item.comment}
                              </div>
                            </div>
                          );
                        })}

                      <div className="w-full flex justify-center">
                        {data && data?.reviews?.length === 0 && (
                          <h5>No Reviews have for this product!</h5>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="py-5 text-slate-600">{data?.description}</p>
                  )}
                </div> */}
              </div>
            </div>
            <div className="w-[28%] hidden lg:block md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-1 rounded-md text-slate-600 bg-slate-200">
                  <h2> From {data && data?.seller?.name}</h2>
                </div>
                <div className="lg:flex hidden flex-wrap gap-2 mt-3 border-2 p-1 m-auto rounded-md">
                  {products?.slice(0, 4).map((p, i) => {
                    return (
                      <div className="w-[45%] h-[120px] m-auto">
                        <Link to={`${`/product/${p._id}`}`}>
                          <div className="relative ">
                            <img
                              src={`${backend_URL}upload/${p && p.images[0]}`}
                              alt=""
                              className="w-[100%] h-[120px] mx-auto"
                            />
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {" "}
                              {(p.originalPrice === 0
                                ? 0
                                : ((p.originalPrice - p.discountPrice) /
                                    p.originalPrice) *
                                  100
                              ).toFixed(0)}
                              %
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
