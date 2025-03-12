import { Request, Response } from "express";
import { loginService } from "../services/login-service";

export const login = async (req: Request, res: Response) => {
  const data = req.body;
  const response = await loginService(data);
  res.status(response.statusCode).json(response.body);
};
