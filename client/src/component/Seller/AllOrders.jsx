import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Loader from "../Layout/Loader";

import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllOrdersOfShop } from "../../Redux/Action/order";
import SellerLOader from "../Loader/SellerLOader";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch,seller._id]);

  
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 120, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 120,
      flex: 0.8,
    },

    {
      field: "Details",
      flex: 0.8,
      minWidth: 120,
      headerName: "Details",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
  orders.forEach((item) => {
    const totalPrice=item?.cart?.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
 
    const rowItem = {
      id: item._id,
      itemsQty: item.cart.length,
      total: "US$ " + totalPrice,
      status: item.status,
    };

    row.push(rowItem);
  });

  return (
    <>
      {isLoading ? (
        <SellerLOader />
   
      ) : (
        <div className="w-full md:px-6 px-1 pt-4 mt-6 bg-white h-[88vh] overflow-y-scroll overflow-hidden">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}  
    </>
  );
};

export default AllOrders;
