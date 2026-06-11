export const generateToken = (id, email, role) => {
  const payload = {
    id,
    email,
    role,
  };

  const token = require('jsonwebtoken').sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  return token;
};
