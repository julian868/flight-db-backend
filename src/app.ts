import express from "express";
import morgan from "morgan";
import flightRouter from "./routes/flightRouter";
import swaggerDocs from "./utils/swagger";

const app = express();

// MIDDLEWARES
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  console.log("Hello from the middleware!!!");
  next();
});

//ROUTES
app.use("/api/v1/flightdb", flightRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Flight Database Express Server!!!");
});

//SWAGGER
  swaggerDocs(app, process.env.PORT ?? 8000);

export default app;
