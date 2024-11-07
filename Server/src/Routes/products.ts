import express from "express";
import {
  newProduct,
  getLatestProduct,
  getAllCategories,
  getAdminProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/product.js";
import { adminOnly } from "../Middlewares/auth.js";
import { singleUpload } from "../Middlewares/multer.js";

const app = express.Router();

app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", getLatestProduct);
app.get("/categories", getAllCategories);
app.get("/admin-products", adminOnly, getAdminProducts);
app.get("/all-products", getAllProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
