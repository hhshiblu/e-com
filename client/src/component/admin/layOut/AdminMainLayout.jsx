import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineBorderInner,
  AiOutlineDashboard,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";
import "./AdminMainLayOut.css";
import { RiCouponLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaClipboardList, FaUserTie } from "react-icons/fa";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_URL } from "../../../serverUrl";
import {
  MdOutlineLocalOffer,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FiSettings, FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GrAdd } from "react-icons/gr";
import {
  BsChatLeftText,
  BsFillChatRightDotsFill,
  BsFillChatTextFill,
} from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
const { Sider, Content } = Layout;

const AdminMainLayout = () => {
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
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
      key: "home",
      icon: <AiOutlineUnorderedList className="fs-4" />,
      label: "Home",
      children: [
        {
          key: "hero_section",
          icon: <AiOutlineUnorderedList className="fs-4" />,
          label: "Hero_section",
        },
        {
          key: "#",
          icon: <HiOutlineReceiptRefund className="fs-4" />,
          label: "About",
        },
      ],
    },
    {
      key: "all_users",
      icon: <AiOutlineUser className="fs-4" />,
      label: "All Users",
    },
    {
      key: "all_sellers",
      icon: <FaUserTie className="fs-4" />,
      label: " All Sellers",
    },
    {
      key: "products",
      icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
      label: "Products",
      children: [
        {
          key: "all_products",
          icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
          label: "All Products",
        },
        // {
        //   key: "#",
        //   icon: <AiOutlineBorderInner className="fs-4" />,
        //   label: "",
        // },
      ],
    },
    {
      key: "category",
      icon: <BiCategory className="fs-4" />,
      label: "Category",
    },
    {
      key: "orders",
      icon: <AiOutlineUnorderedList className="fs-4" />,
      label: "Orders",
      children: [
        {
          key: "all_orders",
          icon: <AiOutlineUnorderedList className="fs-4" />,
          label: "All Orders",
        },
        {
          key: "#",
          icon: <HiOutlineReceiptRefund className="fs-4" />,
          label: "Refund Orders",
        },
      ],
    },

    {
      key: "events",
      icon: <MdOutlineLocalOffer className="fs-4" />,
      label: "Events",
      children: [
        {
          key: "all_events",
          icon: <MdOutlineLocalOffer className="fs-4" />,
          label: "All Events",
        },
        {
          key: "#",
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
          key: "seller_chat",
          icon: <BsFillChatRightDotsFill className="fs-4" />,
          label: "Seller Chat",
        },
        {
          key: "User_chat",
          icon: <BsFillChatTextFill className="fs-4" />,
          label: "User Chat",
        },
      ],
    },
    {
      key: "seller_withdraw_request",
      icon: <FaClipboardList className="fs-4" />,
      label: "Withdraw Money",
    },
    {
      key: "settings",
      icon: <FiSettings className="fs-4" />,
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
            <Link
              to="/admin_DashBoard/all_events"
              className="800px:block hidden"
            >
              <MdOutlineLocalOffer
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to="/admin_DashBoard/all_products"
              className="800px:block hidden"
            >
              <FiShoppingBag
                color="#FFFFFF"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to="/admin_DashBoard/all_orders"
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
            <Link to={`/account/profile`}>
              <img
                src={`${backend_URL}upload/${user?.avatar}`}
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
export default AdminMainLayout;
