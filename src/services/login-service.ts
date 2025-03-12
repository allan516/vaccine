import { generateToken } from "../auth/auth";
import { ILogin } from "../models/ILogin";

export const loginService = async (data: ILogin) => {
  const username = process.env.NAME;
  const password = process.env.PASSWORD;

  try {
    if (username !== data.name || password !== data.password) {
      throw new Error("Usuário ou senha inválido.");
    } else {
      const response = generateToken(data);
      return response;
    }
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
  }
};
