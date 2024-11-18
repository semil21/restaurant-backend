import connectDB from "./database/database";

import Express from "express";
import bodyParser from "body-parser";

import { superAdminRouter } from "./routes/super-admin/super-admin.route";
import { adminRouter } from "./routes/admin/admin.route";

import dotenv from "dotenv";
dotenv.config();

const cors = require("cors");

const app = Express();
connectDB();

app.use(Express.json());
// app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  next();
});

// super admin routes
app.use("/super-admin", superAdminRouter);

// admin route
app.use("/admin", adminRouter);

// app.use(notFound);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
