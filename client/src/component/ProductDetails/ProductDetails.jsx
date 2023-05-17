import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiFillStar,
} from "react-icons/ai";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { backend_url, server } from "../../server";

// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "./Ratings";
import axios from "axios";
import styles from "../../styles/style";

const ProductDetails = ({ data }) => {
  //   const { wishlist } = useSelector((state) => state.wishlist);
  //   const { cart } = useSelector((state) => state.cart);
  //   const { user, isAuthenticated } = useSelector((state) => state.user);
  //   const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  console.log(select);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getAllProductsShop(data && data?.shop._id));
  //     if (wishlist && wishlist.find((i) => i._id === data?._id)) {
  //       setClick(true);
  //     } else {
  //       setClick(false);
  //     }
  //   }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  //   const removeFromWishlistHandler = (data) => {
  //     setClick(!click);
  //     dispatch(removeFromWishlist(data));
  //   };

  //   const addToWishlistHandler = (data) => {
  //     setClick(!click);
  //     dispatch(addToWishlist(data));
  //   };

  //   const addToCartHandler = (id) => {
  //     const isItemExists = cart && cart.find((i) => i._id === id);
  //     if (isItemExists) {
  //       toast.error("Item already in cart!");
  //     } else {
  //       if (data.stock < 1) {
  //         toast.error("Product stock limited!");
  //       } else {
  //         const cartData = { ...data, qty: count };
  //         dispatch(addTocart(cartData));
  //         toast.success("Item added to cart successfully!");
  //       }
  //     }
  //   };

  //   const totalReviewsLength =
  //     products &&
  //     products.reduce((acc, product) => acc + product.reviews.length, 0);

  //   const totalRatings =
  //     products &&
  //     products.reduce(
  //       (acc, product) =>
  //         acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
  //       0
  //     );

  //   const avg =  totalRatings / totalReviewsLength || 0;

  //   const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    // if (isAuthenticated) {
    //   const groupTitle = data._id + user._id;
    //   const userId = user._id;
    //   const sellerId = data.shop._id;
    //   await axios
    //     .post(`${server}/conversation/create-new-conversation`, {
    //       groupTitle,
    //       userId,
    //       sellerId,
    //     })
    //     .then((res) => {
    //       navigate(`/inbox?${res.data.conversation._id}`);
    //     })
    //     .catch((error) => {
    //       toast.error(error.response.data.message);
    //     });
    // } else {
    //   toast.error("Please login to create a conversation");
    // }
    navigate("/inbox?conversation=63583758348527358");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full md:flex gap-5">
{/* ---------------------------------------image part------------------- */}

              <div className="w-full md:w-[50%] lg:w-[30%] ">
                <img
                  //   src={`${backend_url}${data && data.images[select]}`}
                  src={data?.image_Url[select].url}
                  alt=""
                  className="w-[100%] "
                />
                <div className=" flex gap-4 w-full pt-2">
                  {/* {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div> */}
                  <div
                    className={`${
                      select === 0 ? "border border-red-400" : "null"
                    } cursor-pointer  `}

                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[60px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border border-red-400" : "null"
                    } cursor-pointer `}
                  >
                    <img
                     src={data?.image_Url[1].url}
                      alt=""
                      className="h-[60px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
 {/* ------------------------ product Information part ---------------------------- */}

              <div className="w-full md:w-[50%] lg:w-[40%] pt-5">

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
                  <span>
                    ({data.ratings ? <span>data.ratings</span> : 4.7})
                  </span>
                  <span className="pl-3">
                    {" "}
                    | <span className="text-[#0d14e4]"> 1,099 rating</span>{" "}
                  </span>
                </div>
                <hr />
                {/* <p>{data.description.sli}</p> */}
                <div className="flex pt-3 my-2">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {/* {data.discountPrice}$ */}
                    <span className="font-semibold pr-2">৳</span>{" "}
                    {data.discount_price}
                  </h4>
                  <h3 className={`${styles.price} pl-5 flex`}>
                    {/* {data.originalPrice ? data.originalPrice + "$" : null} */}
                    {data.price ? <span>{data.price}</span> : null}
                  </h3>
                  <h3 className="pl-3 mt-[-4px] ">(45%)</h3>
                </div>
                <hr />
                <div className="py-3 ">
                  {data.color ? (
                    <h1 className="flex">
                      Color :{" "}
                      {data.color.map((i, index) => {
                        return (
                          <span
                            key={index}
                            className={`${
                              select === 0 ? " border border-red-400" : "null"
                            } cursor-pointer p-2 mx-2`}
                          >
                            {i.color}
                          </span>
                        );
                      })}{" "}
                    </h1>
                  ) : null}
                </div>
                <div className="pt-2">
                  {data.size ? (
                    <h1 className="flex">
                      Color :{" "}
                      {data.size.map((i, index) => {
                        return (
                          <span
                            key={index}
                            className={`${
                              select === 0 ? " border border-red-400" : "null"
                            } cursor-pointer p-2 mx-2`}
                          >
                            {i.color}
                          </span>
                        );
                      })}{" "}
                    </h1>
                  ) : null}
                </div>

                <div className="flex items-center mt-4 justify-between pr-3">
                  <div class="inline-flex pl-3">
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
                <div className="flex justify-center mr-5">
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
                    // onClick={() => addToCartHandler(data._id)}
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
                  <h1>
                    {" "}
                    24/13 uttora housebuilding <br /> uttora , dhaka
                  </h1>
                </div>
                <hr />

                <div className="flex justify-between pt-8  text-base ">
                  <div className="text-lg text-gray-500">
                    <p> service</p>
                  </div>

                  <GrServices size={15} className="text-gray-400"/>
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
                    <h1 className=" text-bold text-xl pt-4 text-center">90%</h1>
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
            <div className="flex items-center pt-6">
                  {/* <Link to={`/shop/preview/${data?.shop._id}`}> */}
                  <img
                    // src={`${backend_url}${data?.shop?.avatar}`}

                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  {/* </Link> */}
                  <div className="pr-8">
                    {/* <Link to={`/shop/preview/${data?.shop._id}`}> */}
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    {/* </Link> */}
                    <h5 className="pb-3 text-[15px]">
                      {/* ({averageRating}/5) Ratings */}({data.shop.ratings})
                      Ratings
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
                </div>
          </div>
                              {/* ------------------product details info-------------------- */}
          <ProductDetailsInfo
            data={data}
            // products={products}
            // totalReviewsLength={totalReviewsLength}
            // averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  // products,
  // totalReviewsLength,
  // averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
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
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {/* {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div> */}
          <p>no Review yet!</p>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            {/* <Link to={`/shop/preview/${data.shop._id}`}> */}
            <div className="flex items-center">
              <img
                // src={`${backend_url}${data?.shop?.avatar}`}
                src={data.shop.shop_avatar.url}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  {/* ({averageRating}/5) Ratings */}({data.shop.ratings})
                  Rating
                </h5>
              </div>
            </div>
            {/* </Link> */}
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {/* {data.shop?.createdAt?.slice(0, 10)} */}
                  14 jan 2022
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {/* {products && products.length} */}
                  1,233
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">
                  {/* {totalReviewsLength} */}345
                </span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;