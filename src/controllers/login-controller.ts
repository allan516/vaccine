import { Request, Response } from "express";
import { loginService } from "../services/login-service";

export const login = async (req: Request, res: Response): Promise<any> => {
  const data = req.body;
  const response = await loginService(data);
  return res.status(response.statusCode).json(response.body);
};
