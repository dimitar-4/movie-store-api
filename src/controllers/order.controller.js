import mongoose from "mongoose";
import Order from "../models/order.js";
import { Controller } from "./controller.js";
import express from "express";
import autoBind from "auto-bind";

export class OrderController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Get an order by id
  // @route  GET /api/orders/:id
  // @access Public
  async getOrder(req, res) {
    const order = await this.getDocOr404(res, Order, req.params.id);
    return order ? this.ok(res, order) : undefined;
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Create an order
  // @route  GET /api/orders
  // @access Public
  async createOrder(req, res) {
    try {
      const order = new Order(req.body);
      await order.save();
      return this.created(res, order);
    } catch (ex) {
      if (ex instanceof mongoose.Error.ValidationError) {
        const errors = [];
        for (const err in ex.errors) errors.push(ex.errors[err].message);

        return this.badRequest(res, errors);
      } else {
        console.error(ex);
        return this.badRequest(res, ["Unknown Error"]);
      }
    }
  }
}

export default new OrderController();
