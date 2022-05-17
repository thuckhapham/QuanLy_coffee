import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import template from "./template";
import userRoutes from "./controllers/user/user.routes";
import authRoutes from "./controllers/auth/auth.routes";
import orderRoutes from "./controllers/order/order.routes";
import productRoutes from "./controllers/product/product.routes";
import tableRoutes from "./controllers/table/table.routes";
import reportRoutes from "./controllers/report/report.routes";
import workshiftRouter from "./controllers/workshift/workshift.routes";

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use("/uploads", express.static("./uploads"));
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", tableRoutes);
app.use("/", orderRoutes);
app.use("/", reportRoutes);
app.use("/api/workshift", workshiftRouter);
app.get("/", (req, res) => {
  res.status(200).send(template());
});

export default app;
