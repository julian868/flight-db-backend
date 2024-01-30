import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";

if (process.env.DATABASE === undefined || process.env.DATABASE_PASSWORD === undefined) {
    throw new Error("Database environment variable(s) not set.");
}
    
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

void mongoose.connect(DB);

mongoose.connection
    .on("open", () => {
        console.log("Connected to Mongo.");
    })
    .on("close", () => {
        console.log("Disconnected from Mongo.");
    })
    .on("error", (error) => {
        console.log("Connection failed.", error);
    });

const PORT: string | number = process.env.PORT ?? 8000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})