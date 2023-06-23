import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsChatDots } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllOrdersOfUser } from "../Redux/Action/order";
import { backend_URL, server } from "../serverUrl";
import styles from "../styles/style";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);
   const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();
const navigate=useNavigate() 
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
console.log(data,"mdngdsj");
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle =  user._id;
      const userId = user._id;
      const sellerId = user._id;
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
  
  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`p-5 min-h-screen ${styles.section} bg-white`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
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
        data?.cart.map((item, index) => {
          return (
            <div key={index} className="w-full   800px:flex  items-start mb-5">
              <div className="w-full flex items-start">
                <img
                  src={`${backend_URL}upload/${item.images[0]}`}
                  alt=""
                  className="w-[50x] h-[50px] "
                />
                <div className="w-full ">
                  <h5 className="pl-3 text-sm  text-[#0C134F] md:text-lg">
                    {item.name}
                  </h5>
                  <h5 className="pl-3 text-[20px] text-[#00000091] text-sm">
                    <span className="font-semibold text-sm pr-4">ট </span>{" "}
                    {item.discountPrice} x {item.qty}
                  </h5>
                </div>
              </div>

              {!item.isReviewed && data?.status === "Delivered" ? (
                <div
                  className={`${styles.button} text-[#fff] mx-auto mt-7 800px:mt-0`}
                  onClick={() => setOpen(true) || setSelectedItem(item)}
                >
                  Write a review
                </div>
              ) : null}
            </div>
          );
        })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005]  !z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[55%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${backend_URL}upload/${selectedItem?.images[0]}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                ট {selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-sm md:text-lg">
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
          <h4 className=" text-sm md:text-lg font-[600]">Shipping Address:</h4>

          <h4 className="pt-3 text-sm md:text-md font-[500] text-[#00000084]">
            {data?.shippingAddress.city}
          </h4>
          <div className="flex  ">
            <h4 className=" text-sm md:text-md pr-2 font-[500] text-[#00000084]">
              {data?.shippingAddress.address1}
            </h4>
            {
              <h4 className="  font-[500] text-[#00000084]">
                , {data?.shippingAddress.address2}
              </h4>
            }
          </div>

          <h4 className="font-[500] text-sm md:text-md text-[#00000084] ">
            Number : {data?.user?.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-sm md:text-lg font-[600] ">Payment Info:</h4>
          <h4>
            Status:
            <span className="mr-3"></span>{" "}
            <span className="text-[#00000084]">
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </span>
          </h4>
          <br />
          {data?.status === "Delivered" && (
            <div
              className={`${styles.button} text-white`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>

      <Link to="/">
        <div className="flex items-center gap-3 pt-3 text-sm md:text-lg font-[760]">
          <div onClick={handleMessageSubmit}>
            <h1>live chat</h1>
          </div>
          <div>
            <BsChatDots className="" />
          </div>
        </div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
