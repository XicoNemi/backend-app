import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const comparePassword = async (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, receivedPassword);
};
