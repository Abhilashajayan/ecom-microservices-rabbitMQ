import express from 'express';
import {addToCart} from '../controllers/cartControllers'
const router = express.Router();

router.post('/add', addToCart);

export default router;