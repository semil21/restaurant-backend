import { Response } from "express";

import { Request as ExpressRequest } from "express";
interface DecodedToken {
  email: string;
  role: string;
  Id: string;
}

interface Request extends ExpressRequest {
  decoded?: DecodedToken;
  needAccessToken?: boolean;
}
const notFound = (req: Request, res: Response) =>
  res.status(404).send("Route does not exist");

export default notFound;
