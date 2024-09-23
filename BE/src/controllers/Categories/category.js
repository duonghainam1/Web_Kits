import { StatusCodes } from "http-status-codes";

import Category from "../../models/Items/Category.js";
import Products from "../../models/Items/Products.js";
import { categoryValidator } from "../../validations/category.js";

export const create = async (req, res) => {
  try {
    // Validate input data
    const { error } = categoryValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    // Check if the category name already exists
    const existingCategory = await Category.findOne({
      name_category: req.body.name_category,
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Danh mục đã tồn tại." });
    }

    // Create a new category
    const data = await Category.create(req.body);
    if (!data) {
      throw new Error("Error creating category");
    }
    return res.status(200).json({ message: "Success", data });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export async function get_items_client(req, res) {
  const { _page = 1, _sort = "", _limit = 12, _search = "" } = req.query;
  const options = {
    page: _page,
    limit: _limit,
  };

  try {
    const query = {};

    if (_search) {
      query.$or = [
        { name_category: { $regex: new RegExp(_search, "i") } },
        // Add more fields if needed for search
      ];
    }

    const data = await Category.paginate(query, options);

    if (!data || data.docs.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy dữ liệu!",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Thành công!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}
export const get = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    let objWhere = {};
    if (keyword) {
      objWhere.name = new RegExp(keyword, "i");
    }

    const data = await Category.find(objWhere);
    if (!data) {
      throw new Error(`Failed to get categories`);
    }
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const getCategoryByName = async (req, res) => {
  try {
    const { searchName } = req.body;
    const categorys = await Category.find({
      name_category: { $regex: new RegExp(searchName, "i") },
    });
    if (categorys === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: error.message || "Không có danh mục nào" });
    }
    return res.status(StatusCodes.OK).json(categorys);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Lỗi máy chủ!" });
  }
};
export const getById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      throw new Error(`Failed to get category detail`);
    }
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
export async function getCatogoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    const products = await Products.find({ category_id: category._id });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm" });
  }
}

export const update = async (req, res) => {
  try {
    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    const { error } = categoryValidator.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const { id } = req.params;
    const { name_category } = req.body;

    // Kiểm tra xem tên danh mục mới có tồn tại chưa
    const existingCategory = await Category.findOne({
      name_category,
      _id: { $ne: id }, // Loại trừ danh mục hiện tại đang được cập nhật
    });
    if (existingCategory) {
      return res.status(400).json({
        message: "Danh mục đã tồn tại.",
      });
    }

    // Cập nhật danh mục
    const data = await Category.findByIdAndUpdate(
      id, // Sửa từ { _id: req.params.id } thành id
      req.body,
      { new: true }
    );
    if (!data) {
      throw new Error(`Failed to update category`);
    }
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Danh mục không tồn tại",
      });
    }
    await Products.updateMany(
      { category_id: categoryId },
      { $unset: { category_id: "" } }
    );

    return res.status(200).json({
      message: "Xóa danh mục thành công ",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const statistical = async (req, res) => {
  try {
    const categorys = await Category.distinct("category");
    const categoryCount = categorys.length;
    return res.status(200).json({ count: categoryCount });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};