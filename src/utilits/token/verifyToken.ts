import jwt from "jsonwebtoken";

interface VerifyTokenArgs {
  token: string;
  SIGNATURE: string;
}

export const verifyToken = ({ token, SIGNATURE }: VerifyTokenArgs): any => {
  return jwt.verify(token, SIGNATURE);
};
