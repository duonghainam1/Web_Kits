import express from "express";
import {
  GetAllBlogs,
  getBlogsById,
  createBlog,
  updateBlogById,
  deleteBlogById,
  relactedBlog,
  getBlogsBySlug,
  GetBlogsByName,
} from "../controllers/Blog/blog.js";
import { checkRole } from "../controllers/Auth/auth.js";
const Routes_blog = express.Router();
Routes_blog.get("/blogs/:blogId", getBlogsById);
Routes_blog.get("/blogs/detail/:slug", getBlogsBySlug);
Routes_blog.post("/blogs/search", GetBlogsByName);

Routes_blog.get("/blogs", GetAllBlogs);
Routes_blog.post("/blogs/add_blog", checkRole(["admin"]), createBlog);
Routes_blog.put("/update_blog/:blogId", checkRole(["admin"]), updateBlogById);
Routes_blog.delete("/blogs/:blogId", checkRole(["admin"]), deleteBlogById);
Routes_blog.get("/relacted", relactedBlog);
export default Routes_blog;
