import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <li>
        <Link
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex w-[34px] h-[34px] items-center justify-center rounded-full border-[0.5px] bg-[#EFF4FB]"
        >
          <span
            className={`absolute -top-0.5 right-0 z-[2] h-2 w-2 rounded-full bg-red-700`}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700 opacity-75"></span>
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#677381"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-bell hover:stroke-[#3C50E0]"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </Link>
        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white right-0 w-[320px]`}
          >
            <div className="px-5 py-3">
              <h5 className="text-[14px] font-semibold text-[#8A99AF]">
                Tin Nhắn
              </h5>
            </div>

            <ul className="flex max-h-[300px] flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex space-x-3 gap-4.5 border-t border-stroke px-5 py-3 hover:bg-gray-200"
                  to="/messages"
                >
                  <div className="h-12 w-12  ">
                    <img
                      src="https://picsum.photos/300/300"
                      className="rounded-full"
                      alt="User"
                    />
                  </div>

                  <div className="text-black">
                    <h6 className="text-sm font-medium ">Mariya Desoja</h6>
                    <p className="text-sm text-[#8A99AF]">
                      I like your confidence ....
                    </p>
                    <p className="text-xs text-blue-400 ">1 giờ trước</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </div>
  );
};

export default DropdownMessage;
