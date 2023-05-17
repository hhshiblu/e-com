import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/style";
import { server } from "../../serverUrl";
import { toast } from "react-toastify";
// import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
//   const [data,setData] = useState({});
//   const {products} = useSelector((state) => state.products);
//   const [isLoading,setIsLoading] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();
const navigate =useNavigate();
//   useEffect(() => {
//     dispatch(getAllProductsShop(id));
//     setIsLoading(true);
//     axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
//      setData(res.data.shop);
//      setIsLoading(false);
//     }).catch((error) => {
//       console.log(error);
//       setIsLoading(false);
//     })
//   }, [])
  

  const logoutHandler = async () => {
    axios.get(`${server}/seller/logout`,{
      withCredentials: true,
    }) .then((res) => {
      toast.success(res.data.message);
      window.location.reload(true);
      navigate("/");
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
  };

//   const totalReviewsLength =
//     products &&
//     products.reduce((acc, product) => acc + product.reviews.length, 0);

//   const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

//   const averageRating = totalRatings / totalReviewsLength || 0;

  return (
   <>
   {/* {
    isLoading  ? (
      <Loader />
    ) : ( */}
      <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            // src={`${backend_URL}upload/${data.avatar}`}
        src=""
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">
            {/* {data.name} */}
            hasan
            </h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {/* {data.description} */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam sunt possimus distinctio iure at?
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">
            {/* {data.address} */}
            sanki para 12/14
            </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">
            {/* {data.phoneNumber} */}
            0978765678
            </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">
            {/* {products && products.length} */}
            hello
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">
            {/* {averageRating}/5 */}
            4.9
            </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">
            {/* {data?.createdAt?.slice(0, 10)} */}
            14/5/23
            </h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
           <Link to="/settings">
           <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
            <span className="text-white">Edit Shop</span>
          </div>
           </Link>
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
          onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
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
