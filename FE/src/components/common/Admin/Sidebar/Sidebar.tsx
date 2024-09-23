import {
  Box,
  ChevronDown,
  Contact,
  LayoutDashboard,
  Shirt,
  Trash2,
  Truck,
  User2,
} from "lucide-react";
import { useState } from "react";
import logo from "../../../../assets/Images/Logo/logo white.png";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar_Dashboard() {
  const [expandedSection, setExpandedSection] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.user?.role;
  const toggleExpand = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <aside className="mx-auto h-screen w-[230px] text-gray-100 *:text-sm *:font-medium flex flex-col gap-y-3">
      <div className="items-center px-2 py-1">
        <Link to={"/"}>
          <img src={logo} alt="" className="w-[242px] h-[45px]" />
        </Link>
      </div>
      {role === "admin" && (
        <>
          {" "}
          <div className="whitespace-nowrap *:text-sm *:px-2">
            <button
              onClick={() => toggleExpand("dashboard")}
              className="flex bg-[#333A48] items-center gap-x-4 py-3  w-full text-left"
            >
              <LayoutDashboard />
              <span className="text-[#c4cee3]">Bảng điều khiển</span>
              <ChevronDown
                className={`ml-auto transform ${
                  expandedSection === "dashboard" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === "dashboard" && (
              <div className="mt-2 ml-8">
                <NavLink
                  to="/admin"
                  className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
                >
                  Tổng quan
                </NavLink>
                <NavLink
                  to="/admin/notification"
                  className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
                >
                  Thông báo
                </NavLink>
              </div>
            )}
          </div>
          <div className="*:px-2">
            <button
              onClick={() => toggleExpand("products")}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <Shirt />
              <span className="text-[#c4cee3]">Sản phẩm</span>
              <ChevronDown
                className={`ml-auto transform ${
                  expandedSection === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === "products" && (
              <div className="mt-2 ml-8">
                <NavLink
                  to="/admin/products"
                  className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
                >
                  Danh sách sản phẩm
                </NavLink>
                <NavLink
                  to="/admin/products/add"
                  className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
                >
                  Thêm mới sản phẩm
                </NavLink>
                <NavLink
                  to="/admin/category"
                  className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
                >
                  Quản lý danh mục
                </NavLink>
              </div>
            )}
          </div>
          {/* <div>
        <div className="*:px-2">
          <button
            onClick={() => toggleExpand("attribute")}
            className="flex items-center w-full py-3 text-left gap-x-4"
          >
            <Palette />
            <span className=" text-[#c4cee3]">Thuộc Tính</span>
            <ChevronDown
              className={`ml-auto transform ${
                expandedSection === "attribute" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "attribute" && (
            <div className="mt-2 ml-8">
              <NavLink
                to="/admin/products"
                className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
              >
                Màu sắc
              </NavLink>
              <NavLink
                to="/admin/products/add"
                className="flex items-center px-2 py-3 text-gray-300 hover:text-white"
              >
                Kích Cỡ
              </NavLink>
            </div>
          )}
        </div>
      </div> */}
          <div className="*:px-2">
            <Link
              to={`/admin/orders`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <Box />
              <span className=" text-[#c4cee3]">Đơn Hàng</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/admin/auth`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <User2 />
              <span className=" text-[#c4cee3]">Tài khoản</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/admin/deliveries`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <Truck />
              <span className=" text-[#c4cee3]">Người giao hàng</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/admin/contact`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <Contact />
              <span className=" text-[#c4cee3]">Liên hệ</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/admin/blogs`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-letter-text"
              >
                <path d="M15 12h6" />
                <path d="M15 6h6" />
                <path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" />
                <path d="M3 18h18" />
                <path d="M4 11h6" />
              </svg>
              <span className="text-[#c4cee3]">Bài viết</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/admin/trash`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <Trash2 />
              <span className="text-[#c4cee3]">Thùng rác</span>
            </Link>
          </div>
        </>
      )}
      {role === "courier" && (
        <div className="*:px-2">
          <Link
            to={`/admin/orders`}
            className="flex items-center w-full py-3 text-left gap-x-4"
          >
            <Box />
            <span className=" text-[#c4cee3]">Đơn Hàng</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
