import React, { useState } from "react";
import { ICategory } from "../../../../common/interfaces/Category";

interface CategoryFilterProps {
  categories?: ICategory[];
  onCategorySelect: (ids: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories = [],
  onCategorySelect,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(id)
        ? prev.filter((catId) => catId !== id)
        : [...prev, id];

      onCategorySelect(updatedCategories);
      return updatedCategories;
    });
  };

  const visibleCategories = categories.filter((category) => category.published);

  return (
    <div className="relative border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-4 text-gray-900 rounded-md  "
      >
        <strong className="font-semibold mb:text-sm lg:text-lg">
          Danh Mục
        </strong>
        <span
          className={`shrink-0 transition duration-300 ${
            isOpen ? "-rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="w-full bg-white  rounded-md ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {visibleCategories.length > 0 ? (
              visibleCategories.map((category) => (
                <div key={category._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryToggle(category._id)}
                    className="mr-2"
                  />
                  <label htmlFor={category._id} className="text-gray-700">
                    {category.name_category}
                  </label>
                </div>
              ))
            ) : (
              <p className="col-span-2 px-4 py-2">No categories available</p>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default CategoryFilter;
