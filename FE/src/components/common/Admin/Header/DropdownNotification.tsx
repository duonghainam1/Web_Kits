import { useState } from "react";
import { Link } from "react-router-dom";
import { Query_notification } from "../../../../_lib/React_Query/Notification/Query";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const { data, isLoading } = Query_Orders()
  // console.log(data);
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data } = Query_notification(userId)
  console.log(data?.notifications?.length);

  // if (isLoading) return <div>Loading...</div>
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
            className="fill-[#677381] hover:fill-[#3C50E0] duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
              fill=""
            />
          </svg>
        </Link>
        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white right-0 w-[320px]`}
          >
            <div className="px-5 py-3">
              <h5 className="text-[14px] font-semibold text-[#8A99AF]">
                Thông Báo
              </h5>
            </div>
            <ul className="flex max-h-[300px] flex-col overflow-y-auto">
              {data?.notifications?.map((orders: any) => {
                return (
                  <li key={orders?._id}>
                    <div
                      className="flex flex-col gap-3 border-t border-stroke px-5 py-3 hover:bg-gray-2 "
                    >
                      <p className="text-sm text-black">
                        <span className="mt-[5px] text-[#8A99AF] mr-4">
                          Lý do:{orders?.message}
                        </span>
                        {
                          orders?.different &&
                          <Link to={`/admin/orders/${orders?.different}/orderDetali`} className="mt-4 leading-relaxed text-sky-500 underline">
                            Chi tiết
                          </Link>
                        }
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </li>
    </div>
  );
};

export default DropdownNotification;
