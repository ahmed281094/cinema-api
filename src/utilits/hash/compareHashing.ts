import bcrypt from "bcrypt";

interface CompareHashArgs {
  password: string;
  hashed: string;
}

export const compareHashing = async ({ password, hashed }: CompareHashArgs): Promise<boolean> => {
  return bcrypt.compareSync(password, hashed);
};
