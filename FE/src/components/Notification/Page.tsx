import { Link } from "react-router-dom";
import { Query_notification } from "../../_lib/React_Query/Notification/Query"
import useLocalStorage from "../../common/hooks/Storage/useStorage";

export default function Notification() {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const role = user?.user?.role;

    const { data } = Query_notification(userId, role);

    return (
        <div className="space-y-4 text-sm">
            <strong className="text-lg">Thông báo của bạn</strong>
            {
                data?.notifications?.length > 0 ?
                    data?.notifications?.map((item: any) =>
                        <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden" open>
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                <h2 className="font-medium">{item?.userId?.userName}</h2>
                                <span className="relative size-5 shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="flex items-end justify-between gap-x-10">
                                <div>
                                    <p className="mt-4 leading-relaxed text-gray-700">
                                        {item?.message}
                                    </p>
                                    {
                                        item?.different &&
                                        <Link to={`/admin/orders/${item?.different}/orderDetali`} className="mt-4 leading-relaxed text-sky-500 underline">
                                            Chi tiết
                                        </Link>
                                    }
                                </div>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    {item?.createdAt?.slice(0, 10)}
                                </p>
                            </div>
                        </details>
                    )
                    :
                    <div className="grid place-items-center w-full h-[70vh]">
                        <span>Không có thông báo nào!</span>
                    </div>
            }
        </div>
    )
}
