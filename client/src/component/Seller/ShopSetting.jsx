import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_URL, server } from "../../serverUrl";
import styles from "../../styles/style";
import { loadSeller } from "../../Redux/Action/user";

const ShopSetting = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/seller/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/seller/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-[82vh] overflow-y-scroll overflow-hidden flex flex-col items-center">
      <div className="flex w-full 800px:w-[90%] flex-col justify-center my-5 px-2">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_URL}upload/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera  className="cursor-pointer"/>
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}

        <form onSubmit={updateHandler} aria-required={true} className="md:space-y-6 mt-4">
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2 pl-3">Shop Name</label>
              <input
                type="text"
                placeholder={`${seller.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="  appearance-none  !w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
                required
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2 pl-3">Shop Address</label>
              <input
                type="text"
                placeholder={seller?.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="  appearance-none  !w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
                required
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2 pl-3">Phone Number</label>
              <input
                type="number"
                placeholder={seller?.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="  appearance-none  !w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
                required
              />
            </div>

            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2 pl-3">Zip Code</label>
              <input
                type="number"
                placeholder={seller?.zipCode}
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className="  appearance-none  !w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
                required
              />
            </div>
            <br />
          </div>
          <div className="w-full ">
            <label className=" pb-2 block pl-3">Shop description</label>
            <textarea
              name="description"
              id="description"
              rows="7"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="md:w-[97%]  mx-auto  p-4 rounded-lg  appearance-none  w-[95%] px-3 py-2 border border-gray-300  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
            ></textarea>
          </div>
         
          <div className="block mx-auto text-center">
            <input
              className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer mx-auto`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSetting;
