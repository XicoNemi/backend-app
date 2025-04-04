import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
  
  if (!user) {
    throw new Error('User is undefined');
  }

  const payload = {
    userId: user.id,
    email: user.email,
    type: user.type,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
  return token;
};
