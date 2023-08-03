// HeroBanar.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillPlusSquare, AiTwotoneEdit } from "react-icons/ai";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { RiDeleteBin2Fill, RiDeleteBinLine } from "react-icons/ri";
import {
  createBanar,
  deleteBanar,
  getAllBanar,
} from "../../Redux/Action/banar";
import { backend_URL, server } from "../../serverUrl";
import styles from "../../styles/style";
import axios from "axios";

function HeroBanar() {
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { banars, success, error, isLoading, message } = useSelector(
    (state) => state.banar
  );
  const activeBanars = banars.filter((item) => item.role === 1);
  console.log(activeBanars);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedBanars, setSelectedBanars] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [banarLink, setBanarLink] = useState("");

  useEffect(() => {
    dispatch(getAllBanar());
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(message ? message : "banar added successfully!");
      setOpen(false);
    }
  }, [dispatch, error, message, success]);

  // const handelChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  // };
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);
  // };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("urlbanarproduct", banarLink);

      dispatch(createBanar(formData));
      setBanarLink("");
      setAvatar(null);
      dispatch(getAllBanar());
    } catch (error) {
      console.error("Error creating banar:", error);
    }
  };
  const deleteBanarHandler = async () => {
    try {
      for (const bannerId of selectedBanars) {
        dispatch(deleteBanar(bannerId));
      }

      dispatch(getAllBanar());
    } catch (error) {
      console.error("Error deleting banar:", error);
    }
  };

  //  cheak branch which is active
  const handleBanarCheck = (bannerId) => {
    const newSelectedBanars = [...selectedBanars];

    if (newSelectedBanars.includes(bannerId)) {
      // The banner is already selected, so remove it from the list
      const index = newSelectedBanars.indexOf(bannerId);
      if (index !== -1) {
        newSelectedBanars.splice(index, 1);
      }
    } else {
      // The banner is not selected, so add it to the list
      newSelectedBanars.push(bannerId);
    }

    // Update the state with the new list of selected banners
    setSelectedBanars(newSelectedBanars);
  };

  const updateBannerRole = async () => {
    try {
      for (const bannerId of selectedBanars) {
        await axios
          .put(`${server}/banar/update-banner-role/${bannerId}`, {
            withCredentials: true, // Add withCredentials option
          })
          .then((response) => {
            if (response.data.success === true) {
              toast.success(response.data.message);
            }
          });
      }
      selectedBanars.length = 0;
      dispatch(getAllBanar());
    } catch (error) {
      toast.error(error);
      console.error("Error:", error);
    }
  };

  return (
    <div className=" w-full px-2 mt-4 overflow-y-scroll overflow-hidden h-[88vh]">
      <div className="flex  justify-around  pb-2">
        <h1 className="text-sm 800px:text-lg font-bold ">all banar</h1>
        <div className="flex gap-2 items-center">
          {selectedBanars.length > 0 && (
            <div className="flex gap-4 items-center ">
              <AiTwotoneEdit
                size={25}
                onClick={updateBannerRole}
                className="cursor-pointer"
              />
              <RiDeleteBin2Fill
                className="text-red-800 cursor-pointer"
                size={22}
                onClick={() => {
                  setConfirm(true);
                }}
              />
            </div>
          )}
          <AiFillPlusSquare
            size={25}
            className="rounded-lg text-green-700 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <hr /> <hr /> <hr />
      <h1 className=" font-semibold pt-4">Active banners</h1>
      <div className=" m-auto w-[80%] 800px:w-[95%] grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[15px] xl:grid-cols-4 xl:gap-[15px] p-6">
        {banars &&
          banars
            .filter((item) => item.role === 1)
            .map((item, index) => {
              return (
                <div className="  w-full flex relative" key={index}>
                  <div className="px-2 pr-4  flex flex-col justify-center gap-6  absolute top-4 left-2">
                    <input
                      type="checkbox"
                      name="cheak"
                      id="cheak"
                      className="h-6 w-6 text-red-600 focus:ring-red-900 border-red-600   rounded-lg cursor-pointer"
                      checked={selectedBanars.includes(item._id)}
                      onChange={() => handleBanarCheck(item._id, item.role)}
                    />
                  </div>

                  <img
                    src={`${backend_URL}upload/${item.avatar && item.avatar}`}
                    alt=""
                    className="!w-full  h-[22vh] rounded-2xl border-gray-700 border-[2px]"
                  />
                </div>
              );
            })}
      </div>
      <hr /> <hr /> <hr /> <hr />
      <h1 className=" font-semibold pt-4">InActive banners</h1>
      <div className=" m-auto w-[80%] 800px:w-[95%] grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[15px] xl:grid-cols-4 xl:gap-[15px] p-6">
        {banars &&
          banars
            .filter((item) => item.role === 0)
            .map((item, index) => {
              return (
                <div className="  w-full flex relative" key={index}>
                  <div className="px-2 pr-4  flex flex-col justify-center gap-6  absolute top-4 left-2">
                    <input
                      type="checkbox"
                      name="cheak"
                      id="cheak"
                      className="h-6 w-6 text-red-600 focus:ring-red-900 border-red-600   rounded-lg cursor-pointer"
                      checked={selectedBanars.includes(item._id)}
                      onChange={() => handleBanarCheck(item._id, item.role)}
                    />
                  </div>

                  <img
                    src={`${backend_URL}upload/${item.avatar && item.avatar}`}
                    alt=""
                    className="!w-full  h-[22vh] rounded-2xl border-gray-700 border-[2px]"
                  />
                </div>
              );
            })}
      </div>
      <hr />
      {confirm && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[90%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setConfirm(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              Are you sure you wanna delete this this banar?
            </h3>
            <div className="w-full flex items-center justify-center">
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                onClick={() => setConfirm(false)}
              >
                cancel
              </div>
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                onClick={() => setConfirm(false) || deleteBanarHandler()}
              >
                confirm
              </div>
            </div>
          </div>
        </div>
      )}
      {open && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              create banar
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="pb-2">
                  Banar Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="banarLink"
                  value={banarLink}
                  onChange={(e) => setBanarLink(e.target.value)}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your banar link..."
                />
              </div>
              <br />
              <div className="pb-4">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-800"
                  }`}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
        // <div className="  fixed top-0 left-0 m-auto  z-[999] w-[40%] rounded-[4px] p-3 overflow-y-scroll">
        //   <h5 className="text-[30px] font-Poppins text-center">Create Banar</h5>
        //   <form onSubmit={handleSubmit}>
        //     <hr />

        //     <div>
        //       <label className="pb-2">
        //         Banar Link <span className="text-red-500">*</span>
        //       </label>
        //       <input
        //         type="text"
        //         name="banarLink"
        //         value={banarLink}
        //         onChange={(e) => setBanarLink(e.target.value)}
        //         className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        //         placeholder="Enter your banar link..."
        //       />
        //     </div>
        //     <br />
        //     <div>
        //       <label
        //         htmlFor="avatar"
        //         className="block text-sm font-medium text-gray-700"
        //       ></label>
        //       <div className="mt-2 flex items-center">
        //         <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
        //           {avatar ? (
        //             <img
        //               src={URL.createObjectURL(avatar)}
        //               alt="avatar"
        //               className="h-full w-full object-cover rounded-full"
        //             />
        //           ) : (
        //             <RxAvatar className="h-8 w-8" />
        //           )}
        //         </span>
        //         <label
        //           htmlFor="file-input"
        //           className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        //         >
        //           <span>Upload a file</span>
        //           <input
        //             type="file"
        //             name="avatar"
        //             id="file-input"
        //             onChange={handleFileInputChange}
        //             className="sr-only"
        //           />
        //         </label>
        //       </div>
        //     </div>
        //     <div>
        //       <button
        //         type="submit"
        //         disabled={isLoading}
        //         className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
        //           isLoading
        //             ? "bg-gray-400 cursor-not-allowed"
        //             : "bg-blue-600 hover:bg-blue-800"
        //         }`}
        //       >
        //         {isLoading ? "Submitting..." : "Submit"}
        //       </button>
        //     </div>
        //   </form>
        // </div>
      )}
    </div>
  );
}

export default HeroBanar;
