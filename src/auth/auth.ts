import Jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return Jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
