import { Link, useParams } from "react-router-dom";
import { Query_Orders } from "../../../../common/hooks/Order/querry_Order";
const OrderDetail = () => {
  const { id } = useParams();
  const { data } = Query_Orders(id)
  console.log(data);

  const formatDate = (datetime: any) => {
    if (!datetime) return ""; // Bảo vệ trường hợp datetime không tồn tại
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Lấy ngày tháng năm
  };
  const getStatusClass = (status: number) => {
    return data?.status >= status ? "font-bold text-blue-500" : "";
  };
  return (
    <>
      <div className=" shadow-lg">
        <div className="border-b">
          <div className="flex justify-between px-5 py-4">
            <Link to="/profile/list_order">
              <div className="flex gap-2 items-center *:text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <p>Trở lại</p>
              </div>
            </Link>
            <div className="flex gap-3 items-center">
              <p>Mã đơn hàng: <span className="font-bold">{data?.orderNumber}</span></p>
              <p className="border-l-2 pl-3">{data?.status == 1 ? "Chờ xác nhận" :
                data?.status == 2 ? "Đang chuẩn bị hàng" :
                  data?.status == 3 ? "Đang vận chuyển" :
                    data?.status == 4 ? "Đã giao hàng" :
                      data?.status == 5 ? "Giao hàng thất bại" :
                        data?.status == 6 ? "Hoàn thành" : "Đã hủy"}</p>
            </div>
          </div>
        </div>
        <div className="border-b px-5 py-5 flex justify-center">
          {getStatusClass(7) ? (
            <div className="text-center font-bold text-red-500">Đã hủy</div>
          ) : (
            <div className="flex">
              <div className="flex items-center justify-center">
                <div className={getStatusClass(1)}>Chờ xác nhận</div>
                <span className={`mx-4 ${getStatusClass(1)}`}>---</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <div className={getStatusClass(2)}>Đang chuẩn bị hàng</div>
                <span className={`mx-4 ${getStatusClass(2)}`}>---</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <div className={getStatusClass(3)}>Đang vận chuyển</div>
                <span className={`mx-4 ${getStatusClass(3)}`}>---</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <div className={getStatusClass(4)}>Đã giao hàng</div>
                <span className={`mx-4 ${getStatusClass(4)}`}>---</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <div className={getStatusClass(5)}>Giao hàng thất bại</div>
                <span className={`mx-4 ${getStatusClass(5)}`}>---</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <div className={getStatusClass(6)}>Hoàn thành</div>
              </div>
            </div>
          )}
        </div>
        <div className="border-b">
          <div className="px-5 py-4">
            <div>
              <h1 className="text-xl font-medium">Địa chỉ nhận hàng</h1>
            </div>
            <div className="flex gap-10 pt-6">
              <div className="w-[45%]">
                <p>{data?.customerInfo?.userName}</p>
                <p className="py-2">{data?.customerInfo?.phone}</p>
                <p>{data?.customerInfo?.address}</p>
              </div>
              <div className="flex gap-8 border-l pl-3">
                <div className="flex gap-4">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                  </span>
                  <p>Ngày đặt: {formatDate(data?.createdAt)}</p>
                </div>
                <p className="font-semibold">Đặt hàng thành công</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="border-b">
          <div className="px-5 py-4">
            {data?.items.map((order: any, index: number) => (
              <div className="flex justify-between items-center gap-4 py-4" key={index}>
                <div className="flex gap-5 w-[80%]">
                  <img src={order?.productId?.image_product} alt="Sản phẩm" className="w-24 h-24" />
                  <div>
                    <p className="font-semibold">{order?.productId?.name_product}</p>
                    <p>Phân loại: <span className="font-bold">{order?.color_item} - {order?.name_size}</span> </p>
                    <p>Số lượng: {order?.quantity}</p>
                  </div>

                </div>
                <p>Giá: <span className="font-bold">{order?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-b">
          <div className="px-5 py-4">
            <div className="flex justify-between py-2">
              <p>Tổng tiền sản phẩm</p>
              <p>{data?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
            </div>
            <div className="flex justify-between py-2">
              <p>Phí vận chuyển</p>
              <p>0đ</p>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <p>Tổng thanh toán</p>
              <p>{data?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
            </div>
          </div>
        </div>

        {data?.status == 5 ? (
          ''
        ) : (
          <div className="border-b">
            <div className="px-5 py-4">
              {data?.customerInfo?.payment === "VNPAY" ? (
                <p>Bạn đã thành toán <span className="font-bold">{data?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> qua VNPAY</p>
              ) : (
                <p>Vui lòng thành toán <span className="font-bold">{data?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> khi nhận hàng</p>
              )}
            </div>
          </div>
        )}
        <div className="border-b">
          {data?.status == 5 ? (
            <div className="px-5 py-4 text-center font-bold text-red-500">Đơn hàng đã bị hủy</div>
          ) : (
            <div className="px-5 py-4 flex gap-10 justify-end">
              <h1 className="font-bold">Phương thức thanh toán</h1>
              <p>{data?.customerInfo?.payment}</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default OrderDetail;
