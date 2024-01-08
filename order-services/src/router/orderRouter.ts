import express from 'express';
import { placeOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/buy', placeOrder);

export default router;