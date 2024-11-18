import express from "express";
import superAdminController from "../../controllers/super-admin/super-admin.controller";

export const superAdminRouter = express.Router();

superAdminRouter.post("/create", superAdminController.createNewSuperAdmin);
superAdminRouter.post("/login", superAdminController.verifySuperAdminLogin);
