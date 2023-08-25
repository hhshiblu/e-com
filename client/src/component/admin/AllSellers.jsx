import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiFillEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
// import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";
// import { getAllSellers } from "../../redux/actions/sellers";
import { Link, useParams } from "react-router-dom";
import { getAllSellers } from "../../Redux/Action/seller";
import { server } from "../../serverUrl";
import styles from "../../styles/style";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [openStatus, setStatusOpen] = useState(false);
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  // Assuming item.status holds the current status of the item
  const itemStatus = "pending"; // Replace with the actual item status

  // Array to hold the options in the desired order
  const statusOptions = [
    { value: itemStatus, label: capitalizeFirstLetter(itemStatus) }, // Current status comes first
    { value: "active", label: "Active" },
    { value: "deactive", label: "Deactive" },
  ];

  // Capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/seller/seller-status-update`,
        {
          sellerId,
          status,
        },
        { withCredentials: true }
      );

      // Handle the response as needed
      if (data.success === true) {
        toast.success(data.message);
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${server}/seller/delete-seller/${id}`).then((res) => {
      toast.success(res.data.message);
    });

    dispatch(getAllSellers());
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 120,
      flex: 0.7,
    },
    {
      field: "  ",
      flex: 0.6,
      minWidth: 90,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/view/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      type: "text",
      minWidth: 110,
      flex: 0.6,
    },

    {
      field: " ",
      flex: 0.7,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => setSellerId(params.id) || setStatusOpen(true)}
            >
              <AiFillEdit size={20} />
            </Button>
            <Button onClick={() => setSellerId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        Status: item.status,
        address: item.address,
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(sellerId)}
                >
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
        {openStatus && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <div>
                <form onSubmit={submit}>
                  <div className="flex gap-4 py-3">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      name=""
                      required
                      id=""
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setStatusOpen(false)}
                >
                  cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setStatusOpen(false) || handleDelete(sellerId)}
                >
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
