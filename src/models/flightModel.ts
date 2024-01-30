import { InferSchemaType, Schema, model } from "mongoose";

const flightSchema = new Schema({
    airline: {
        type: String,
        required: [true, "Flight must have an airline."]
    },
    flightNum: {
        type: Number,
        required: [true, "Flight must have a number."],
        trim: true,
        min: 100,
        max: 999
    },
    origin: {
        type: String,
        required: [true, "Flight must have an origin."],
        match: [/^[A-z]{3}$/,"3 letter airport code only!"],
        uppercase: true
    },
    destination: {
        type: String,
        required: [true, "Flight must have a destination."],
        match: [/^[A-z]{3}$/, "3 letter airport code only!"],
        uppercase: true
    }
})

type Flight = InferSchemaType<typeof flightSchema>;

export default model<Flight>("Flight", flightSchema);
