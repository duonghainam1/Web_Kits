// import { Link, useParams } from "react-router-dom";
// import instance from "../../../configs/axios";
// import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
// import {
//   Button,
//   Form,
//   message,
//   Modal,
//   Popconfirm,
//   Radio,
//   Table,
//   Timeline,
//   Upload,
// } from "antd";
// import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";
// import {
//   Mutation_Notification,
// <<<<<<< HEAD
//   Query_notification
// } from "../../../_lib/React_Query/Notification/Query";
// import useLocalStorage from "../../../common/hooks/Storage/useStorage";
// import { LeftOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { useListAllShipper } from "../../../common/hooks/Shipper/querry_shipper";
// import { Mutation_Shipper } from "../../../common/hooks/Shipper/mutation_shipper";
// =======
//   Query_notification,
// } from "../../../_lib/React_Query/Notification/Query";
// import useLocalStorage from "../../../common/hooks/Storage/useStorage";
// import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import { UploadFile } from "antd/es/upload/interface";
// import { UploadImage } from "../../../systems/utils/uploadImage";
// >>>>>>> main
// const OrdersDetali = () => {
//   const [user] = useLocalStorage("user", {});
//   const userId = user?.user?._id;
//   const [messageApi, contextHolder] = message.useMessage();
//   const { id } = useParams();
//   const [selectedReason, setSelectedReason] = useState("");
//   const { data, refetch } = Query_Orders(id);
//   const { data: no } = Query_notification();
//   const { mutate } = useOrderMutations("CONFIRM_CANCEL");
//   const { data: shipperData } = useListAllShipper();

//   const { mutate: AddShipper } = Mutation_Shipper("ADD");
//   const dispathNotification = Mutation_Notification("Add");
//   const { mutate: cancel } = useOrderMutations(
//     "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT"
//   );
//   const handleSelectShipper = (shipperId: string) => {
//     if (!id) return;
//     AddShipper(
//       { orderId: id, shipperId },
//       {
//         onSuccess: () => {
//           messageApi.success("Thêm shipper cho đơn hàng thành công!");
//         },
//         onError: () => {
//           messageApi.error("Thêm shipper thất bại!");
//         }
//       }
//     );
//   };
//   function yeu_cau(dataBody: {
//     id_item: string | number;
//     comfirm?: boolean | string;
//     numberOrder?: string | number;
//     action?: string;
//   }) {
//     mutate(dataBody);
//     dispathNotification?.mutate({
//       userId: userId,
//       receiver_id: data?.userId,
//       message: `Người bán đã ${
//         dataBody?.action === "xac_nhan" ? "xác nhận" : "từ chối"
//       } yêu cầu hủy đơn hàng ${dataBody?.numberOrder}`,
//       different: dataBody?.numberOrder
//       message: `Người bán đã ${dataBody?.action === "xac_nhan" ? "xác nhận" : "từ chối"
//         } yêu cầu hủy đơn hàng ${dataBody?.numberOrder}`,
//       different: dataBody?.numberOrder,
//     });
//   }
//   const reasons = ["Hết hàng", "Sai thông tin sản phẩm", "Giá nhập thay đổi"];
//   function huy_don(dataBody: {
//     id_item: string | number;
//     numberOrder?: string | number;
//     action?: string;
//     cancellationReason?: string;
//   }) {
//     dispathNotification?.mutate({
//       userId: userId,
//       receiver_id: data?.userId,
//       message: `Người bán đã hủy đơn ${dataBody?.numberOrder} với lí do ${dataBody?.cancellationReason}!`,
//       different: dataBody?.numberOrder
//     });
//     console.log(dataBody.cancellationReason);

//     cancel(dataBody);
//   }
//   const handleStatusUpdate = async (
//     status: number | string,
//     code_order?: string | number
//   ) => {
//     if (!data) return;
//     const message =
//       status === 2
//         ? `Người bán đã xác nhận đơn hàng ${code_order}`
//         : status === 3
//         ? `Người bán đã giao đơn hàng ${code_order} cho đơn vị vận chuyển!`
//         : `Người bán đã từ chối đơn hàng ${code_order}. Vui lòng chọn sản phẩm khác!`;
//     dispathNotification?.mutate({
//       userId: userId,
//       receiver_id: data?.userId,
//       message: message
//           ? `Người bán đã giao đơn hàng ${code_order} cho đơn vị vận chuyển!`
//           : status === 4
//             ? `Người Giao hàng đã giao đơn hàng ${code_order} thành công!`
//             : status === 7
//               ? `Người Giao hàng đã giao đơn hàng ${code_order} thất bại!`
//               : `Người bán đã từ chối đơn hàng ${code_order}. Vui lòng chọn sản phẩm khác!`;

//     dispathNotification?.mutate({
//       userId: userId,
//       receiver_id: data?.userId,
//       message: message,
//     });
//     try {
//       const response = await instance.patch(`/orders/${id}`, {
//         status: status,
//       });
//       messageApi.open({
//         type: "success",
//         content:
//           response.data.status === "4"
//             ? "Đơn hàng đã được giao"
//             : "Cập nhật trạng thái đơn hàng thành công!",
//       });
//       refetch();
//     } catch (error) {
//       messageApi.open({
//         type: "error",
//         content: "Cập nhật trạng thái đơn hàng thất bại!",
//       });
//     }
//   };
//   const cancellationRequested = data?.cancellationRequested;
//   const dataSort = data?.items?.map((item: any) => ({
//     key: item._id,
//     ...item,
//   }));
//   const formattedDate = data?.updatedAt
//     ? new Date(data.updatedAt).toLocaleString("vi-VN", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit"
//       })
//     : "";

//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//     : "";
//   const columns = [
//     {
//       title: "Ảnh Sản Phẩm",
//       dataIndex: "image_product",
//       key: "image_product",
//       render: (_: any, item: any) => (
//         <img
//           src={item?.productId?.image_product}
//           alt=""
//           className="w-[80px] h-[80px] object-cover "
//         />
//       ),
//     },
//     {
//       title: "Tên Sản Phẩm",
//       dataIndex: "name_product",
//       key: "name_product",
//       render: (_: any, item: any) => (
//         <div>
//           <p className="text-lg font-medium w-[80%]">
//             {item?.productId?.name_product}
//           </p>
//           <p className=" mt-1 font-medium text-[#0000008A]">
//             Loại: {item?.color_item} - {item?.name_size}
//           </p>
//         </div>
//       ),
//     },
//     {
//       title: "Giá Sản Phẩm",
//       dataIndex: "price_product",
//       key: "price_product",
//       render: (_: any, item: any) => (
//         <p className="">
//           {item?.price_item.toLocaleString("vi", {
//             style: "currency",
//             currency: "VND",
//           })}
//         </p>
//       ),
//     },
//     {
//       title: "Số Lượng",
//       dataIndex: "quantity",
//       key: "quantity",
//       render: (_: any, item: any) => (
//         <p className="text-center">{item?.quantity}</p>
//       ),
//     },
//     {
//       title: "Tổng Tiền",
//       dataIndex: "price_product",
//       key: "price_product",
//       render: (_: any, item: any) => (
//         <p>
//           {(item?.total_price_item).toLocaleString("vi", {
//             style: "currency",
//             currency: "VND",
//           })}
//         </p>
//       ),
//     },
//   ];
//   if (!data) return <p>Loading...</p>;

//   return (
//     <>
//       {contextHolder}
//       <div className="mx-6">
//         {" "}
//         <div className="flex items-center justify-between mb-5 mt-20 relative">
//           <Link
//             to="/admin/orders"
//             className="flex items-center gap-2 text-[#1B7EE2]"
//           >
//             <LeftOutlined />
//             <span>Quay lại</span>
//           </Link>
//           <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
//             Chi Tiết Đơn Hàng
//           </h1>
//         </div>
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Chọn Shipper</h2>
//           <div className="grid grid-cols-1 gap-4">
//             {shipperData?.map((shipper: any) => (
//               <div
//                 key={shipper._id}
//                 className="flex items-center bg-white p-4 rounded-lg shadow-md"
//               >
//                 <img
//                   src={shipper.avatar}
//                   alt="Shipper Avatar"
//                   className="w-12 h-12 rounded-full object-cover mr-4"
//                 />
//                 <div className="flex-1">
//                   <p className="text-lg font-medium">{shipper.fullName}</p>
//                   <p className="text-sm text-gray-500">{shipper.phone}</p>
//                 </div>
//                 <button
//                   onClick={() => handleSelectShipper(shipper._id)} // Chọn shipper và gọi hàm xử lý
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Chọn
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="my-6 shadow rounded bg-white">
//           <div className="p-4 text-black font-semibold">
//             Trạng thái đơn hàng
//           </div>
//           <div>
// <<<<<<< HEAD
//             {data?.status == 5 ? (
// =======
//             {data?.status == 7 ? (
// >>>>>>> main
//               <div className="flex flex-col justify-center items-center gap-7 py-4">
//                 <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
//                   Đã hủy
//                 </p>
//                 {no?.notifications.map((item: any) => {
//                   if (item?.different === data?.orderNumber) {
//                     return <p>Lý do: {item?.message}</p>;
//                   }
//                 })}
//               </div>
//             ) : (
//               <>
//                 <Timeline mode="alternate">
//                   {data?.status >= 1 && (
//                     <Timeline.Item color="gray">
//                       <p className="ant-typography ant-typography-secondary ant-typography-bold">
//                         Chờ xác nhận {formattedDate}
//                       </p>
//                     </Timeline.Item>
//                   )}
//                   {data?.status >= 2 && (
//                     <Timeline.Item color="yellow">
//                       <p className="ant-typography ant-typography-warning ant-typography-bold">
//                         Đang chuẩn bị hàng {formattedDate}
//                       </p>
//                     </Timeline.Item>
//                   )}
//                   {data?.status >= 3 && (
//                     <Timeline.Item color="blue">
//                       <p className="ant-typography ant-typography-primary ant-typography-bold">
//                         Đang vận chuyển {formattedDate}
//                       </p>
//                     </Timeline.Item>
//                   )}
//                   {/* Hiển thị "Giao hàng thành công" nếu không có trạng thái "Giao hàng thất bại" */}
//                   {data?.status >= 4 && data?.status < 7 && (
//                     <Timeline.Item color="green">
//                       <p className="ant-typography ant-typography-success ant-typography-bold">
//                         Giao hàng thành công {formattedDate}
//                       </p>
//                     </Timeline.Item>
//                   )}
//                   {/* Hiển thị "Giao hàng thất bại" nếu không có trạng thái "Giao hàng thành công" */}
//                   {data?.status >= 5 && (
//                     <Timeline.Item color="red">
//                       <p className="ant-typography ant-typography-danger ant-typography-bold">
//                         Giao hàng thất bại {formattedDate}
//                       </p>
//                     </Timeline.Item>
//                   )}
//                   {data?.status >= 6 && (
//                     <Timeline.Item color="green">
//                       <p className="ant-typography ant-typography-success ant-typography-bold">
//                         Hoàn thành {formattedDate}
//                       </p>
//                     </Timeline.Item>
//                   )}
//                 </Timeline>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="overflow-x-auto my-6 shadow  rounded">
//           <Table columns={columns} dataSource={dataSort} pagination={false} />
//           <div className="bg-white divide-y divide-gray-200">
//             {/* <div className="flex justify-between py-4">
//                         <p>Đơn vị vận chuyển</p>
//                         <p>Giao hàng tiết kiệm: 20000 đ</p>
//                     </div> */}
//             {/* <div className="flex gap-8 py-4">
//                         <span className="flex gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                                 className="lucide lucide-ticket text-orange-300">
//                                 <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
//                                 <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
//                             </svg>
//                             <p>Voucher</p>
//                         </span>
//                         <p>Mã voucher:</p>
//                     </div> */}
//             <p className="flex justify-end items-end p-4 text-[#0000008A]">
//               Tổng số tiền :
//               <span className="text-[#ee4d2d] pl-2 text-xl">
//                 {" "}
//                 {data.totalPrice.toLocaleString("vi", {
//                   style: "currency",
//                   currency: "VND",
//                 })}{" "}
//               </span>
//             </p>
//           </div>
//         </div>
//         <div className="bg-white overflow-x-auto my-6 shadow p-4 rounded">
//           <div className=" flex items-center gap-4  border-b pb-4">
//             <p className="text-black font-semibold">Phương thức thanh toán</p>
//             <p className="w-auto p-3 border-2 border-[#1B7EE2] text-[#1B7EE2] rounded">
//               {data?.status == 4
//                 ? "Đã thanh toán khi nhận hàng"
//                 : data?.customerInfo?.payment}
//             </p>
//           </div>
//           {/* <div className="flex items-center gap-4 border-b py-3">
//             <p className="text-black font-semibold w-[20%]">Trạng thái đơn hàng</p>
//             {data?.status == 1 ? (
//               <p className="w-auto p-3 border-2 border-gray-500 text-gray-500 rounded">
//                 Chờ xác nhận{" "}
//               </p>
//             ) : data?.status == 2 ? (
//               <p className="w-auto p-3 border-2 border-yellow-500 text-yellow-500 rounded">
//                 Đang chuẩn bị hàng
//               </p>
//             ) : data?.status == 3 ? (
//               <p className="w-auto p-3 border-2 border-blue-500 text-blue-500 rounded">
//                 Đang vận chuyển
//               </p>
//             ) : data?.status == 4 ? (
//               <p className="w-auto p-3 border-2 border-green-600 text-green-600 rounded">
//                 Đang giao hàng
//               </p>
//             ) : (
//               <div className="flex items-center justify-between w-full">
//                 <p className="w-auto p-3 border-2 border-red-600 text-red-600 rounded">
//                   Đã hủy
//                 </p>
//               </div>
//             )}
//             <div className="flex gap-2">
//               {data?.status == 5 ? (
//                 <div className="flex justify-between items-center gap-7">
//                   <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
//                     Đã hủy
//                   </p>
//                   {no?.notifications.map((item: any) => {
//                     if (item?.different === data?.orderNumber) {
//                       return (
//                         <p>Lý do: {item?.message}</p>
//                       )
//                     }
//                     console.log(item);

//                   })
//                   }
//                 </div>
//               ) : (
//                 <>
//                   <p
//                     className={`w-auto p-3 border-2 ${data?.status >= 1 ? "border-gray-500 text-gray-500 font-bold" : "border-gray-200 text-gray-200"
//                       } rounded`}
//                   >
//                     Chờ xác nhận
//                   </p>
//                   <p
//                     className={`w-auto p-3 border-2 ${data?.status >= 2 ? "border-yellow-500 text-yellow-500 font-bold" : "border-yellow-200 text-yellow-200"
//                       } rounded`}
//                   >
//                     Đang chuẩn bị hàng
//                   </p>
//                   <p
//                     className={`w-auto p-3 border-2 ${data?.status >= 3 ? "border-blue-500 text-blue-500 font-bold" : "border-blue-200 text-blue-200"
//                       } rounded`}
//                   >
//                     Đang vận chuyển
//                   </p>
//                   <p
//                     className={`w-auto p-3 border-2 ${data?.status >= 4 ? "border-green-600 text-green-600 font-bold" : "border-green-200 text-green-200"
//                       } rounded`}
//                   >
//                     Đang giao hàng
//                   </p>
//                 </>
//               )}
//             </div>
//           </div> */}
//           <div className="flex justify-between my-4">
//             <div className="flex gap-6">
//               <div className="flex-1">
//                 <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Tên khách hàng</span>
//                   <span>:</span>
//                 </p>
//                 <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Số điện thoại</span>
//                   <span>:</span>
//                 </p>
//                 <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Địa chỉ Email</span>
//                   <span>:</span>
//                 </p>
//                 <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Địa chỉ khách hàng</span>
//                   <span>:</span>
//                 </p>
//               </div>

//               <div className="flex-1">
//                 <p className="py-2 text-gray-800">
//                   {data?.customerInfo?.userName}
//                 </p>
//                 <p className="py-2 text-gray-800">
//                   {data?.customerInfo?.phone}
//                 </p>
//                 <p className="py-2 text-gray-800">
//                   {data?.customerInfo?.email}
//                 </p>
//                 <p className="py-2 text-gray-800 w-[500px]">
//                   {data?.customerInfo?.address}
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-6">
//               <div className="flex-1 ">
//                 <p className="flex w-[150px] justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Tổng tiền hàng</span>
//                   <span>:</span>
//                 </p>
//                 <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Phí vận chuyển</span>
//                   <span>:</span>
//                 </p>
//                 <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
//                   <span className="font-semibold">Tổng thanh toán</span>
//                   <span>:</span>
//                 </p>
//               </div>
//               <div className="flex-1">
//                 <p className="py-2 text-gray-800">
//                   {data?.totalPrice.toLocaleString("vi", {
//                     style: "currency",
//                     currency: "VND",
//                   })}
//                 </p>
//                 <p className="py-2 text-gray-800">0 đ</p>
//                 <p className="py-2 text-[#ee4d2d] text-xl">
//                   {data?.totalPrice?.toLocaleString("vi", {
//                     style: "currency",
//                     currency: "VND",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-5 justify-center mt-[60px]">
//             {data.status === "1" && (
//               <>
//                 <Popconfirm
//                   title="Xác nhận đơn hàng?"
//                   description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
//                   onConfirm={() => handleStatusUpdate(2, data?.orderNumber)}
//                   okText="Xác nhận"
//                   cancelText="Không"
//                 >
//                   <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
//                     Xác nhận
//                   </button>
//                 </Popconfirm>
//                 <Popconfirm
//                   title="Từ chối xác nhận?"
//                   description={
//                     <div>
//                       <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
//                       <div>
//                         <p>Chọn lý do hủy:</p>
//                         <Radio.Group
//                           className="flex flex-col gap-2"
//                           onChange={(e) => setSelectedReason(e.target.value)}
//                         >
//                           {reasons.map((reason, index) => (
//                             <Radio key={index} value={reason}>
//                               {reason}
//                             </Radio>
//                           ))}
//                         </Radio.Group>
//                       </div>
//                     </div>
//                   }
//                   onConfirm={() =>
//                     huy_don({
//                       id_item: data?._id,
//                       action: "huy",
//                       cancellationReason: selectedReason,
// <<<<<<< HEAD
//                       numberOrder: data?.orderNumber
//                       // linkUri: items?._id,
// =======
//                       numberOrder: data?.orderNumber,
// >>>>>>> main
//                     })
//                   }
//                   okText="Từ chối"
//                   cancelText="Không"
//                 >
//                   <button className="w-auto p-3 bg-red-500 rounded text-white">
//                     Từ chối
//                   </button>
//                 </Popconfirm>
//               </>
//             )}
//             {data.status === "2" && (
//               <>
//                 {cancellationRequested ? (
//                   <>
//                     <Popconfirm
//                       title="Xác nhận hủy đơn hàng?"
//                       description="Bạn có chắc chắn muốn hủy đơn hàng này?"
//                       onConfirm={() =>
//                         yeu_cau({
//                           id_item: data?._id,
//                           confirm: true,
//                           numberOrder: data?.orderNumber,
// <<<<<<< HEAD
//                           action: "xac_nhan"
// =======
//                           action: "xac_nhan",
// >>>>>>> main
//                         })
//                       }
//                       okText="Xác nhận"
//                       cancelText="Không"
//                     >
//                       <button className="w-auto p-3 bg-green-500 rounded text-white">
//                         Xác nhận yêu cầu
//                       </button>
//                     </Popconfirm>
//                     <Popconfirm
//                       title="Từ chối hủy đơn hàng?"
//                       description="Bạn có chắc chắn muốn từ chối hủy đơn hàng này?"
//                       onConfirm={() =>
//                         yeu_cau({
//                           id_item: data?._id,
//                           confirm: false,
//                           numberOrder: data?.orderNumber,
// <<<<<<< HEAD
//                           action: "tu_choi"
// =======
//                           action: "tu_choi",
// >>>>>>> main
//                         })
//                       }
//                       okText="Từ chối"
//                       cancelText="Không"
//                     >
//                       <button className="w-auto p-3 bg-red-500 rounded text-white">
//                         Từ chối yêu cầu
//                       </button>
//                     </Popconfirm>
//                   </>
//                 ) : (
//                   <Popconfirm
//                     title="Xác nhận đơn hàng?"
//                     description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
//                     onConfirm={() => handleStatusUpdate(3, data?.orderNumber)}
//                     okText="Xác nhận"
//                     cancelText="Không"
//                   >
//                     <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
//                       Xác nhận vận chuyển
//                     </button>
//                   </Popconfirm>
//                 )}
//               </>
//             )}
//             {data.status === "3" && (
// <<<<<<< HEAD
//               <Popconfirm
//                 title="Xác nhận đơn hàng?"
//                 description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
//                 okText="Xác nhận"
//                 cancelText="Không"
//               >
//                 <button
//                   className="w-auto p-3 bg-gray-300 rounded text-white cursor-not-allowed"
//                   disabled
//                 >
//                   Đang vận chuyển
//                 </button>
//               </Popconfirm>
// =======
//               <>
//                 <Button
//                   type="primary"
//                   onClick={() => {
//                     setOrderId(data._id);
//                     setDeliverSuccessModalVisible(true);
//                   }}
//                 >
//                   Giao Hàng Thành Công
//                 </Button>
//                 <Button
//                   type="default"
//                   onClick={() => handleStatusUpdate(5, data.order_number)}
//                 >
//                   Giao Hàng Thất Bại
//                 </Button>
//               </>
// >>>>>>> main
//             )}
//             {data.status === "4" && (
//               <button
//                 className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
//                 disabled
//               >
//                 Giao hàng thành công
//               </button>
//             )}
//             {data.status === "5" && (
//               <button
//                 className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
//                 disabled
//               >
//                 Giao hàng thất bại
//               </button>
//             )}
//             {data.status === "6" && (
//               <button
//                 className="w-auto p-3 bg-green-600 rounded text-white cursor-not-allowed"
//                 disabled
//               >
//                 Đã hoàn thành
//               </button>
//             )}
//             {data.status === "7" && (
//               <button
//                 className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
//                 disabled
//               >
//                 Đơn hàng đã bị hủy
//               </button>
//             )}
//           </div>
//           <Modal
//             title="Xác Nhận Giao Hàng Thành Công"
//             visible={isDeliverSuccessModalVisible}
//             onOk={handleDeliverSuccess}
//             onCancel={() => setDeliverSuccessModalVisible(false)}

//           >
//             <Form.Item
//               name="confirmationImage"
//               label="Ảnh Xác Nhận"
//               rules={[
//                 { required: true, message: "Vui lòng chọn ảnh xác nhận" },
//               ]}
//             >
//               <Upload
//                 listType="picture"
//                 beforeUpload={() => false} // Không tự động upload
//                 onChange={handleFileChange}
//                 fileList={fileList}
//                 maxCount={1} // Chỉ cho phép chọn 1 ảnh
//                 accept="image/*"
//                 showUploadList={false} // Không hiển thị tên file đã chọn
//               >
//                 <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
//               </Upload>

//               {/* Hiển thị ảnh preview nếu có */}
//               {previewImage && (
//                 <div style={{ marginTop: 16 }}>
//                   <img
//                     src={previewImage}
//                     alt="Ảnh Xác Nhận"
//                     style={{
//                       width: "40%",
//                       maxHeight: 200,
//                       objectFit: "cover",
//                       border: "1px solid black",
//                     }}
//                   />
//                 </div>
//               )}
//             </Form.Item>
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrdersDetali;
import { Link, useParams } from "react-router-dom";
import instance from "../../../configs/axios";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
import {
  Button,
  Form,
  message,
  Modal,
  Popconfirm,
  Radio,
  Table,
  Timeline,
  Upload
} from "antd";
import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";
import {
  Mutation_Notification,
  Query_notification
} from "../../../_lib/React_Query/Notification/Query";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd/es/upload/interface";
import { UploadImage } from "../../../systems/utils/uploadImage";
import { Mutation_Shipper } from "../../../common/hooks/Shipper/mutation_shipper";
import { useListAllShipper } from "../../../common/hooks/Shipper/querry_shipper";
const OrdersDetali = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const role = user?.user?.role;
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [selectedReason, setSelectedReason] = useState("");
  const { data, refetch } = Query_Orders(id);
  const { data: no } = Query_notification(userId, role);
  const { mutate } = useOrderMutations("CONFIRM_CANCEL");
  const dispathNotification = Mutation_Notification("Add");
  const { mutate: cancel } = useOrderMutations(
    "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT"
  );

  const { mutate: failDelivery } = useOrderMutations("FAIL_DELIVERY");
  const [orderData, setOrderData] = useState<any>(null);
  const [isDeliverSuccessModalVisible, setDeliverSuccessModalVisible] =
    useState(false);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Để hiển thị ảnh đã chọn
  const [orderId, setOrderId] = useState<string | null>(null);
  const { mutate: AddShipper } = Mutation_Shipper("ADD");
  const { data: shipperData } = useListAllShipper();
  const [selectedShipper, setSelectedShipper] = useState<string | null>(null);
  const handleSelectShipper = (shipperId: string) => {
    setSelectedShipper(shipperId);
    if (!id) return;
    AddShipper(
      { orderId: id, shipperId },
      {
        onSuccess: () => {
          messageApi.success("Thêm shipper cho đơn hàng thành công!");
        },
        onError: () => {
          messageApi.error("Thêm shipper thất bại!");
        }
      }
    );
  };
  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = ({ fileList }: { fileList: UploadFile<any>[] }) => {
    // Chỉ cho phép một ảnh duy nhất
    setFileList(fileList.slice(-1));

    // Lấy URL của ảnh để hiển thị trong preview
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl); // Cập nhật ảnh preview
    } else {
      setPreviewImage(null);
    }
  };

  // Hàm xử lý khi nhấn "Xác Nhận"
  const handleDeliverSuccess = async () => {
    if (!orderId) {
      console.error("Order ID is missing");
      return;
    }

    const file = fileList.length > 0 ? fileList[0].originFileObj : null;

    try {
      // Nếu có file, tải ảnh lên và nhận URL
      let imageUrl = null;
      if (file) {
        imageUrl = await UploadImage(file);
      }

      // Cập nhật trạng thái đơn hàng thành công
      await instance.post("/deliver-success", {
        orderId,
        confirmationImage: imageUrl
      });
      handleStatusUpdate(4, data?.orderNumber);
      refetch();

      messageApi.success("Đơn hàng đã được đánh dấu là giao hàng thành công.");
      setDeliverSuccessModalVisible(false);
    } catch (error) {
      messageApi.error("Giao hàng thành công thất bại. Vui lòng thử lại.");
      console.error("Failed to mark order as delivered", error);
    }
  };
  function yeu_cau(dataBody: {
    id_item: string | number;
    comfirm?: boolean | string;
    numberOrder?: string | number;
    action?: string;
  }) {
    mutate(dataBody);
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: `Người bán đã ${dataBody?.action === "xac_nhan" ? "xác nhận" : "từ chối"
        } yêu cầu hủy đơn hàng ${dataBody?.numberOrder}`,
      different: dataBody?.numberOrder
    });
  }
  const reasons = ["Hết hàng", "Sai thông tin sản phẩm", "Giá nhập thay đổi"];
  function huy_don(dataBody: {
    id_item: string | number;
    numberOrder?: string | number;
    action?: string;
    cancellationReason?: string;
  }) {
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: `Người bán đã hủy đơn ${dataBody?.numberOrder} với lí do ${dataBody?.cancellationReason}!`,
      different: dataBody?.numberOrder
    });
    console.log(dataBody.cancellationReason);

    cancel(dataBody);
  }
  const reason = [
    "Người nhận không nghe máy",
    "Hoàn hàng",
    "Đơn hàng quá 3 ngày"
  ];
  function giao_hang_that_bai(dataBody: {
    id_item: string | number;
    numberOrder?: string | number;
    action?: string;
    cancellationReason?: string;
  }) {
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: `Người giao hàng đã giao hàng đơn hàng  ${dataBody?.numberOrder} thất bại với lí do ${dataBody?.cancellationReason}!`,
      different: dataBody?.numberOrder
    });
    console.log(dataBody.cancellationReason);

    failDelivery(dataBody);
  }

  const handleStatusUpdate = async (
    status: number | string,
    code_order?: string | number
  ) => {
    if (!data) return;
    const message =
      status === 2
        ? `Người bán đã xác nhận đơn hàng ${code_order}`
        : status === 3
          ? `Người bán đã giao đơn hàng ${code_order} cho đơn vị vận chuyển!`
          : status === 4
            ? `Đã giao đơn hàng ${code_order} thành công!. Vui lòng ấn đã nhận hàng!`
            : status === 5
              ? `Người Giao hàng đã giao đơn hàng ${code_order} thất bại!`
              : status === 6
                ? `Đã giao đơn hàng ${code_order} thành công!`
                : `Người bán đã từ chối đơn hàng ${code_order}. Vui lòng chọn sản phẩm khác!`;

    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: message
    });
    try {
      const response = await instance.patch(`/orders/${id}`, {
        status: status
      });
      messageApi.open({
        type: "success",
        content:
          response.data.status === "6"
            ? "Đơn hàng đã được giao"
            : "Cập nhật trạng thái đơn hàng thành công!"
      });
      refetch();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Cập nhật trạng thái đơn hàng thất bại!"
      });
    }
  };
  const cancellationRequested = data?.cancellationRequested;
  const dataSort = data?.items?.map((item: any) => ({
    key: item._id,
    ...item
  }));
  const formattedDate = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
    : "";
  const columns = [
    {
      title: "Ảnh Sản Phẩm",
      dataIndex: "image_product",
      key: "image_product",
      render: (_: any, item: any) => (
        <img
          src={item?.productId?.image_product}
          alt=""
          className="w-[80px] h-[80px] object-cover "
        />
      )
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name_product",
      key: "name_product",
      render: (_: any, item: any) => (
        <div>
          <p className="text-lg font-medium w-[80%]">
            {item?.productId?.name_product}
          </p>
          <p className=" mt-1 font-medium text-[#0000008A]">
            Loại: {item?.color_item} - {item?.name_size}
          </p>
        </div>
      )
    },
    {
      title: "Giá Sản Phẩm",
      dataIndex: "price_product",
      key: "price_product",
      render: (_: any, item: any) => (
        <p className="">
          {item?.price_item.toLocaleString("vi", {
            style: "currency",
            currency: "VND"
          })}
        </p>
      )
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, item: any) => (
        <p className="text-center">{item?.quantity}</p>
      )
    },
    {
      title: "Tổng Tiền",
      dataIndex: "price_product",
      key: "price_product",
      render: (_: any, item: any) => (
        <p>
          {(item?.total_price_item).toLocaleString("vi", {
            style: "currency",
            currency: "VND"
          })}
        </p>
      )
    }
  ];
  if (!data) return <p>Loading...</p>;

  return (
    <>
      {contextHolder}
      <div className="mx-6">
        {" "}
        <div className="flex items-center justify-between mb-5 mt-20 relative">
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 text-[#1B7EE2]"
          >
            <LeftOutlined />
            <span>Quay lại</span>
          </Link>
          <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
            Chi Tiết Đơn Hàng
          </h1>
        </div>
        {data?.status == 2 ? (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Chọn Shipper</h2>
            <div className="grid grid-cols-1 gap-4">
              {shipperData?.map((shipper: any) => (
                <div
                  key={shipper._id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={shipper.avatar}
                    alt="Shipper Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-medium">{shipper.fullName}</p>
                    <p className="text-sm text-gray-500">{shipper.phone}</p>
                  </div>
                  <button
                    onClick={() => handleSelectShipper(shipper._id)}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${selectedShipper === shipper._id ? "bg-green-500" : ""
                      }`}
                  >
                    {selectedShipper === shipper._id ? "Đã chọn" : "Chọn"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          data?.status >= 2 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Thông tin Shipper</h2>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <img
                  src={data?.shipperId?.avatar}
                  alt="Shipper Avatar"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">
                    {data?.shipperId?.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.shipperId?.phone}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
        <div className="my-6 shadow rounded bg-white">
          <div className="p-4 text-black font-semibold">
            Trạng thái đơn hàng
          </div>
          <div>
            {data?.status == 7 ? (
              <div className="flex flex-col justify-center items-center gap-7 py-4">
                <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
                  Đã hủy
                </p>
                {no?.notifications.map((item: any) => {
                  if (item?.different == data?.orderNumber) {
                    return <p>Lý do: {item?.message}</p>;
                  }
                })}
              </div>
            ) : data?.status == 5 ? (
              <div className="flex flex-col justify-center items-center gap-7 py-4">
                <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
                  Giao Hàng thất bại
                </p>
                {no?.notifications?.map((item: any) => {
                  console.log(item);

                  if (item?.different === data?.orderNumber) {
                    return <p>Lý do: {item?.message}</p>;
                  }
                })}
              </div>
            ) : (
              <>
                <Timeline mode="alternate">
                  {data?.status >= 1 && (
                    <Timeline.Item color="gray">
                      <p className="ant-typography ant-typography-secondary ant-typography-bold">
                        Chờ xác nhận {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {data?.status >= 2 && (
                    <Timeline.Item color="yellow">
                      <p className="ant-typography ant-typography-warning ant-typography-bold">
                        Đang chuẩn bị hàng {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {data?.status >= 3 && (
                    <Timeline.Item color="blue">
                      <p className="ant-typography ant-typography-primary ant-typography-bold">
                        Đang vận chuyển {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {/* Hiển thị "Giao hàng thành công" nếu không có trạng thái "Giao hàng thất bại" */}
                  {data?.status >= 4 && data?.status < 5 && (
                    <Timeline.Item color="green">
                      <p className="ant-typography ant-typography-success ant-typography-bold">
                        Giao hàng thành công {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {/* Hiển thị "Giao hàng thất bại" nếu không có trạng thái "Giao hàng thành công" */}
                  {/* {data?.status >= 5 && (
                    <Timeline.Item color="red">
                      <p className="ant-typography ant-typography-danger ant-typography-bold">
                        Giao hàng thất bại {formattedDate}
                      </p>
                    </Timeline.Item>
                  )} */}
                  {data?.status >= 6 && (
                    <Timeline.Item color="green">
                      <p className="ant-typography ant-typography-success ant-typography-bold">
                        Hoàn thành {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                </Timeline>
              </>
            )}
          </div>
        </div>
        <div className="overflow-x-auto my-6 shadow  rounded">
          <Table columns={columns} dataSource={dataSort} pagination={false} />
          <div className="bg-white divide-y divide-gray-200">
            {/* <div className="flex justify-between py-4">
                        <p>Đơn vị vận chuyển</p>
                        <p>Giao hàng tiết kiệm: 20000 đ</p>
                    </div> */}
            {/* <div className="flex gap-8 py-4">
                        <span className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-ticket text-orange-300">
                                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                                <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
                            </svg>
                            <p>Voucher</p>
                        </span>
                        <p>Mã voucher:</p>
                    </div> */}
            <p className="flex justify-end items-end p-4 text-[#0000008A]">
              Tổng số tiền :
              <span className="text-[#ee4d2d] pl-2 text-xl">
                {" "}
                {data.totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND"
                })}{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="bg-white overflow-x-auto my-6 shadow p-4 rounded">
          <div className=" flex items-center gap-4  border-b pb-4">
            <p className="text-black font-semibold">Phương thức thanh toán</p>
            <p className="w-auto p-3 border-2 border-[#1B7EE2] text-[#1B7EE2] rounded">
              {data?.status == 6
                ? "Đã thanh toán khi nhận hàng"
                : data?.customerInfo?.payment}
            </p>
          </div>
          {/* <div className="flex items-center gap-4 border-b py-3">
            <p className="text-black font-semibold w-[20%]">Trạng thái đơn hàng</p>
            {data?.status == 1 ? (
              <p className="w-auto p-3 border-2 border-gray-500 text-gray-500 rounded">
                Chờ xác nhận{" "}
              </p>
            ) : data?.status == 2 ? (
              <p className="w-auto p-3 border-2 border-yellow-500 text-yellow-500 rounded">
                Đang chuẩn bị hàng
              </p>
            ) : data?.status == 3 ? (
              <p className="w-auto p-3 border-2 border-blue-500 text-blue-500 rounded">
                Đang vận chuyển
              </p>
            ) : data?.status == 4 ? (
              <p className="w-auto p-3 border-2 border-green-600 text-green-600 rounded">
                Đang giao hàng
              </p>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="w-auto p-3 border-2 border-red-600 text-red-600 rounded">
                  Đã hủy
                </p>
              </div>
            )}
            <div className="flex gap-2">
              {data?.status == 5 ? (
                <div className="flex justify-between items-center gap-7">
                  <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
                    Đã hủy
                  </p>
                  {no?.notifications.map((item: any) => {
                    if (item?.different === data?.orderNumber) {
                      return (
                        <p>Lý do: {item?.message}</p>
                      )
                    }
                    console.log(item);

                  })
                  }
                </div>
              ) : (
                <>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 1 ? "border-gray-500 text-gray-500 font-bold" : "border-gray-200 text-gray-200"
                      } rounded`}
                  >
                    Chờ xác nhận
                  </p>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 2 ? "border-yellow-500 text-yellow-500 font-bold" : "border-yellow-200 text-yellow-200"
                      } rounded`}
                  >
                    Đang chuẩn bị hàng
                  </p>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 3 ? "border-blue-500 text-blue-500 font-bold" : "border-blue-200 text-blue-200"
                      } rounded`}
                  >
                    Đang vận chuyển
                  </p>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 4 ? "border-green-600 text-green-600 font-bold" : "border-green-200 text-green-200"
                      } rounded`}
                  >
                    Đang giao hàng
                  </p>
                </>
              )}
            </div>
          </div> */}
          <div className="flex justify-between my-4">
            <div className="flex gap-6">
              <div className="flex-1">
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Tên khách hàng</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Số điện thoại</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Địa chỉ Email</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Địa chỉ khách hàng</span>
                  <span>:</span>
                </p>
              </div>

              <div className="flex-1">
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.userName}
                </p>
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.phone}
                </p>
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.email}
                </p>
                <p className="py-2 text-gray-800 w-[500px]">
                  {data?.customerInfo?.address}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 ">
                <p className="flex w-[150px] justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Tổng tiền hàng</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Phí vận chuyển</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Tổng thanh toán</span>
                  <span>:</span>
                </p>
              </div>
              <div className="flex-1">
                <p className="py-2 text-gray-800">
                  {data?.totalPrice.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
                <p className="py-2 text-gray-800">0 đ</p>
                <p className="py-2 text-[#ee4d2d] text-xl">
                  {data?.totalPrice?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-center mt-[60px]">
            {data.status === "1" && (
              <>
                <Popconfirm
                  title="Xác nhận đơn hàng?"
                  description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                  onConfirm={() => handleStatusUpdate(2, data?.orderNumber)}
                  okText="Xác nhận"
                  cancelText="Không"
                >
                  <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
                    Xác nhận
                  </button>
                </Popconfirm>
                <Popconfirm
                  title="Từ chối xác nhận?"
                  description={
                    <div>
                      <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                      <div>
                        <p>Chọn lý do hủy:</p>
                        <Radio.Group
                          className="flex flex-col gap-2"
                          onChange={(e) => setSelectedReason(e.target.value)}
                        >
                          {reasons.map((reason, index) => (
                            <Radio key={index} value={reason}>
                              {reason}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </div>
                    </div>
                  }
                  onConfirm={() => {
                    if (!selectedReason) {
                      messageApi.warning("Vui lòng chọn lý do hủy!");
                      return
                    }
                    huy_don({
                      id_item: data?._id,
                      action: "huy",
                      cancellationReason: selectedReason,
                      numberOrder: data?.orderNumber
                    })
                  }
                  }

                  okText="Từ chối"
                  cancelText="Không"
                >
                  <button className="w-auto p-3 bg-red-500 rounded text-white">
                    Từ chối
                  </button>
                </Popconfirm>
              </>
            )}
            {data.status === "2" && (
              <>
                {cancellationRequested ? (
                  <>
                    <Popconfirm
                      title="Xác nhận hủy đơn hàng?"
                      description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                      onConfirm={() =>
                        yeu_cau({
                          id_item: data?._id,
                          confirm: true,
                          numberOrder: data?.orderNumber,
                          action: "xac_nhan"
                        })
                      }
                      okText="Xác nhận"
                      cancelText="Không"
                    >
                      <button className="w-auto p-3 bg-green-500 rounded text-white">
                        Xác nhận yêu cầu
                      </button>
                    </Popconfirm>
                    <Popconfirm
                      title="Từ chối hủy đơn hàng?"
                      description="Bạn có chắc chắn muốn từ chối hủy đơn hàng này?"
                      onConfirm={() =>
                        yeu_cau({
                          id_item: data?._id,
                          confirm: false,
                          numberOrder: data?.orderNumber,
                          action: "tu_choi"
                        })
                      }
                      okText="Từ chối"
                      cancelText="Không"
                    >
                      <button className="w-auto p-3 bg-red-500 rounded text-white">
                        Từ chối yêu cầu
                      </button>
                    </Popconfirm>
                  </>
                ) : (
                  <Popconfirm
                    title="Xác nhận đơn hàng?"
                    description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                    onConfirm={() => {
                      if (!selectedShipper) {
                        messageApi.error(
                          "Vui lòng chọn shipper trước khi xác nhận!"
                        );
                        return;
                      }
                      handleStatusUpdate(3, data?.orderNumber); // Xác nhận khi đã có shipper
                    }}
                    okText="Xác nhận"
                    cancelText="Không"
                  >
                    <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
                      Xác nhận vận chuyển
                    </button>
                  </Popconfirm>
                )}
              </>
            )}
            {data.status === "3" && (
              <>
                <Button
                  className="w-52 bg-blue-500 rounded text-white"
                  type="primary"
                  onClick={() => {
                    setOrderId(data._id);
                    setDeliverSuccessModalVisible(true);
                  }}
                >
                  Giao Hàng Thành Công
                </Button>

                <Popconfirm
                  title="Xác nhận giao hàng thất bại?"
                  description={
                    <div>
                      <p>
                        Bạn có chắc chắn muốn xác nhận đơn hàng này thất bại ko?
                      </p>
                      <div>
                        <p>Chọn lý do giao hàng thất bại:</p>
                        <Radio.Group
                          className="flex flex-col gap-2"
                          onChange={(e) => setSelectedReason(e.target.value)}
                        >
                          {reason.map((reason, index) => (
                            <Radio key={index} value={reason}>
                              {reason}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </div>
                    </div>
                  }
                  onConfirm={() =>
                    giao_hang_that_bai({
                      id_item: data?._id,
                      action: "huy",
                      cancellationReason: selectedReason,
                      numberOrder: data?.orderNumber
                    })
                  }
                  okText="Xác Nhận"
                  cancelText="Không"
                >
                  <button className="w-52 bg-red-500 rounded text-white">
                    Giao Hàng Thất Bại
                  </button>
                </Popconfirm>
              </>
            )}
            {data.status === "4" && (
              <button
                className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
                disabled
              >
                Giao hàng thành công
              </button>
            )}
            {data.status === "5" && (
              <button
                className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
                disabled
              >
                Giao hàng thất bại
              </button>
            )}
            {data.status === "6" && (
              <button
                className="w-auto p-3 bg-green-600 rounded text-white cursor-not-allowed"
                disabled
              >
                Đã hoàn thành
              </button>
            )}
            {data.status === "7" && (
              <button
                className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
                disabled
              >
                Đơn hàng đã bị hủy
              </button>
            )}
          </div>
          <Modal
            title="Xác Nhận Giao Hàng Thành Công"
            visible={isDeliverSuccessModalVisible}
            onOk={handleDeliverSuccess}
            onCancel={() => setDeliverSuccessModalVisible(false)}
          >
            <Form.Item
              name="confirmationImage"
              label="Ảnh Xác Nhận"
              rules={[
                { required: true, message: "Vui lòng chọn ảnh xác nhận" }
              ]}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false} // Không tự động upload
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1} // Chỉ cho phép chọn 1 ảnh
                accept="image/*"
                showUploadList={false} // Không hiển thị tên file đã chọn
              >
                <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
              </Upload>

              {/* Hiển thị ảnh preview nếu có */}
              {previewImage && (
                <div style={{ marginTop: 16 }}>
                  <img
                    src={previewImage}
                    alt="Ảnh Xác Nhận"
                    style={{
                      width: "40%",
                      maxHeight: 200,
                      objectFit: "cover",
                      border: "1px solid black"
                    }}
                  />
                </div>
              )}
            </Form.Item>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default OrdersDetali;
