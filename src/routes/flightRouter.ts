import express from "express";
import {
  getAllFlights,
  addFlight,
  getFlightById,
  deleteById,
  updateById,
} from "../controllers/flightController";
const flightRouter = express.Router();

flightRouter.route("/").get(getAllFlights).post(addFlight);

flightRouter
  .route("/:id")
  .get(getFlightById)
  .delete(deleteById)
  .patch(updateById);

export default flightRouter;
