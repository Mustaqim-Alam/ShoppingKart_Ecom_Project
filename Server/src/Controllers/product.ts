import { NextFunction, Request, Response } from "express";
import { rm } from "fs";
import { myCache } from "../app.js";
import { faker } from "@faker-js/faker";
import { tryCatch } from "../Middlewares/error.js";
import { Product } from "../Models/product.js";
import {
  BaseQuery,
  newProductRequestBody,
  searchRequestQuery,
} from "../Types/types.js";
import ErrorHandler from "../Utils/utilityClass.js";
import { invalidCache } from "../Utils/features.js";
import multer from "multer";
import express from "express";
import { log } from "console";

//  @route GET /api/v1/product/latest

export const getLatestProduct = tryCatch(async (req, res, next) => {
  let products = [];

  if (myCache.has("latest-product")) {
    products = JSON.parse(myCache.get("latest-product") as string);
  } else {
    products = await Product.find({}).sort({ createdat: -1 }).limit(10);
    if (!products) return next(new ErrorHandler("Product not found!", 404));
    myCache.set("latest-product", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

// @route GET /api/v1/product/categories

export const getAllCategories = tryCatch(async (req, res, next) => {
  let categories;

  if (myCache.has("all-categories")) {
    myCache.get("categories");
    categories = JSON.parse(myCache.get("all-categories") as string);
  } else {
    categories = await Product.distinct("category");
    myCache.set("all-categories", JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
});

// @route GET /api/v1/product/admin-products
export const getAdminProducts = tryCatch(async (req, res, next) => {
  let adminProducts;
  if (myCache.has("all-admin-products")) {
    adminProducts = JSON.parse(myCache.get("all-admin-products") as string);
  } else {
    adminProducts = await Product.find({});
    myCache.set("all-admin-products", JSON.stringify(adminProducts));
  }
  return res.status(200).json({
    success: true,
    adminProducts,
  });
});

// @route GET /api/v1/product/:id
export const getSingleProduct = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  let product;
  if (myCache.has(`product - ${id}`)) {
    product = JSON.parse(myCache.get(`product - ${id}`) as string);
  } else {
    product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found!", 404));
    myCache.set(`product - ${id}`, JSON.stringify(product));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// @route POST /api/v1/product/new
export const newProduct = tryCatch(
  async (
    req: Request<{}, {}, newProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, stock, category, price } = req.body;
    console.log(req.body);

    const files = req.files as Express.Multer.File[] | undefined;

    console.log(req.files);

    if (!files || files.length === 0) {
      console.log("No files uploaded or received");
      return next(new ErrorHandler("Please add at least one photo", 400));
    }

    if (files.length > 5)
      return next(new ErrorHandler("You can only upload up to 5 photos", 400));

    // const photosURL = await uploadToCloudinary(files);
    const photosURL = files
      .map((file) => file.path)
      .filter((path) => path !== undefined); // ✅ Remove undefined values

    // Ensure all required fields are filled
    if (!name || !stock || !category || !price) {
      // Delete the uploaded photo if any field is missing

      return next(new Error("Please add all fields!"));
    }

    // Create and save the new product
    await Product.create({
      name,
      price,
      stock,
      photo: photosURL.length > 0 ? photosURL[0] : "uploads/", // ✅ Store first valid image path
      category: category.toLowerCase(),
    });

    await invalidCache({ product: true, admin: true });

    return res.status(201).json({
      success: true,
      message: `New Product ${name} has created successfully`,
    });
  }
);

// @route PUT /api/v1/product/:id
export const updateProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, stock, category, price } = req.body;
  const files = req.files as Express.Multer.File[] | undefined;

  console.log("Received Files:", files);

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));

  console.log("Existing Product Photo:", product.photo);

  const photoPath = files?.[0]?.path || product.photo; // ✅ Ensures product exists before using its photo
  product.photo = photoPath;

  if (!files && !product.photo) {
    return next(new ErrorHandler("Please attach a photo", 400));
  }

  if (name) product.name = name;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (price) product.price = price;

  await product.save();
  await invalidCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: `Product ${name} has updated successfully`,
  });
});

// @route DELETE /api/v1/product/:id
export const deleteProduct = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));

  // Delete the product and its associated photo
  await product.deleteOne();
  rm(product.photo, () => {
    console.log("Product photo deleted");
  });

  await invalidCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: `Product ${product.name} deleted successfully!`,
  });
});

export const getAllProducts = tryCatch(
  async (req: Request<{}, {}, {}, searchRequestQuery>, res, next) => {
    const { search, category, price, sort } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;

    const skip = (page - 1) * limit;

    const basequery: BaseQuery = {};

    if (search) {
      basequery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) basequery.category = category;

    if (price) {
      basequery.price = {
        $lte: Number(price),
      };
    }

    const productPromise = await Product.find(basequery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, onlyFilteredProducts] = await Promise.all([
      productPromise,
      Product.find(basequery),
    ]);

    const totalPages = Math.ceil(onlyFilteredProducts.length / limit);

    if (!products) return next(new ErrorHandler("Product not found", 404));

    return res.status(200).json({ success: true, products, totalPages });
  }
);

// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\c071a20b-6682-4e89-9da4-0a927afd59bc.png",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ success: true });
// };

// generateRandomProducts(10)

// const deleteRandomProduct = async (count: number = 15 ) => {
//   const products = await Product.find({}).skip(2);

//   for (let index = 0; index < products.length; index++) {
//     const product = products[index];
//     await product.deleteOne();
//   }
//   console.log({ Success: true });
// };

// deleteRandomProduct(20)
