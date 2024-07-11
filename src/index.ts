import connectDB from "./database/database";

import Express from "express";
import bodyParser from "body-parser";

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

import userRouter from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";
import notFound from "./middleware/notFound";

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)



// app.use(notFound);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
