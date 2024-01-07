import express from "express";
import { addToCart, createProduct } from "../controllers/productController";
const router = express.Router();

router.post('/create', createProduct);
router.post('/add',addToCart);

export default router;