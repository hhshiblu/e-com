import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../Redux/Action/order';
import { useDispatch, useSelector } from 'react-redux';

function UserOrderRefunds() {
 const { user } = useSelector((state) => state.user);
 const { orders } = useSelector((state) => state.order);
 const dispatch = useDispatch();

 useEffect(() => {
   dispatch(getAllOrdersOfUser(user?._id));
 }, []);

 const eligibleOrders =
   orders && orders.filter((item) => item.status === "Processing refund");

 const columns = [
   { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

   {
     field: "status",
     headerName: "Status",
     minWidth: 130,
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
     minWidth: 130,
     flex: 0.7,
   },

   {
     field: "total",
     headerName: "Total",
     type: "number",
     minWidth: 130,
     flex: 0.8,
   },

   {
     field: " ",
     flex: 1,
     minWidth: 150,
     headerName: "",
     type: "number",
     sortable: false,
     renderCell: (params) => {
       return (
         <>
           <Link to={`/user/order/${params.id}`}>
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

 eligibleOrders &&
   eligibleOrders.forEach((item) => {
     row.push({
       id: item._id,
       itemsQty: item.cart.length,
       total: "৳ " + item.totalPrice,
       status: item.status,
     });
   });

    return (
      <div className="bg-white p-2 rounded-md h-[70vh] overflow-y-scroll">
        <div className=" pt-1">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
          />
        </div>
      </div>
    );
}

export default UserOrderRefunds