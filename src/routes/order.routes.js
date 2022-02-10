import express from "express";
import controller from "../controllers/order.controller.js";

const router = express.Router();

// /api/orders
router.post("/", controller.createOrder);

// /api/orders/:id
router.get("/:id", controller.getOrder);

export default router;
