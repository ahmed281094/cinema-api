import bcrypt from "bcrypt";

interface HashArgs {
  password: string;
  SALT_ROUNDS?: string | number | undefined;
}

export const Hash = async ({ password, SALT_ROUNDS }: HashArgs): Promise<string> => {
  const rounds = Number(SALT_ROUNDS ?? process.env.SALT_ROUNDS ?? 12);

  return bcrypt.hash(password, rounds);
};

