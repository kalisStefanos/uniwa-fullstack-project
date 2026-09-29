import { randomBytes } from 'crypto'

export const codeGenerator = async () => {
  const code = await randomBytes(3).toString('hex').toUpperCase();
  return code;
};