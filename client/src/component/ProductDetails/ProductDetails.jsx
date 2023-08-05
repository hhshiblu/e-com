import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiFillStar,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { GrServices } from "react-icons/gr";

import { Link, useNavigate } from "react-router-dom";

// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/actions/wishlist";

import { toast } from "react-toastify";

import axios from "axios";
import styles from "../../styles/style";
import { backend_URL, server } from "../../serverUrl";
import { useSelector, useDispatch } from "react-redux";
import { addTocart } from "../../Redux/Action/cart";
import { getAllShopProduct } from "../../Redux/Action/product";
import Rating from "./Rating";

const ProductDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopProduct(data && data?.seller._id));
  }, [data, dispatch]);

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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
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

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.seller._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
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
                    <img
                      src={`${backend_URL}upload/${
                        data && data.images[select]
                      }`}
                      alt=""
                      className="w-[100%] 800px:w-[98%] m-auto h-[100%]  "
                    />
                  </div>

                  <div className=" flex gap-4 w-full pt-6">
                    {data &&
                      data.images.map((i, index) => (
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
                    {data.stock > 0 ? (
                      <span className=" text-red-700 font-[400]">In Stock</span>
                    ) : (
                      <span>no Stock</span>
                    )}
                  </p>

                  <hr />
                  <h1 className={`${styles.productTitle} py-2`}>{data.name}</h1>
                  <hr />
                  <p className="font-semibold pt-2">
                    Brand:
                    {data.brand ? (
                      <span>{data.brandName}</span>
                    ) : (
                      <span className="pl-2">No brand</span>
                    )}{" "}
                  </p>

                  <div className="flex items-center pb-2">
                    <Rating rating={data?.ratings} />
                    <div className="ml-3 text-gray-500"></div>
                    <span>
                      ({data.ratings ? <span>{averageRating}/5</span> : ""})
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
                      {data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price} pl-5 flex`}>
                      {data.originalPrice ? (
                        <span>{"৳" + data.originalPrice} </span>
                      ) : null}
                    </h3>
                    <div className="text-sm  text-blue-950 pl-4">
                      ({percentageDiscount.toFixed(0)}%)
                    </div>
                    {/* <h3 className="pl-3 mt-[-4px] "> {data.originalPrice? ( "("+discountPercentage+"% )") :null }</h3> */}
                  </div>
                  <hr />
                  <div className="py-2 flex items-center">
                    <h1 className="font-semibold text-sm md:text-lg">
                      {data?.color?.length > 0 ? "Color :" : ""}{" "}
                    </h1>
                    {data.color ? (
                      <div className="flex">
                        {data.color.map((color, index) => {
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
                    {data.size ? (
                      <h1 className="flex">
                        {data.size.map((size, index) => {
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
                          // onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          // onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  {/* -------------------------buy now /add to cart----------- */}
                  <div className="flex justify-center mr-5 mt-4">
                    <div
                      className={`${styles.button} bg-[#c72e2e] !mt-6 !rounded !h-11 flex items-center mr-5`}
                      // onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-white flex items-center">
                        Buy Now
                        <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-white flex items-center">
                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  </div>
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
                    {/* <h1> {data.shop.name}  </h1> */}
                    <h1>{data?.seller?.address}</h1>
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
              {/* <div className="flex items-center pt-6">
              <Link to={`/shop/view/${data?.seller._id}`}>
                <img
                  src={`${backend_URL}upload/${data?.seller?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
              </Link>
              <div className="pr-8">
                <Link to={`/shop/view/${data?.seller._id}`}>
                  <h5 className="text-[#0C134F] pb-0.5 text-sm sm:text-md">
                    {data.seller.name}
                  </h5>
                </Link>
                <h5 className="pb-3 text-[15px]">
                  ({averageRating}/5) Ratings
                </h5>
              </div>
              <div
                className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-white flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
            </div> */}
            </div>
            {/* ------------------product details info-------------------- */}
            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
              handleMessageSubmit={handleMessageSubmit}
            />
            <br />
            <br />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({ data, averageRating, handleMessageSubmit }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] md:px-5 px-3 800px:px-10 py-2  rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[17px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[17px]   px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-sm md:text-md leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh]  py-2 mt-2 overflow-y-scroll bg-white rounded-md ">
          <div className="flex  md:justify-around  items-center justify-center mx-auto ">
            <div className="flex items-center mx-auto">
              <Link to={`/shop/view/${data?.seller._id}`}>
                <img
                  src={`${backend_URL}upload/${data?.seller?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2 mx-auto"
                />
              </Link>
              <div className="pl-3">
                <Link to={`/shop/view/${data?.seller._id}`}>
                  <h3 className={`${styles.shop_name}`}>{data.seller.name}</h3>
                </Link>
                <h5 className="pb-2 text-[15px]">
                  ({averageRating}/5) Ratings
                </h5>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 pl-8 text-sm md:text-md font-[760] cursor-pointer mx-auto pb-2 md:pb-0 text-current">
              <div onClick={handleMessageSubmit}>
                <h1>live chat</h1>
              </div>
              <div>
                <BsChatDots className="" />
              </div>
            </div>
          </div>
          <hr />
          <hr />
          <hr />
          {data &&
            data.reviews.map((item, index) => {
              return (
                <div
                  className="w-full h-min   my-4 p-4 rounded-md "
                  key={index}
                >
                  <div className="flex ">
                    {item && item.user.avatar ? (
                      <img
                        src={`${backend_URL}upload/${item.user.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />
                    ) : null}
                    <div className="w-full flex  pl-6 relative">
                      <h1 className="font-[500] mr-3">{item.user.name}</h1>
                      <span className="mr-2"> </span>{" "}
                      <Rating rating={data?.ratings} />
                    </div>
                  </div>

                  <div className="pl-16 mt-[-22px] text-gray-500 text-sm">
                    {item.comment}
                  </div>
                </div>
              );
            })}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
