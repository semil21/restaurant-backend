import express from "express";
import adminController from "../../controllers/admin/admin.controller";

export const adminRouter = express.Router();

adminRouter.post("/login", adminController.verifyAdminLogin);
adminRouter.post("/create", adminController.createNewAdmin);
