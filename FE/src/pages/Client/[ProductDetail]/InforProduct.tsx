import { useEffect, useRef, useState } from "react";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { IProduct } from "../../../common/interfaces/Product";
import { Button } from "../../../components/ui/button";
import { Dow, Up } from "../../../resources/svg/Icon/Icon";
import { Convert_Color } from "../../../_lib/Config/Config_Color";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Rate } from "antd";

interface InforProductProp {
  product: IProduct;
}

interface IAttr {
  color?: string | number;
  size?: any;
  _id?: string | number;
}

const InforProduct: React.FC<InforProductProp> = ({ dataProps }: any) => {
  console.log(dataProps);

  const navi = useNavigate();
  const ref_validate_attr = useRef<HTMLSpanElement>(null);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [arr_size, setArr_Size] = useState<any>();
  const [price_attr, set_price_attr] = useState(0);
  const [quantity_attr, setQuantity_attr] = useState();
  const [quantity_item, setQuantity_item] = useState<number>(1);
  const dataItem = dataProps?.products;
  const { name_product, price_product, _id, stock } = dataItem;
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  const { mutate } = Mutation_Cart("ADD");
  const addCart = (id?: string | number, action?: string) => {
    if (account) {
      if (quantity_attr) {
        let item: any = {
          userId: account,
          productId: id,
          price_item_attr: price_attr,
          quantity: quantity_item,
          color: color,
          size: size,
        };
        if (action === "checkout") {
          item = {
            ...item,
            status_checked: true,
          };
        }
        mutate(item);
        if (action === "checkout") {
          navi("/cart");
        }
      } else {
        text_validate();
      }
    } else {
      navi("/login");
    }
  };
  function text_validate() {
    ref_validate_attr?.current?.classList.add("block");
    ref_validate_attr?.current?.classList.remove("hidden");
  }
  useEffect(() => {
    if (!dataProps?.products?.attributes) {
      setQuantity_attr(stock);
    } else {
      const a: IAttr[] = [];
      dataProps?.product?.attributes?.values?.map((item: any) => {
        item?.size?.map((x: any) => {
          if (x?.stock_attribute > 0) {
            if (!a.includes(item)) {
              a.push(item);
            }
          }
        });
      });
    }
  }, [dataProps]);

  function handle_atrtribute(item?: any, action?: any) {
    switch (action) {
      case "Color":
        setQuantity_item(1);
        setSize(undefined);
        ref_validate_attr?.current?.classList.add("hidden");
        ref_validate_attr?.current?.classList.remove("block");
        dataItem?.attributes?.values?.filter((i: any) => {
          if (i?.color == item) {
            i?.size?.filter((j: any) => {
              j.name_size
                ? setArr_Size(i?.size)
                : (setQuantity_attr(j?.stock_attribute),
                  set_price_attr(j?.price_attribute),
                  setArr_Size(""));
            });
          }
        });
        return setColor(item);
      case "Size":
        setQuantity_item(1);
        ref_validate_attr?.current?.classList.add("hidden");
        ref_validate_attr?.current?.classList.remove("block");
        for (const i of dataProps?.products?.attributes?.values) {
          if (i?.color == color) {
            for (const k of i.size) {
              k?.name_size == item &&
                (setQuantity_attr(k?.stock_attribute),
                setSize(k.name_size),
                set_price_attr(k?.price_attribute));
            }
          }
        }
        return;
      default:
        return;
    }
  }
  function handle_quantity_item(action: any) {
    switch (action) {
      case "dow":
        if (quantity_attr) {
          if (quantity_item > 1) {
            setQuantity_item(quantity_item - 1);
          }
        } else if (color || size) {
          if (quantity_item > 1) {
            setQuantity_item(quantity_item - 1);
          }
        } else {
          text_validate();
        }
        return;
      case "up":
        if (quantity_attr) {
          if (quantity_item < quantity_attr) {
            setQuantity_item(quantity_item + 1);
          } else {
            Swal.fire("Vượt quá số lượng sản phẩm!");
          }
        } else {
          text_validate();
        }
        return;
      default:
        return;
    }
  }
  let min =
    dataProps?.products?.attributes?.values[0]?.size[0]?.price_attribute ?? 0;
  let max =
    dataProps?.products?.attributes?.values[0]?.size[0]?.price_attribute ?? 0;
  if (dataProps?.products?.attributes) {
    const check_attr = new Set();
    const values_attributes = dataProps?.products?.attributes?.values?.filter(
      (item: any) => {
        if (check_attr.has(item?.color)) {
          return false;
        } else {
          check_attr.add(item?.color);
          return true;
        }
      }
    );
    for (const i of values_attributes) {
      for (const j of i.size) {
        if (j.price_attribute < min) {
          min = j.price_attribute;
        }
        if (j.price_attribute > max) {
          max = j.price_attribute;
        }
      }
    }
  }
  const price = price_product * quantity_item;
  const price_item_attr = price_attr * quantity_item;
  return (
    <div className="h-full w-full *:w-full lg:mt-2 mb:mt-5">
      <div className="flex flex-col lg:gap-y-2">
        {/* row 1 */}
        <div className="flex flex-col lg:gap-y-2">
          <span className="text-gray-700 font-bold lg:text-3xl mb:text-xl">
            {name_product}
          </span>
          <span>
            <Rate
              allowHalf // Cho phép hiển thị nửa sao
              allowClear={false}
              disabled={
                !!dataProps.products.averageRating ||
                !dataProps.products.averageRating
              } // Không cho chỉnh sửa nếu đã có đánh giá
              value={dataProps.products.averageRating || 0}
            />
          </span>

          <strong className="lg:text-2xl lg:mt-0 mb:mt-3.5 mb:text-xl lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]"></strong>
          <div className="flex flex-col gap-y-2 justify-between">
            <div className="flex gap-x-2 items-end">
              {min && max ? (
                price_attr ? (
                  <>
                    <span className="text-[#EB2606]">
                      {price_attr?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </>
                ) : min === max ? (
                  <>
                    <span className="text-[#EB2606]">
                      {max?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[#EB2606]">
                      {min?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    -
                    <span className="text-[#EB2606]">
                      {max?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </>
                )
              ) : (
                <span className="text-[#EB2606]">
                  {price_product?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* row 2 */}
        {dataProps?.products?.attributes && (
          <>
            <div>
              <span className="text-lg lg:mt-[1px] mb:mt-3.5 lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
                Color
              </span>
              <div className="flex items-center gap-x-4 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium *:h-8 *:w-8 *:rounded-[50%] *:border *:duration-300">
                {dataProps?.products?.attributes?.values?.map((item: any) => (
                  <button
                    onClick={() => handle_atrtribute(item?.color, "Color")}
                    className={`${Convert_Color(item?.color)} ${
                      color == item?.color ? "after:block" : "after:hidden"
                    } hover:scale-110 after:absolute after:w-4 after:h-2 after:border-l-2 after:border-b-2 after:border-white after:rotate-[-45deg] grid place-items-center`}
                  ></button>
                ))}
              </div>
            </div>
            {/* row 4   */}
            {arr_size && (
              <div>
                <span className="text-lg lg:mt-[1px] mb:mt-3.5 lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
                  Size
                </span>
                <div className="flex items-center gap-x-4 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium *:px-3 *:py-1 *:rounded *:border *:border-black *:duration-200">
                  {arr_size?.map((item: any) => (
                    <button
                      onClick={() => handle_atrtribute(item?.name_size, "Size")}
                      className={`${
                        size == item?.name_size && "bg-black text-white"
                      } hover:bg-black hover:text-white grid place-items-center`}
                    >
                      {item?.name_size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {/* row 5 */}
        <div className=" mt-2 *:w-full rounded-xl">
          <span ref={ref_validate_attr} className="hidden text-red-500 text-sm">
            Vui lòng chọn!
          </span>
          {/* quantity */}
          <div className=" flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
            {/* up , dow quantity */}
            <div className="border lg:py-2.5 lg:pr-6  mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
              <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                <button onClick={() => handle_quantity_item("dow")}>
                  <Dow />
                </button>
                <input
                  onChange={(e) =>
                    quantity_attr &&
                    +e.target.value <= quantity_attr &&
                    setQuantity_item(+e.target.value)
                  }
                  className="bg-[#F4F4F4] text-center rounded"
                  value={quantity_item}
                />
                <button onClick={() => handle_quantity_item("up")}>
                  <Up />
                </button>
              </div>
              <span className="text-gray-800 lg:tracking-[0.5px] border-l pl-4 border-black">
                Còn lại {quantity_attr} sản phẩm
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center mb-4 gap-x-2 font-medium lg:text-xl lg:tracking-[0.7px] mb:text-base">
            <span>Tạm tính :</span>
            <span className="text-[#EB2606]">
              {(dataProps?.products?.attributes
                ? price_item_attr
                : price
              )?.toLocaleString("vi", { style: "currency", currency: "VND" })}
            </span>
          </div>
          <div className="flex items-center gap-x-5 font-medium lg:text-base mb:text-sm *:rounded *:duration-300 w-full">
            {/* add cart */}
            <Button
              className="hover:bg-black hover:text-white w-full lg:w-[20%]"
              onClick={() => addCart(_id)}
            >
              Thêm vào giỏ
            </Button>
            {/* add cart */}
            <Button
              onClick={() => addCart(_id, "checkout")}
              className="hover:bg-black hover:text-white w-full lg:w-[20%]"
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforProduct;
