import React from "react";
import AdminHeader from "../../component/admin/layOut/AdminHeader";
import AdminSideBar from "../../component/admin/layOut/AdminSideBar";
import HeroBanar from "../../component/admin/HeroBanar.jsx";
const AdminDashboardBanar = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <HeroBanar />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBanar;
