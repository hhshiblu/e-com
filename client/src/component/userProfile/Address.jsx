import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/style";
import { Division } from "../../staticData/data";
import { RxCross1 } from "react-icons/rx";
import { deleteUserAddress, updatUserAddress } from "../../Redux/Action/user";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Address() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [division, setdivision] = useState("");
  const [district, setdistrict] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user,successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
console.log(location);
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

const handleSubmit = async (e) => {
  e.preventDefault();
  if (
    addressType === "" ||
    division === "" ||
    district === "" ||
    zipCode === "" ||
    address === ""
  ) {
    toast.error("Please fill all the fields!");
  } else {
    dispatch(
      updatUserAddress(
        name,
        number,
        division,
        district,
        address,
        zipCode,
        addressType
      )
    );

    // Assuming successMessage is set when the update is successful
    if (successMessage) {
      toast.success(successMessage);

      if (location.state && location.state.checkout) {
        // If location.state.checkout is true, navigate to "/checkout_products"
        navigate("/checkout_products");
      }
    }

    // Reset form fields and close the form
    setOpen(false);
    setdivision("");
    setdistrict("");
    setName("");
    setNumber("");
    setAddress("");
    setZipCode(null);
    setAddressType("");
  }
};

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="grid">
      <div className=" !overflow-hidden px- ">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 z-50 left-0 flex items-center justify-center ">
            <div className="w-[90%] 800px:w-[60%] h-[80vh] z-50   bg-white rounded shadow relative overflow-y-scroll  800px:mt-20 ">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>
              <div className="w-full">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="w-full block p-4">
                    <div className="w-[95%] pb-2">
                      <label className="block pb-2"> Full name</label>
                      <input
                        name="name"
                        type="text"
                        className={`${styles.input} `}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>{" "}
                    <div className="w-[95%] pb-2">
                      <label className="block pb-2">number</label>
                      <input
                        name="number"
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">division</label>
                      <select
                        name="division"
                        id=""
                        value={division}
                        onChange={(e) => setdivision(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px] pl-2"
                      >
                        <option value="" className="block border pb-2 ">
                          choose your division
                        </option>
                        {Division &&
                          Division.map((item, index) => {
                            return (
                              <option value={index} className="block pb-2">
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Choose your district</label>
                      <select
                        name="district"
                        id=""
                        value={district}
                        onChange={(e) => setdistrict(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px] pl-2"
                      >
                        <option value="" className="block border pb-2">
                          choose your district
                        </option>
                        {division !== "" &&
                          Division[division].district.map((district, index) => (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="w-[95%] pb-2">
                      <label className="block pb-2">Address </label>
                      <input
                        type="address"
                        name="address"
                        className={`${styles.input} `}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="w-[95%] pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        name="zipCode"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        name="addressType"
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your Address Type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className=" w-[95%] pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} mt-5 cursor-pointer bg-lime-500`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="sm:text-xs md:text-lg font-[600] text-[#000000ba] pb-2">
            My Addresses
          </h1>
          <div
            className={` bg-[#050320] p-1 rounded-md px-2`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff] sm:text-xs  cursor-pointer md:text-[17px]">
              Add New
            </span>
          </div>
        </div>
        <br />
        <div className="overflow-x-scroll">
          {user &&
            user.addresses.map((item, index) => (
              <div
                // className="  mx-auto p-2 md:p-2 overflow-x-auto rounded-xl bg-gray-200 lg:w-full lg:aspect-square flex items-center"
                className=" w-[600px] md:w-full hide-scrollbar overflow-y-auto  bg-white h-min py-3 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
                key={index}
              >
                <div className="flex items-center">
                  <h5 className="pl-5 font-[600]">{item.addressType}</h5>
                </div>
                <div className="pl-8 flex items-center">
                  <h6 className="text-[12px] 800px:text-[unset]">
                    {item.address}
                  </h6>
                </div>
                <div className="pl-8 flex items-center">
                  <h6 className="text-[12px] 800px:text-[unset]">
                    {item.number}
                  </h6>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                  <AiOutlineDelete
                    size={25}
                    className="cursor-pointer"
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </div>
            ))}
        </div>

        {user && user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You not have any saved address!
          </h5>
        )}
      </div>
    </div>
  );
}

export default Address;
