import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
// import logo from "../."
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import {  AiFillDashboard } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { BiCategoryAlt } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import styles from "../../styles/style";

import { useDispatch, useSelector } from "react-redux";

import { BsArrowLeftShort } from "react-icons/bs";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [activemenu, setActiveMenu] = useState("nav_menu");
  const [activeMenu2, setactiveMenu2] = useState("nav_menu2");
  const [isSticky, setIsSticky] = useState(false);
  const [SubMenuDetails, setSubMenuDetails] = useState("");
  const { cart } = useSelector((state) => state.cart);
  // const [searchData, setSearchData] = useState([]);
  const { isSeller } = useSelector((state) => state.seller);

  // const [keyWord, setKeyWord] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const ToggleMenu = () => {
    if (activemenu === "nav_menu") {
      setActiveMenu("nav_menu nav_phone");
    } else {
      setActiveMenu("nav_menu");
      setactiveMenu2("nav_menu2");
    }
  };

  const ToggleMenu2 = (item) => {
    setSubMenuDetails(item);
    if (activeMenu2 === "nav_menu2") {
      setactiveMenu2("nav_menu2 nav_phone2");
    } else {
      setactiveMenu2("nav_menu2");
    }
  };

  // --------------------------------------sticky navbar---------------

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user?._id, dispatch]);
  const handelSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search?value=${searchValue}`);
  };

  const handleMenuItemClick = (e, itemData) => {
    ToggleMenu2(itemData);
  };
  // const { id } = useParams();

  const subCateHandel = (i) => {
    const queryParams = new URLSearchParams({
      subCategory: i,
    });
    const url = `/products/search?${queryParams}`;
    navigate(url);
    ToggleMenu();
  };
  return (
    <>
      <div
        className={` search  shadow-md font-300 sticky  text-black pt-0 md:pt-1`}
      >
        <div className={`navbar ${isSticky ? "sticky" : ""}`}>
          <div className="  h-[60px] min- min-w-fit md:bg-slate-900  md:grid grid-cols-4">
            <div className="hidden md:block text-white m-auto h-[30px]  cursor-pointer">
              <Link to="/" >
                <img src="/img/logo_title.svg" alt="" className="h-full" />
              </Link>
            </div>
            <div className=" md:col-span-2 !m-auto w-[90%] py-[10px] relative">
              <form action="">
                <input
                  type="text"
                  placeholder="search any item.."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-[40px] w-full px-2 border-[2px] border-[#06229b] rounded-md f focus:border-spacing-1.5 "
                />

                <button
                  type="submit"
                  onClick={handelSubmit}
                  className="text-white bg-[#050320] absolute right-0 h-[40px] w-[100px] rounded-r-md font-[600]   "
                >
                  Search
                </button>
              </form>

              {/* {keyWord && keyWord.length !== 0 ? (
                <div className="absolute w-full min-h-[30vh] bg-slate-50 shadow-sm z-[9] p-4">
                  {searchData &&
                    searchData.map((d, index) => {
                      const data = d.name;
                      const Product_name = data?.replace("/s+g", "-");
                      return (
                        <Link
                          to={`/products/all-products/?category=${Product_name}`}
                          onClick={() => setKeyWord("")}
                        >
                          <h1>{d.category}</h1>
                        </Link>
                      );
                    })}
                </div>
              ) : null} */}
            </div>
            <div className="hidden m-auto  md:flex items-center">
              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer mr-[20px]">
                  <Link
                    to={`${isAuthenticated ? "/account/profile" : "/login"}`}
                  >
                    {isAuthenticated ? (
                      <div className=" bg-[#ffffff] !m-auto rounded-full h-[35px] w-[35px] flex items-center justify-center">
                        <h1 className=" text-center text-black mt-[-3px] text-[20px]   font-[600] ">
                          {user?.name.slice(0, 1)}
                        </h1>
                      </div>
                    ) : (
                      <CgProfile size={30} color="#fff" />
                    )}
                  </Link>
                </div>
              </div>

              <div className={`${styles.normalFlex} mx-1`}>
                <Link to="/all-cart-products">
                  <div className="relative cursor-pointer mr-[15px] text-white">
                    <FiShoppingCart size={30} className="text-white" />
                    <span className=" absolute right-[-6px] top-[-5px] rounded-full bg-[#eb2828] w-5 h-5 top right p-0 m-0 text-white font-mono text-[14px] font-[50] loading-tight text-center">
                      {" "}
                      {cart.length}{" "}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden bg-[#232F3E] h-[39px] md:flex items-center ">
            <div
              className="pl-10 my-auto  relative  text-white text-sm md:text-base duration-300 cursor-pointer catagoris"
              onClick={ToggleMenu}
            >
              <BiMenuAltLeft size={25} className="absolute left-2" />
              <h3 className="  font-[600]" >
                {" "}
                All Catagogies{" "}
              </h3>
            </div>
            <div className={`hidden  md:block  my-auto ml-12`}>
              <Navbar />
            </div>
            <div className="my-auto">
              <Link
                to={`${isSeller ? "/seller_DashBoard" : "/become-seller"}`}
                className="mr-8  text-[#ffffff] font-semibold hover:border-[1px] px-[8px] pt-[9px] pb-[9px]  rounded-md "
              >
                {" "}
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
              </Link>
            </div>
          </div>
        </div>

        {/* show category animation i will try allah borosha */}

        <div
          className={
            activemenu === "nav_menu nav_phone"
              ? "fixed top-0 left-0 w-full h-screen bg-[#00000199]  z-[20000] "
              : null
          }
        >
          <ImCancelCircle
            className={
              activemenu === "nav_menu nav_phone"
                ? "fixed top-3 left-[310px]  z-[20000]  border-[3px] border-black cursor-pointer rounded-[100%] text-white"
                : "hidden"
            }
            size={30}
            onClick={ToggleMenu}
          />
          <div className={activemenu}>
            <div className=" text-left border-b-2 bg-[#01032d] border-b-black  py-2 pl-8 flex items-center">
              <h1 className="font-bold pr-2 text-lg text-white">Hello , </h1>
              <h1 className="font-semibold text-lg text-white ">
                {isAuthenticated ? <p> {user?.name} </p> : <p> Sign In </p>}
              </h1>
            </div>
            <div className="bg-[#445069] text-white py-[2px] m-auto">
              <h2>Best wishes for you</h2>
            </div>
            <div className="pt-3">
              {categories.map((i, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.normalFlex}  justify-between px-4 hover:bg-[#EAEDED] mx-2 text-[16px]  rounded-md cursor-pointer  leading-[26px] forHover `}
                    onClick={(e) => handleMenuItemClick(e, i)} // Pass the 'i' data as an argument
                  >
                    <h3 className=" cursor-pointer select-none m-2  font-[510]    text-gray-600">
                      {i.name}
                    </h3>
                    <h2>
                      <IoIosArrowForward className="text-gray-300" />
                    </h2>
                  </div>
                );
              })}
            </div>

            <div className={activeMenu2}>
              <div
                className="text-left border-b-2 border-black py-2 pl-6 flex  text-lg font-semibold"
                onClick={ToggleMenu2}
              >
                <BsArrowLeftShort size={30} className="cursor-pointer" />
                <h1 className="pl-4 cursor-pointer"> Main Categories</h1>
              </div>
              <div className="pt-3 pb-1">
                <h1 className="text-left pl-8 font-semibold text-lg text-gray-900 mx-2 ">
                  {SubMenuDetails.name}
                </h1>
              </div>

              <hr />
              <hr />

              <div className="pt-1">
                {SubMenuDetails?.children?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="hover:bg-gray-300 mx-2 text-gray-700 hover:text-gray-950  rounded-md leading-[24px] py-[6px]  "
                      onClick={() => subCateHandel(item.name)}
                    >
                      <h2 className="text-left pl-7 cursor-pointer text-[16px] ">
                        {item.name}
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------phn menu--------------------------------- */}
        {/* {id ? (
          <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#050320] h-[50px] mx-auto z-50 ">
            <div className="flex">
              <div className="grow rounded-tr-[30px] ">
                <div className="flex mx-auto justify-between ">
                  <div className="flex w-[45%]  justify-around">
                    <button
                      type="button"
                      className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px]"
                      onClick={ToggleMenu}
                    >
                      <BiCategoryAlt className="text-white " size={18} />
                      <p className="mt-[1px] text-xs text-white font-[700] ">
                        Category
                      </p>
                    </button>
                    {isSeller ? (
                      <Link
                        to={`${
                          isSeller ? "/seller_DashBoard" : "/become-seller"
                        }`}
                      >
                        <button
                          type="button"
                          className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px]"
                        >
                          <AiFillDashboard className="text-white " size={18} />
                          <p className="mt-[1px] text-xs text-white font-[700] ">
                            {isSeller ? "Dashboard" : "Shop"}
                          </p>
                        </button>
                      </Link>
                    ) : (
                      <Link to={`${isAuthenticated ? "/profile" : "/login"}`}>
                        <button
                          type="button"
                          className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px]"
                        >
                          <CgProfile className="text-white " size={18} />
                          <p className="mt-[1px] text-xs text-white font-[700] ">
                            Account
                          </p>
                        </button>
                      </Link>
                    )}
                  </div>

                  <div className="flex w-[55%] bg-green-500 font-medium ">
                    <h1 className="text-center  pt-3 text-white  w-[45%]   bg-green-500">
                      Buy Now
                    </h1>

                    <h1
                      className="text-center bg-[#D61355] w-[55%] pt-3 px-2  text-white  font-medium "
                      style={{
                        clipPath: "polygon(21% 0, 100% 0, 100% 100%, 0% 100%)",
                      }}
                    >
                      Add to Cart
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#050320] h-[50px] mx-auto z-50">
            <div className="flex">
              <div className="grow rounded-tr-[30px] ">
                <div className="flex justify-around">
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                    onClick={ToggleMenu}
                  >
                    <BiCategoryAlt className="text-white " size={18} />
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      Category
                    </p>
                  </button>
                  <Link to={`${isAuthenticated ? "/profile" : "/login"}`}>
                    <button
                      type="button"
                      className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                    >
                      <CgProfile className="text-white " size={18} />
                      <p className="mt-[1px] text-xs text-white font-[700] ">
                        Account
                      </p>
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-10px]"
                  >
                    <AiOutlineShoppingCart className="text-white " size={18} />
                  </button>
                  <Link
                    to={`${isSeller ? "/seller_DashBoard" : "/become-seller"}`}
                  >
                    <button
                      type="button"
                      className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                    >
                      <AiFillDashboard className="text-white " size={18} />
                      <p className="mt-[1px] text-xs text-white font-[700] ">
                        {isSeller ? "Dashboard" : "Shop"}
                      </p>
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px] "
                  >
                    <Link to="/all-cart-products" className="relative">
                      <FiShoppingCart
                        className="text-white  relative"
                        size={18}
                      />
                      <span className=" absolute  right-[-7px] top-[-4px] rounded-full bg-[#eb2828] w-5 h-5 top right p-0 m-0 text-white font-mono text-[13px] loading-tight text-center">
                        {card_product_count}
                      </span>
                      <p className="mt-[1px] text-xs text-white font-[700] ">
                        Cart
                      </p>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#050320] h-[50px] mx-auto z-50">
          <div className="flex">
            <div className="grow rounded-tr-[30px] ">
              <div className="flex justify-around">
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                  onClick={ToggleMenu}
                >
                  <BiCategoryAlt className="text-white " size={18} />
                  <p className="mt-[1px] text-xs text-white font-[700] ">
                    Category
                  </p>
                </button>
                <Link to={`${isAuthenticated ? "/account/profile" : "/login"}`}>
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                  >
                    <CgProfile className="text-white " size={18} />
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      Account
                    </p>
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-10px]"
                >
                  <Link to="/" className=" cursor-pointer">
                    <img
                      src="/img/circle_logo.svg"
                      alt=""
                      className="h-[35px]"
                    />
                  </Link>
                </button>
                <Link
                  to={`${isSeller ? "/seller_DashBoard" : "/become-seller"}`}
                >
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                  >
                    <AiFillDashboard className="text-white " size={18} />
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      {isSeller ? "Dashboard" : "Shop"}
                    </p>
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px] "
                >
                  <Link to="/all-cart-products" className="relative">
                    <FiShoppingCart
                      className="text-white  relative"
                      size={18}
                    />
                    <span className=" absolute  right-[-7px] top-[-4px] rounded-full bg-[#eb2828] w-5 h-5 top right p-0 m-0 text-white font-mono text-[13px] loading-tight text-center">
                      {cart.length}
                    </span>
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      Cart
                    </p>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
