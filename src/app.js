import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import apiRouter from "./routes";
import errorHandler from "./lib/globalErrorHandler";
import GlobalError from "./lib/globalError";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import {check, validationResult} from "express-validator"


const app = express();
dotenv.config();
app.use("*", cors());
app.options("*", cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(apiRouter);
const server = http.createServer(app);
const io = new Server(server);


app.all("*", async (req, res, next) => {
  const err = new GlobalError(
    `${req.originalUrl} does not exist on the server`,
    404
  );

  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

server.listen(PORT,"0.0.0.0", () => {
  console.log(`server listen at port ${PORT}`);
});