import { useForm } from "react-hook-form";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import { Table } from "antd";
import { useEffect, useState } from "react";

import {
  Add_Address,
  List_Address,
} from "../../../components/common/Client/_component/Address";
import { Address, Chevron_right } from "../../../components/common/Client/_component/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import { nanoid } from "nanoid";
import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import { toast } from "react-toastify";
import { filter_positive_Stock_Item } from "../../../_lib/Config/Filter_stock_cart_and_order";
import { Mutation_Notification } from "../../../_lib/React_Query/Notification/Query";

const Pay = () => {
  const routing = useNavigate();
  const [user] = useLocalStorage("user", {});
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(false);
  const userId = user?.user?._id;

  const { data: auth } = List_Auth(userId);
  const { data, isPending } = List_Cart(userId);
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const { register, handleSubmit, setValue } = useForm();
  const { onSubmit, contextHolder, messageApi, isPending: loadingOrder } = Pay_Mutation();
  const { mutate } = Mutation_Notification('Add');

  useEffect(() => {
    if (!userId) {
      routing('/login')
    }
    if (item_order_checkked?.length < 1) {
      routing('/login')
    }
  }, [userId, routing])
  useEffect(() => {
    if (auth && auth?.address) {
      const defaultAddress = auth?.address?.find((item: any) => item.checked === true);
      const address = selectedAddress || defaultAddress;
      if (address) {
        setSelectedAddress(address);
        setValue("userName", address.fullName);
        setValue("phone", address.phoneNumber);
        setValue("email", auth.email);
        setValue("address", `${address.addressDetails} - ${address.address}`);
      }
    }
  }, [auth, selectedAddress, setValue]);
  const handleTAdd = () => {
    setAddress(!address);
    if (isOpen) setIsOpen(false);
    if (isOpen) setIsOpen(false);
  };

  const handleAddress = () => {
    setIsOpen(!isOpen);
    if (address) setAddress(false);
    if (address) setAddress(false);
  };
  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setIsOpen(false);
  };

  const item_order_checkked = data?.products?.filter((value: any) => value?.status_checked);

  const totalPrice = item_order_checkked?.reduce((a: any, curr: any) => (a + curr?.total_price_item), 0);
  const item_lon_hon_0 = filter_positive_Stock_Item(item_order_checkked);
  const dataSort = item_lon_hon_0?.map((order: any) => {
    return {
      key: order.productId._id,
      ...order
    }
  })
  // add order
  const onAddOrder = async (data_form: any) => {
    if (!data_form.address || data_form?.address.trim() === "") {
      messageApi.open({
        type: "warning",
        content: "Vui lòng chọn địa chỉ!",
      });
      return;
    }
    // validate stock 
    for (const i of item_order_checkked) {
      if (i?.productId?.attributes) {
        const check_color = i?.productId?.attributes?.values?.find((a: any) => a?.color === i?.color_item);
        const check_size = check_color?.size?.find((b: any) => (b?.name_size?.trim() ? b?.name_size : undefined) === i?.name_size);
        if (i?.quantity > check_size?.stock_attribute) {
          toast.error(`Sản phẩm ${i?.productId?.name_product} hiện tại 
          chỉ còn ${check_size?.stock_attribute}. Vui lòng giảm số lượng trước khi thanh toán!`, { autoClose: 1200 });
          return;
        }
      }
      else if (i?.quantity > i?.productId?.stock) {
        toast.error(`Sản phẩm ${i?.productId?.name_product} hiện tại 
          chỉ còn ${i?.productId?.stock}. Vui lòng giảm số lượng trước khi thanh toán!`, { autoClose: 1200 });
        return;
      }
    }
    const item_order = {
      userId: userId,
      items: item_order_checkked,
      customerInfo: {
        ...data_form
      },
      totalPrice: totalPrice,
      email: user?.user?.email,
    };

    try {
      if (data_form.payment === "VNPAY") {
        const orderId = JSON.parse(sessionStorage.getItem('item_order') as string);
        sessionStorage.setItem('customerInfo', JSON.stringify({ ...data_form }));
        const UrlPayment = await axios.post(`http://localhost:2004/api/v1/create_payment_url`, {
          orderId: nanoid(24),
          totalPrice: totalPrice,
          orderDescription: `Order ${orderId._id}`,
          language: 'vn'
        });
        sessionStorage.setItem('item_order', JSON.stringify(item_order));
        window.location.href = UrlPayment.data.paymentUrl;
      } else {
        onSubmit(item_order);
      }
      mutate({
        userId: userId,
        receiver_id: "duonghainam03012004@gmail.com",
        message: `Người dùng ${user?.user?.userName} đã đặt hàng`,
      });
    } catch (error) {
      console.error("Order Creation Error: ", error);
      messageApi.open({
        type: "error",
        content: "Lỗi tạo đơn hàng!",
      });
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'image_product',
      key: 'image_product',
      render: (_: any, order: any) => (
        <img src={order.productId.image_product} className="w-[70px] lg:w-[100px] lg:h-[100px]" alt="" />
      ),
    },
    {
      dataIndex: 'name_product',
      key: 'name_product',
      render: (_: any, order: any) => (
        <div className="lg:flex lg:items-center gap-10">
          <div>
            <h1 className="font-bold text-sm lg:text-base">{order?.productId?.name_product}</h1>
            {/* <p className="border border-stone-200 rounded my-1 lg:my-3 px-3 py-1 lg:py-2 lg:w-[220px] w-full text-xs lg:text-sm">
              Đổi trả miễn phí 15 ngày
            </p> */}
            <div className="flex justify-between md:hidden mt-2">
              <p className="text-sm lg:text-base">{order?.price_item?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}</p>
              <p className="text-sm lg:text-base">x {order?.quantity}</p>
            </div>
          </div>
          <p className="font-bold w-28 p-0 text-xs lg:text-sm mt-2 lg:mt-0">
            Loại: {order?.color_item} - {order?.name_size}
          </p>
        </div>
      ),
    },
    {
      dataIndex: 'price_product',
      key: 'price_product',
      render: (_: any, order: any) => (
        <p className="hidden lg:block text-sm lg:text-base">{order?.price_item?.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}</p>
      ),
    },
    {
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, order: any) => (
        <p className="hidden lg:block text-sm lg:text-base"> x {order?.quantity}</p>
      ),
    },
    {
      dataIndex: 'total_price_item',
      key: 'total_price_item',
      render: (_: any, order: any) => (
        <p className="font-bold hidden lg:block text-sm lg:text-base">
          {order?.total_price_item?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
    },
  ];
  if (loadingOrder || isPending) {
    return (
      <div className="fixed z-[10] bg-[#17182177] w-screen h-screen top-0 right-0 grid place-items-center">
        <div className="animate-spin">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-[1440px] w-[95vw] mx-auto">
        {contextHolder}
        <div className="mt-20">
          <div className="mb-6">
            <div className="flex items-center gap-3 bg-[#F5F5F5] py-6">
              <img
                src="../../src/assets/Images/Logo/logo.png"
                className="w-[50px] h-[50px]"
                alt=""
              />
              <span className="h-[50px] border-black border-r-2"></span>
              <h1 className="text-2xl font-bold">Thanh Toán</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit(onAddOrder)}>
            <div className="p-2 lg:py-6 lg:px-6 border rounded shadow-sm">
              <div className="flex gap-3">
                <Address />
                <p>Địa chỉ nhận hàng</p>
              </div>
              <div className="flex justify-between lg:justify-normal gap-12 flex-wrap pl-9">
                <div className="flex items-center gap-4">
                  {auth?.address.length === 0 ? ('Bạn hay thêm địa chỉ trước khi thanh toán') : (
                    <>
                      {selectedAddress === undefined ? ("Bạn cần chọn địa chỉ") : (
                        <>
                          {selectedAddress ? (
                            <div className="flex items-center gap-4">
                              <h1 className="font-bold">{selectedAddress?.fullName}</h1>
                              <p className="font-bold">{selectedAddress?.phoneNumber}</p>
                              <p>
                                {selectedAddress?.addressDetails + " - " + selectedAddress?.address}
                              </p>
                            </div>
                          ) : (
                            auth?.address?.map(
                              (item: any, index: any) =>
                                item.checked === true && (
                                  <div key={index} className="flex items-center gap-4">
                                    <h1 className="font-bold">{item?.fullName}</h1>
                                    <p className="font-bold">{item?.phoneNumber}</p>
                                    <p>
                                      {item?.addressDetails + " - " + item?.address}
                                    </p>
                                  </div>
                                )
                            ))}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-8">
                  {!selectedAddress?.checked === true ? ('') : (
                    <div className="border py-2 px-4 rounded border-black hidden lg:block">
                      Mặc định
                    </div>
                  )}
                  <div
                    className="text-blue-400 underline cursor-pointer"
                    onClick={handleAddress}
                  >
                    <span className="hidden lg:block">Thay đổi</span>
                    <span className="md:hidden block">
                      <Chevron_right />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-4 rounded shadow-sm">
              <Table columns={columns} dataSource={dataSort} pagination={false} />
              <div className="flex items-center justify-end gap-8 p-6">
                {/* <p>Tổng số tiền ( {calculateTotalProduct()} sản phẩm):</p> */}
                <p className="text-xl font-bold text-black">
                  <p>Tổng số tiền: {totalPrice?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}</p>
                </p>
              </div>
            </div>
            <div className="border mt-4 mb-8 rounded shadow-sm">
              <div className="border-b flex justify-between px-6 py-6">
                <p className="text-xl">Phương thức thanh toán</p>
                <div className="flex gap-8 items-center">
                  <select
                    className="border rounded p-2"
                    {...register("payment", { required: true })}
                  >
                    <option value="Thanh toán khi nhận hàng">
                      Thanh toán khi nhận hàng
                    </option>
                    <option value="VNPAY">Thanh toán qua VNPAY</option>
                    {/* <option value="MoMo">Thanh toán bằng MoMo</option> */}
                  </select>
                </div>
              </div>
              <div className="flex justify-end py-6 px-6 border-b">
                <div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Tổng tiền hàng</p>
                    <p>
                      {totalPrice?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Phí vận chuyển</p>
                    <p>0đ</p>
                  </div>
                  {/* <div className="flex justify-between py-3 gap-16">
                                        <p>Tổng cộng Voucher giảm giá:</p>
                                        <p>-₫50.000</p>
                                    </div> */}
                  <div className="flex justify-between py-3 gap-16">
                    <p>Tổng thanh toán</p>
                    <p className="text-xl font-bold text-black">
                      {totalPrice?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center py-6 px-6">
                {/* <p>
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <span className="text-blue-400">Điều khoản</span>
                </p> */}
                <button
                  className="w-[200px] py-3 bg-black text-white font-bold rounded"
                  type="submit"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </form >
          {address && <Add_Address handleAddress={handleAddress}></Add_Address>
          }
          {
            isOpen && (
              <List_Address
                auth={auth.address}
                handleTAdd={handleTAdd}
                handleAddressSelect={handleAddressSelect}
                handleAddress={handleAddress}
                selectedAddress={selectedAddress}
              ></List_Address>
            )
          }
        </div >

      </div >

    </>
  );
};

export default Pay;
