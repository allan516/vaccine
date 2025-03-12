import { generateToken } from "../auth/auth";
import { IHttpResponse } from "../models/IHttpResponse";
import { ILogin } from "../models/ILogin";
import * as httpResponse from "../utils/https-helper";

export const loginService = async (data: ILogin) => {
  const username = process.env.NAME;
  const password = process.env.PASSWORD;
  let response: IHttpResponse | null = null;

  try {
    if (username !== data.name || password !== data.password) {
      throw new Error("Usuário ou senha inválido.");
    } else {
      const token = generateToken(data);
      response = await httpResponse.ok(token);
      return response;
    }
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    response = await httpResponse.unauthorized();
    return response;
  }
};
