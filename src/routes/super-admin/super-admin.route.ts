import express from "express";
import superAdminController from "../../controllers/super-admin/login";

export const superAdminRouter = express.Router();

superAdminRouter.post("/create", superAdminController.createNewSuperAdmin);
