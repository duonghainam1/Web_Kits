/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import List_item from "../../../components/common/Client/_component/List_item";
import { Query_Limit_Items } from "../../../common/hooks/Products/Products";
import { useState } from "react";
import { ICategory } from "../../../common/interfaces/Category";
import { useCategoryQuery } from "../../../common/hooks/Category/useCategoryQuery";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";

const List_Products = () => {
  const { data, isLoading } = Query_Limit_Items(12);
  const { data: category } = useCategoryQuery();

  const visibleCategories =
    category?.filter((category: ICategory) => category.published) || [];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "all"
      ? data?.filter((product: any) =>
          visibleCategories.some(
            (cat: ICategory) => cat._id === product.category_id
          )
        )
      : data?.filter(
          (product: any) =>
            product.category_id === selectedCategory &&
            visibleCategories.some(
              (cat: ICategory) => cat._id === product.category_id
            )
        );

  const propsData = {
    data: filteredProducts,
    style: "lg:grid-cols-4 md:grid-cols-3",
  };

  const handleViewAll = () => {
    if (selectedCategory === "all") {
      navigate("/shops");
    } else {
      const selectedCat = category?.find(
        (cat: ICategory) => cat._id === selectedCategory
      );
      if (selectedCat) {
        navigate(`/shops?category=${selectedCat._id}`);
      }
    }
  };

  return (
    <div className="py-16 overflow-hidden text-center border-b">
      {/* title */}
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 text-[42px] font-medium tracking-wide">
          Danh sách sản phẩm
        </span>
        <nav className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            className={`relative mx-2 ${
              selectedCategory === "all"
                ? "opacity-100 after:w-full after:left-0"
                : "opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0"
            } after:content-[''] after:absolute after:h-[2px] after:bg-gray-800 after:bottom-[-20%] after:duration-500 after:rounded-lg`}
            onClick={() => setSelectedCategory("all")}
          >
            Tất cả
          </button>
          {visibleCategories?.map((cat: ICategory) => (
            <button
              key={cat._id}
              className={`relative mx-2 ${
                selectedCategory === cat._id
                  ? "opacity-100 after:w-full after:left-0"
                  : "opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0"
              } after:content-[''] after:absolute after:h-[2px] after:bg-gray-800 after:bottom-[-20%] after:duration-500 after:rounded-lg`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.name_category}
            </button>
          ))}
        </nav>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          {/* products */}
          {filteredProducts?.length === 0 ? (
            <div className="flex items-center justify-center">
              <img
                src="../../src/assets/Images/Products/no-data.png"
                alt="Không có sản phẩm"
              />
            </div>
          ) : (
            <div className="w-auto">
              <List_item dataProps={propsData} />
              <div
                className="flex items-center justify-center mx-auto h-[50px] w-[130px] rounded hover:bg-gray-100 duration-200 hover:text-black border border-black  bg-black cursor-pointer text-white"
                onClick={() => {
                  handleViewAll();
                  ScrollTop();
                }}
              >
                <span className="text-[15px]">Xem tất cả</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List_Products;
