import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/style";
import { backend_URL, server } from "../../serverUrl";
import { toast } from "react-toastify";
import { getAllShopProduct } from "../../Redux/Action/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const [activetab, setActiveTab] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllShopProduct(id));
    setIsLoading(true);
    axios
      .get(`${server}/seller/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.seller);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = async () => {
    axios
      .get(`${server}/seller/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
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

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {/* {
    isLoading  ? (
      <Loader />
    ) : ( */}
      <div className="flex justify-between">
        <div className="w-full py-5 px-6 ">
          <div className="w-full flex items-center  justify-between md:justify-center">
            <div className={`${isOwner ? "" : "mx-auto"}`}>
              <img
                src={`${backend_URL}upload/${data.avatar}`}
                alt=""
                className="w-[90px] h-[90px] object-cover rounded-full border-[4px] p-1  border-blue-950"
              />
            </div>
            <div className=" mt-[-20px] md:mt-0 ">
              {isOwner && (
                <div className="!absolute right-24 top-20 ">
                  <Link to="/seller_DashBoard">
                    <div
                      className={`border border-blue-700 px-2 py-1 bg-[#352a2a] rounded-md cursor-pointer`}
                    >
                      <span className="text-[#fff]">Go Dashboard</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-around">
            <div>
              <h3 className="text-start py-2 font-[600]  text-[18px] text-[#060a2f]">
                ShopName
              </h3>
              <h3>{data.name}</h3>
            </div>

            <div className="p-3">
              <h5 className="font-[600]">Address </h5>
              <h4 className="text-[#000000a6]">{data.address}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className=" border-gray-200 pb-4">
        <button
          className="flex items-center justify-end w-full pr-6 pb-2"
          onClick={() => setActiveTab(!activetab)}
        >
          <span className="text-lg font-medium text-gray-900 pr-3">
            view more
          </span>

          {activetab === true ? (
            <svg
              className="h-6 w-6 text-gray-500 mt-1 transition-all "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
        <hr />
        {activetab === true && (
          <div className="mt-4 px-4">
            <p className="text-base text-gray-500">
              {data.description}hhsjdfjsjafd
            </p>

            <div className="flex justify-between mt-6 items-center">
              <div className="font-[600]">
                <h5 className="font-[600]">All Products</h5>
                <h4 className="text-[#000000a6]">
                  {products && products.length}
                </h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Ratings</h5>
                <h4 className="text-[#000000b0]">{averageRating}/5</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Joined On</h5>
                <h4 className="text-[#000000b0]">
                  {data?.createdAt?.slice(0, 10)}
                </h4>
              </div>
            </div>
            <div className="">
              {isOwner && (
                <div className="py-3 px-4 flex md:gap-8 justify-around md:justify-center">
                  <div>
                    <Link to="/settings">
                      <div
                        className={`border border-red-400 px-2 py-1 bg-[#443b3b] rounded-md cursor-pointer`}
                      >
                        <span className="text-white">Edit Shop</span>
                      </div>
                    </Link>
                  </div>

                  <div
                    className={`border border-red-400 px-2 py-1 bg-[#443b3b] rounded-md cursor-pointer`}
                    onClick={logoutHandler}
                  >
                    <span className="text-white">Log Out</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* )
   } */}
    </>
  );
};

export default ShopInfo;
