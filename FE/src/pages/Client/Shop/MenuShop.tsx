import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import PriceFilter from "./Filter/PriceFilter";
import ColorFilter from "./Filter/ColorFilter";
import SizeFilter from "./Filter/SizeFilter";
import useAttributes from "../../../common/hooks/Attributes/useAttributesQuery";
import { useCategoryQuery } from "../../../common/hooks/Category/useCategoryQuery";
import { AiOutlineFilter } from "react-icons/ai";

interface MenuShopProps {
  onCategorySelect: (ids: string[]) => void; // Cập nhật kiểu ở đây
  onPriceChange: (priceRanges: { min: number; max: number }[]) => void;
  setSearch: (search: string) => void;
  selectedColors: string[];
  toggleColor: (color: string) => void;
  resetColorFilter: () => void;
  onColorChange: (colors: string[]) => void;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (sizes: string[]) => void;
}

const MenuShop: React.FC<MenuShopProps> = ({
  onCategorySelect,
  onPriceChange,
  selectedColors,
  toggleColor,
  resetColorFilter,
  onColorChange,
  selectedSizes,
  toggleSize,
  resetSizeFilter,
  onSizeChange,
}) => {
  const { data: categoryData } = useCategoryQuery();
  const {
    colors: colorOptions,
    sizes: sizeOptions,
    loading,
    error,
  } = useAttributes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCategoryChange = (selectedCategories: string[]) => {
    onCategorySelect(selectedCategories); // Gọi hàm với mảng các ID
  };

  return (
    <div className="hidden lg:block w-full  flex flex-col my-10 ">
      <div className=" space-x-4 mb-7 mt-3">
        {/* <AiOutlineFilter className="text-3xl" /> */}
        <h1 className="text-2xl">Bộ Lọc Sản Phẩm</h1>
      </div>
      <div className="w-full bg-gray-50">
        <CategoryFilter
          categories={categoryData || []}
          onCategorySelect={handleCategoryChange} // Truyền vào hàm mới
        />
      </div>

      <div className="w-full bg-gray-50 mt-2">
        <PriceFilter onPriceChange={onPriceChange} />
      </div>

      <div className="w-full bg-gray-50 mt-2">
        <ColorFilter
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          resetColorFilter={resetColorFilter}
          onColorChange={onColorChange}
          colorOptions={colorOptions}
        />
      </div>
      <div className="w-full bg-gray-50 mt-2">
        <SizeFilter
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={onSizeChange}
          sizeOptions={sizeOptions}
        />
      </div>
    </div>
  );
};

export default MenuShop;
