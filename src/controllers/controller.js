import mongoose from "mongoose";
import autoBind from "auto-bind";

const ObjectId = mongoose.Types.ObjectId;

export class Controller {
  constructor() {
    autoBind(this);
  }

  // 200
  ok(res, data, message) {
    return res.status(200).json({
      status: 200,
      type: "Ok",
      message: message ?? null,
      errors: null,
      data: data ?? null,
    });
  }

  // 201
  created(res, data, message) {
    return res.status(201).json({
      status: 201,
      type: "Created",
      message: message ?? null,
      errors: null,
      data: data ?? null,
    });
  }

  // 204
  noContent(res, message) {
    return res.status(204).json({
      status: 204,
      type: "No Content",
      message: message ?? null,
      errors: null,
      data: null,
    });
  }

  // 400
  badRequest(res, errors, message) {
    return res.status(400).json({
      status: 400,
      type: "Bad Request",
      message: message ?? null,
      errors: errors ?? null,
      data: null,
    });
  }

  // 404
  notFound(res, errors, message) {
    return res.status(404).json({
      status: 404,
      type: "Not Found",
      message: message ?? null,
      errors: errors ?? null,
      data: null,
    });
  }

  // 501
  notImplemented(res) {
    return res.sendStatus(501);
  }

  async getDocOr404(res, Model, id) {
    if (!ObjectId.isValid(id)) {
      this.notFound(res);
      return null;
    }
    const document = await Model.findById(id);
    if (!document) {
      this.notFound(res);
      return null;
    }
    return document;
  }

  async getDoc(Model, id) {
    if (!ObjectId.isValid(id)) return null;
    const document = await Model.findById(id);
    return document;
  }
}

/**
 * Import an instance of the Controller class.
 */
export default new Controller();
