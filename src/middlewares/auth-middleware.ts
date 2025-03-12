import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  const secretKey = process.env.JWT_SECRET as string;

  try {
    if (!token) {
      res.status(403).json({ message: "Token não fornecido" });
    }

    Jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Ocorreu um Erro: " + error);
  }
};
