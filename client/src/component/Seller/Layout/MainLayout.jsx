import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineBorderInner,
  AiOutlineDashboard,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import "./MainLayOut.css";
import { RiCouponLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_URL } from "../../../serverUrl";
import { MdOutlineLocalOffer, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GrAdd } from "react-icons/gr";
import { BsChatLeftText, BsFillChatRightDotsFill, BsFillChatTextFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
const { Sider, Content } = Layout;

const MainLayout = () => {
  const { seller } = useSelector((state) => state.seller);
  const [collapsed, setCollapsed] = useState(true);
  const colorBgContainer = "#D61355";

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [activeKey, setActiveKey] = useState("");
  const menuItems = [
    {
      key: "",
      icon: <AiOutlineDashboard className="fs-4" />,
      label: "Dashboard",
    },
    {
      key: "Orders",
      icon: <AiOutlineUnorderedList className="fs-4" />,
      label: "Orders",
      children: [
        {
          key: "all-orders",
          icon: <AiOutlineUnorderedList className="fs-4" />,
          label: "All Orders",
        },
        {
          key: "order-refunds",
          icon: <HiOutlineReceiptRefund className="fs-4" />,
          label: "Refund Orders",
        },
      ],
    },

    {
      key: "Products",
      icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
      label: "Products",
      children: [
        {
          key: "all-Products",
          icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
          label: "All Products",
        },
        {
          key: "add-Product",
          icon: <AiOutlineBorderInner className="fs-4" />,
          label: "Add Product",
        },
      ],
    },
    {
      key: "Events",
      icon: <MdOutlineLocalOffer className="fs-4" />,
      label: "Events",
      children: [
        {
          key: "all-Events",
          icon: <MdOutlineLocalOffer className="fs-4" />,
          label: "All Events",
        },
        {
          key: "add-Event",
          icon: <GrAdd className="fs-4" />,
          label: "Add Event",
        },
      ],
    },
    {
      key: "Chat",
      icon: <BsChatLeftText className="fs-4" />,
      label: "Chat",
      children: [
        {
          key: "Admin-Chat",
          icon: <BsFillChatRightDotsFill className="fs-4" />,
          label: "Admin Chat",
        },
        {
          key: "User-Chat",
          icon: <BsFillChatTextFill className="fs-4" />,
          label: "User Chat",
        },
      ],
    },
    {
      key: "coupon",
      icon: <RiCouponLine className="fs-4" />,
      label: "Coupons",
    },
    {
      key: "withdraw-money",
      icon: <FaClipboardList className="fs-4" />,
      label: "Withdraw Money",
    },
    {
      key: "settings",
      icon: <FaClipboardList className="fs-4" />,
      label: "Setting",
    },
  ];
useEffect(() => {
  const localStorageActiveKey = localStorage.getItem("activeKey");
  if (localStorageActiveKey) {
    setActiveKey(localStorageActiveKey);
  } else {
  
     localStorage.removeItem("activeKey");
  }
}, []);

  return (
    <Layout onContextMenu={(e) => e.preventDefault()}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen"
      >
        <div className="logo  bg-[#D61355] py-[5px] border-r-2">
          <Link to="/">
            <h2 className="text-white fs-5 text-center py-3 mb-0">
              {collapsed ? (
                <span className="sm-logo text-[19px]">R D</span>
              ) : (
                <span className="lg-logo text-[19px]">Raj-Dhola</span>
              )}
            </h2>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[activeKey]}
          onClick={({ key }) => {
            navigate(key);
            setActiveKey(key);
          }}
          onmouseenter={(event) => {
            setActiveKey(event.key);
          }}
          items={menuItems.map((item) => ({
            ...item,
            key: item.key,
            onMouseEnter: () => {
              item.className = "ant-menu-item-selected";
            },
            onMouseLeave: () => {
              item.className = "";
            },
          }))}
        />
      </Sider>
      <Layout className="site-layout">
        <Layout.Header
          className="flex justify-between items-center  px-8"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger pl-4 text-[26px] text-white cursor-pointer ",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="pr-8 flex items-center">
            <Link to="/seller_DashBoard/coupon" className="800px:block hidden">
              <RiCouponLine
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to="/seller_DashBoard/all-Events"
              className="800px:block hidden"
            >
              <MdOutlineLocalOffer
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to="/seller_DashBoard/all-Products"
              className="800px:block hidden"
            >
              <FiShoppingBag
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to="/seller_DashBoard/all-orders"
              className="800px:block hidden"
            >
              <AiOutlineUnorderedList
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="#" className="">
              <IoNotifications
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/shop/${seller?._id}`}>
              <img
                src={`${backend_URL}upload/${seller?.avatar}`}
                alt=""
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </Link>
          </div>
        </Layout.Header>
        <Content
          style={{
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
