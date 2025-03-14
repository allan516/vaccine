import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import * as httpResponse from "../utils/https-helper";
import { IHttpResponse } from "../models/IHttpResponse";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  const secretKey = process.env.JWT_SECRET as string;
  let response: IHttpResponse | null = null;

  try {
    if (!token) {
      response = await httpResponse.unauthorized();
      return res.status(response.statusCode).json(response.body);
    }

    Jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        response = await httpResponse.unauthorized();
        return res.status(response.statusCode).json(response.body);
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Ocorreu um Erro: " + error);
  }
};
