import React, { useEffect, useState } from "react";
import { backend_URL, server } from "../../serverUrl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUser, updateUserInformation } from "../../Redux/Action/user";
import axios from "axios";
import { AiOutlineCamera } from "react-icons/ai";

function UserProfile() {

  const { user, error, successMessage } = useSelector((state) => state.user);
const initialName = user && user.name ? user.name : "";
const initialEmail = user && user.email ? user.email : "";

const [name, setName] = useState(initialName);
const [email, setEmail] = useState(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        if (response.success === true)
          toast.success("Profile Picture updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={`${backend_URL}upload/${user?.avatar}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera className="cursor-pointer" />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5  mb-[90px] md:mb-0">
        <form onSubmit={handleSubmit}>
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className="  appearance-none  !w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className="  appearance-none  !w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 mb-2 md:mb-0"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3"></div>
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
}

export default UserProfile;
