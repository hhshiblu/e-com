import React, { useEffect, useState } from "react";

import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { toast } from "react-toastify";
import { getAllOrdersOfShop } from "../../Redux/Action/order";
import { backend_URL, server } from "../../serverUrl";
import styles from "../../styles/style";
import SellerLoader from "../Loader/SellerLOader";


const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/seller_DashBoard/all-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      {isLoading ? (
        <SellerLoader/>
      ) : (
        <div className={`p-5 min-h-screen ${styles.section} bg-white`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} color="crimson" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
            <Link to="/seller_DashBoard/all-orders">
              <div
                className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
              >
                Order List
              </div>
            </Link>
          </div>
          <br />
          <hr />

          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-[#00000084]">
              Order ID: <span>#{data?._id?.slice(0, 8)}</span>
            </h5>
            <h5 className="text-[#00000084]">
              Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
            </h5>
          </div>

          {/* order items */}
          <br />
          <br />
          {data &&
            data?.cart.map((item, index) => (
              <div className="w-full flex items-start mb-5">
                <img
                  src={`${backend_URL}upload/${item.images[0]}`}
                  alt=""
                  className="w-[50x] h-[50px]"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-sm  text-[#0C134F] md:text-lg">
                    {item.name}
                  </h5>
                  <h5 className="pl-3 text-[20px] text-[#00000091] text-sm">
                    US${item.discountPrice} x {item.qty}
                  </h5>
                </div>
              </div>
            ))}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-sm md:text-md">
              Total Price:{" "}
              <strong>
                <span className="text-sm font-semibold pr-4">ট</span>{" "}
                {data?.totalPrice}
              </strong>
            </h5>
          </div>
          <br />
          <br />
          <div className="w-full 800px:flex items-center">
            <div className="w-full 800px:w-[60%]">
              <h4 className=" text-sm md:text-md font-[600]">
                Shipping Address:
              </h4>

              <h4 className="pt-3 text-sm md:text-md font-[500] text-[#00000084]">
                {data?.shippingAddress.city}
              </h4>
              <div className="flex  ">
                <h4 className=" text-sm md:text-md pr-2 font-[500] text-[#00000084]">
                  {data?.shippingAddress.address1}
                </h4>
                {
                  <h4 className=" text-sm md:text-md font-[500] text-[#00000084]">
                    , {data?.shippingAddress.address2}
                  </h4>
                }
              </div>

              <h4 className="font-[500] text-sm md:text-md text-[#00000084] ">
                Number : {data?.user?.phoneNumber}
              </h4>
            </div>
            <div className="w-full 800px:w-[40%]">
              <h4 className="pt-3 text-[20px]">Payment Info:</h4>
              <h4>
                Status:{" "}
                {data?.paymentInfo?.status
                  ? data?.paymentInfo?.status
                  : "Not Paid"}
              </h4>
            </div>
          </div>
          <br />
          <br />
          <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
          {data?.status !== "Processing refund" &&
            data?.status !== "Refund Success" && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
              >
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferred to delivery partner",
                      "Shipping",
                      "Received",
                      "On the way",
                      "Delivered",
                    ].indexOf(data?.status)
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
          {data?.status === "Processing refund" ||
          data?.status === "Refund Success" ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {["Processing refund", "Refund Success"]
                .slice(
                  ["Processing refund", "Refund Success"].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          ) : null}

          <button
            className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
            onClick={
              data?.status !== "Processing refund"
                ? orderUpdateHandler
                : refundOrderUpdateHandler
            }
          >
            Update Status
          </button>
        </div>
      )}
    </div>
  );
  
    }
    



export default OrderDetails;
