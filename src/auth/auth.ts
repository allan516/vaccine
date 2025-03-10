import Jwt from "jsonwebtoken";

export const generateConst = (payload: object) => {
  return Jwt.sign(payload, process.env.JET_SECRET as string, {
    expiresIn: "1h",
  });
};
