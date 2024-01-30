import { ExpressFunction } from "../types/expressFunction";
import Flight from "../models/flightModel";

export const getAllFlights: ExpressFunction = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json({
            status: "success",
            count: flights.length,
            data:{ flights },
        })
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}
export const addFlight: ExpressFunction = async (req, res) => {
    try {
        const newFlight = await Flight.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                flight: newFlight
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}
export const getFlightById: ExpressFunction = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        res.status(200).json({
            result: "success",
            data: flight
        })
    } catch (err) {
        res.status(400).json({
            result: "fail",
            message: err
        })
    }
}
export const deleteById: ExpressFunction =async (req,res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        res.status(202).json({
            result: "success",
            data: flight,
            message: "Flight deleted from database"
        })
    } catch (err) {
        res.status(400).json({
            result: "fail",
            message: err
        })
    }
}
export const updateById: ExpressFunction =async (req,res) => {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        status: "success",
        data: {
            flight
        },
        message: "Flight updated",
        "Updated Content":req.body
    })
}