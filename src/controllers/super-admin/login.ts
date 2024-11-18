import expressAsyncHandler from "express-async-handler";
import { superAdminLogin } from "../../schemas/super-admin/login";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

const createNewSuperAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newSuperAdmin = await superAdminLogin.create({
        email,
        password: hashedPassword,
      });

      res.status(201).send({
        response: "New super admin created successfully",
      });
    } catch (error) {
      res.status(500).send({ response: "Failed to create new super admin" });
    }
  },
);

const verifySuperAdminLogin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const verifyUserExists = await superAdminLogin.findOne({
        email: email,
      });

      if (!verifyUserExists) {
        res.status(400).send({ response: "No email Found" });
        return;
      }

      const hashedPassword = verifyUserExists.password || "";

      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

      if (isPasswordCorrect) {
        res.status(200).send({ response: verifyUserExists });
      } else {
        res.status(400).send({ response: "Incorrect Password" });
      }
    } catch (error) {
      res.status(500).send({ response: "Server Error, Failed to log in" });
    }
  },
);

export default { createNewSuperAdmin, verifySuperAdminLogin };
