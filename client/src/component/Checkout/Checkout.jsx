import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import { Division } from "../../staticData/data";
import { useLocation } from "react-router-dom";
import { server } from "../../serverUrl";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    state: { products, price },
  } = useLocation();

  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [division, setdivision] = useState("");
  const [district, setdistrict] = useState("");
  const [userInfo, setUserInfo] = useState(true);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const shipping = products.length * 74;

  const create_order = async () => {
    try {
      const shippingAddress = {
        name: name,
        number: number,
        address: address,
        division: Division[division]?.name,
        district: district,
      };
      let userId = user._id;
      const paymentInfo = {
        status:"unpaid",
        info:"Cash on delivey",
      }; // Payment info

      const cart = products.map((product) => ({
        product: product.product._id,
        quantity: product.quantity,
        color: product.color,
        size: product.size,
      }));

      const orderData = {
        cart,
        shippingAddress,
        userId,
        paymentInfo,
      };
      console.log(orderData);

      // const response = await axios.post(
      //   `${server}/order/create-order`,
      //   orderData,
      //   {
      //     withCredentials: true,
      //   }
      // );

      // console.log("Order created:", response.data.orders);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const sellerId = res.data.couponCode?.sellerId;

      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          products &&
          products.filter((item) => item.product.sellerId === sellerId);
        console.log(isCouponValid);
        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.quantity * item.product.discountPrice,
            0
          );
          console.log(couponCodeValue);
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (price + shipping - discountPercentenge).toFixed(2)
    : (price + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-2">
      <div className="w-[90%] 1000px:w-[80%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            division={division}
            setdivision={setdivision}
            district={district}
            setdistrict={setdistrict}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
            setName={setName}
            name={name}
            setNumber={setNumber}
            number={number}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            shipping={shipping}
            price={price}
            totalPrice={totalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>

      <br />
      <div className="bg-white mt-5 800px:mt-6  w-[90%] 1000px:w-[80%]  p-4">
        <h1 className="text-[17px] pb-2 font-[500]">Payment Info</h1>
        <hr /> <hr />
        <div className="flex flex-row pt-3">
          <input type="radio" className="mr-3" checked={true} />
          <h2>Cash on delivery</h2>
        </div>
      </div>

      <div
        className={`${styles.button} !bg-[#D61355] !h-[40px] w-[150px] 800px:w-[280px] `}
        onClick={create_order}
      >
        <h5 className="text-white">Confirm Order</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  division,
  setdivision,
  district,
  setdistrict,
  userInfo,
  setUserInfo,
  address,
  setAddress,
  zipCode,
  setZipCode,
  setName,
  name,
  setNumber,
  number,
}) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const handleAddressSelection = (selectedAddress, index) => {
    setAddress(selectedAddress.address);
    setZipCode(selectedAddress.zipCode);
    setdivision(selectedAddress.division);
    setdistrict(selectedAddress.district);
    setName(selectedAddress.name);
    setNumber(selectedAddress.number);
    setSelectedAddressIndex(index);
  };

  useEffect(() => {
    setSelectedAddressIndex(0); // Initialize with the default index
    if (userInfo && user && user.addresses.length > 0) {
      handleAddressSelection(user.addresses[0], 0);
    }
  }, [userInfo, user]);

  return (
    <div>
      <div className="w-full 800px:w-[95%] bg-white rounded-lg p-3 pb-8 min-h-[319px]">
        <h5 className="text-[16px] text-center font-[500] pb-2">
          Shipping Address
        </h5>

        <hr />

        <h5
          className="text-[16px] font-[500] pb-2 cursor-pointer inline-block"
          onClick={() => setUserInfo(userInfo)}
        >
          Choose From saved address
        </h5>

        {user &&
          user.addresses.map((item, index) => (
            <div className="w-full flex mt-1" key={index}>
              <input
                type="radio"
                name="addressType"
                className="mr-3"
                value={item.addressType}
                checked={index === selectedAddressIndex}
                onChange={() => handleAddressSelection(item, index)}
              />
              <h2>{item.addressType}</h2>
            </div>
          ))}

        <div className="border-grey-300 mt-4 border p-3 rounded-md text-sm md:text-[17px] 800px:max-w-[70%] w-[80%] mx-auto flex-grow">
          <div className="flex">
            <p>
              {name} , {number}
            </p>
          </div>
          <div className="py-1">
            <p> {address}</p>
          </div>
          <div className="flex">
            <p>
              {district} , {Division[division]?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  price,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-4 ">
      <div className="flex justify-between">
        <h3 className="text-[15px] font-[400] text-[#000000a4] ">Subtotal:</h3>
        <h5 className="text-[16px] font-[600]">৳ {price}</h5>
      </div>
      <br />
      <div className="flex justify-between mt-[-4px]">
        <h3 className="text-[15px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[17px] font-[600]">৳ {shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b mt-[-4px] pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "৳" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-1">৳ {totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[35px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[35px] m-auto border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
