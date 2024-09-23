import React, { useEffect, useState } from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Products from "../../../components/common/Items/Products";
import { IProduct } from "../../../common/interfaces/Product";

interface Products_ShopProps {
  query: string;
  cate_id: string[];
  price_ranges: { min: number; max: number }[];
  selectedColors: string[];
  selectedSizes: string[];
  sortOption: string;
}

const sortProducts = (products: IProduct[], sortOption: string) => {
  switch (sortOption) {
    case "newest":
      return [...products].sort(
        (a, b) =>
          new Date(b.updatedAt as string).getTime() -
          new Date(a.updatedAt as string).getTime()
      );
    case "oldest":
      return [...products].sort(
        (a, b) =>
          new Date(a.updatedAt as string).getTime() -
          new Date(b.updatedAt as string).getTime()
      );
    case "price_attribute":
      return [...products].sort(
        (a, b) => (a.price_product ?? 0) - (b.price_product ?? 0)
      );
    case "price_attribute:desc":
      return [...products].sort(
        (a, b) => (b.price_product ?? 0) - (a.price_product ?? 0)
      );
    default:
      return products;
  }
};

const Products_Shop: React.FC<Products_ShopProps> = ({
  query,
  cate_id,
  price_ranges,
  selectedColors,
  selectedSizes,
  sortOption,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;

  const {
    data: productsResponse,
    isLoading,
    isError,
    error,
  } = useFilteredProducts(
    query,
    cate_id,
    price_ranges,
    selectedColors,
    selectedSizes,
    currentPage,
    itemsPerPage,
    sortOption
  );

  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (productsResponse?.data) {
      const sorted = sortProducts(productsResponse.data, sortOption);
      setSortedProducts(sorted);
    }
  }, [productsResponse, sortOption]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  const totalItems = productsResponse?.pagination?.totalItems || 0;
  const totalPages = productsResponse?.pagination?.totalPages || 1;
  const hasMore = currentPage < totalPages;

  return (
    <div>
      {sortedProducts.length ? (
        <>
          <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
            {sortedProducts.map((item: IProduct) => (
              <Products key={item._id} items={item} />
            ))}
          </div>
          {totalItems > itemsPerPage && (
            <div className="flex flex-col items-center my-4">
              <div className="flex items-center mb-4 space-x-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={currentPage === 1}
                >
                  &#10094; Trang trước
                </button>
                <span className="text-lg font-semibold">
                  Trang {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    !hasMore
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={!hasMore}
                >
                  Trang tiếp theo &#10095;
                </button>
              </div>
              <div className="flex flex-wrap items-center space-x-2">
                {totalPages > 1 &&
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img
            src="../../src/assets/Images/Products/no-data.png"
            alt="Không có sản phẩm"
          />
        </div>
      )}
    </div>
  );
};

export default Products_Shop;
