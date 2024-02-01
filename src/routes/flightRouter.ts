import express from "express";
import {
  getAllFlights,
  addFlight,
  getFlightById,
  deleteById,
  updateById,
} from "../controllers/flightController";
const flightRouter = express.Router();

/** "/" - POST - Definition
 * @openapi
 * /api/v1/flightdb:
 *  post:
 *    tags:
 *      - Flights
 *    description: Create a new Flight
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airline:
 *                type: string
 *              flightNum:
 *                type: number
 *              origin:
 *                type: string
 *              destination:
 *                type: string
 *    responses:
 *      201:
 *        description: Flight created successfully
 *      400:
 *        description: Invalid data sent
 */
/** "/" - GET - Definition
 * @openapi
 * /api/v1/flightdb:
 *  get:
 *    tags:
 *      - Flights
 *    description: Get all Flights
 *    responses:
 *      200:
 *        description: Successfully queued all Flights
 *      400:
 *        description: Unable to get Flights
 */

flightRouter.route("/").get(getAllFlights).post(addFlight);

/** "/:id" - GET - Definition
 * @openapi
 * /api/v1/flightdb/{id}:
 *  get:
 *    tags:
 *      - Flights
 *    description: Get a Flight by its "_id"
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Unique id of the Flight
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Flight data retrieved successfully
 *      404:
 *        description: Flight data not found
 */
/** "/:id" - DELETE - Definition
 * @openapi
 * /api/v1/flightdb/{id}:
 *  delete:
 *    tags:
 *      - Flights
 *    description: Delete a Flight by its "_id"
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Unique id of the Flight
 *      schema:
 *        type: string
 *    responses:
 *      204:
 *        description: Flight data deleted successfully
 *      404:
 *        description: Flight data not found
 */
/** "/:id" - PATCH - Definition
 * @swagger
 * /api/v1/flightdb/{id}:
 *  patch:
 *    tags:
 *      - Flights
 *    description: Patch a Flight by its "_id"
 *    parameters:
 *    - in: path
 *      name: id
 *      required: string
 *      description: Unique id of the Flight
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              airline:
 *                type: string
 *              flightNum:
 *                type: number
 *              origin:
 *                type: string
 *              destination:
 *                type: string
 *    responses:
 *      201:
 *        description: Flight created successfully
 *      400:
 *        description: Invalid data sent
 */
flightRouter
  .route("/:id")
  .get(getFlightById)
  .delete(deleteById)
  .patch(updateById);

export default flightRouter;
