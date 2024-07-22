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
import categoryRouter from "./routes/category/category.route";
import subCategoryRouter from "./routes/category/subCategory.route";
import productRouter from "./routes/product/product.route";
import productSizeRouter from "./routes/product/productSize.route";
import brandRouter from "./routes/brand/brand.route";
import genderRouter from "./routes/gender/gender.route";
import notFound from "./middleware/notFound";

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/category", categoryRouter)
app.use("/subCategory", subCategoryRouter)
app.use("/product", productRouter)
app.use("/size", productSizeRouter)
app.use("/brand", brandRouter)
app.use("/gender", genderRouter)



// app.use(notFound);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
