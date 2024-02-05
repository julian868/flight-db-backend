import express from "express";
import morgan from "morgan";
import flightRouter from "./routes/flightRouter";
import userRouter from "./routes/userRoutes";
import swaggerDocs from "./utils/swagger";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
const app = express();

/* const corsOptions = {
  origin: "https://example.com",
  optionSuccessStatus: 200
} */

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "Too many requests from this IP address, please try again in an hour",
});

// MIDDLEWARES
app.use(helmet()); //sets security headers

app.use("/api", limiter); //limits number of requests

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/* app.use((req, res, next) => {
  console.log("Hello from the middleware!!!");
  next();
}); */

//ROUTES
app.use("/api/v1/flightdb", flightRouter);
app.use("/api/v1/userdb", userRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Flight Database Express Server!!!");
});

//SWAGGER
swaggerDocs(app, process.env.PORT ?? 8000);

export default app;
