import jwt from "jsonwebtoken";

interface GenerateTokenArgs {
  payload: Record<string, any>;
  SIGNATURE: string;
  option?: jwt.SignOptions;
}

export const generateToken = ({ payload = {}, SIGNATURE, option }: GenerateTokenArgs): string => {
  return jwt.sign(payload, SIGNATURE, option);
};
