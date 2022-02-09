export class Controller {
  constructor() {}

  ok(res, data, message) {
    return res.status(200).json({
      status: 200,
      type: "Ok",
      message: message ?? null,
      errors: null,
      data: data ?? null,
    });
  }

  created(res, data, message) {
    return res.status(201).json({
      status: 201,
      type: "Ok",
      message: message ?? null,
      errors: null,
      data: data ?? null,
    });
  }

  noContent(res, message) {
    return res.status(204).json({
      status: 204,
      type: "No Content",
      message: message ?? null,
      errors: null,
      data: null,
    });
  }

  badRequest(res, errors, message) {
    return res.status(400).json({
      status: 400,
      type: "Bad Request",
      message: message ?? null,
      errors: errors ?? null,
      data: null,
    });
  }

  notFound(res, errors, message) {
    return res.status(404).json({
      status: 404,
      type: "Not Found",
      message: message ?? null,
      errors: errors ?? null,
      data: null,
    });
  }

  notImplemented(res) {
    return res.sendStatus(501);
  }
}

/**
 * Import an instance of the Controller class.
 */
export default new Controller();
