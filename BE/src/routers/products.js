import { Router } from "express";
import {
  filterItems,
  get_item_dashboard,
  get_items_client,
  getAllProducts,
  getDetailProductDashBoard,
  getProductById,
  getProductsByName,
  getProductAverageRating,
} from "../controllers/Items/Get";
import {
  deleteProductById,
  destroy_delete,
  removeMultipleProducts,
} from "../controllers/Items/Remove";
import { updateProductById } from "../controllers/Items/Edit";
import { createProduct } from "../controllers/Items/Create";
import { getTrash, restore_item } from "../controllers/Items/Recycle";
import { checkRole } from "../controllers/Auth/auth";

const Routes_Products = Router();
Routes_Products.get("/products_all", getAllProducts);
Routes_Products.get("/products", get_items_client);
Routes_Products.get(
  "/products/dashboard",
  checkRole(["admin"]),
  get_item_dashboard
);
Routes_Products.get("/products/:id", getProductById);
Routes_Products.get(
  "/products/getProductAverageRating/:id",
  getProductAverageRating
);
Routes_Products.get("/products/dashboard/:id", getDetailProductDashBoard);
Routes_Products.post("/products/search", getProductsByName);
//Filter
Routes_Products.get("/products/filter/product", filterItems);
Routes_Products.post("/products", checkRole(["admin"]), createProduct);
Routes_Products.put("/products/:id", checkRole(["admin"]), updateProductById);
Routes_Products.post(
  "/products/remove",
  checkRole(["admin"]),
  removeMultipleProducts
);
Routes_Products.delete(
  "/products/:id",
  checkRole(["admin"]),
  deleteProductById
);
Routes_Products.delete(
  "/products/destroy/:id",
  checkRole(["admin"]),
  destroy_delete
);
Routes_Products.patch(
  "/products/recycle/:id",
  checkRole(["admin"]),
  restore_item
);
Routes_Products.get(
  "/products/adminstration/dashboard/trash",
  checkRole(["admin"]),
  getTrash
);

export default Routes_Products;
