import { adminLogin } from "../../schemas/admin/adminLogin.schema";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const verifyAdminLogin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const verifyUserExists = await adminLogin.findOne({
        email: email,
      });

      if (!verifyUserExists) {
        res.status(400).send({ response: "No email Found" });
        return;
      }

      const hashedPassword = verifyUserExists.password || "";

      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

      if (isPasswordCorrect) {
        res.status(200).send({ response: "Login Successful" });
      } else {
        res.status(400).send({ response: "Incorrect Password" });
      }
    } catch (error) {
      res.status(500).send({ response: "Server Error, Failed to log in" });
    }
  },
);

export const createNewAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      req.body.password = hashedPassword;

      const saveNewAdmin = await adminLogin.create(req.body);

      if (saveNewAdmin) {
        res.status(200).send({ response: "New Admin created successfully." });
      } else {
        res.status(400).send({ response: "Failed to create new admin ." });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, Failed to create new admin" });
    }
  },
);

export default { verifyAdminLogin, createNewAdmin };
