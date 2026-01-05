import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;

  if(!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

  const token = jwt.sign({userId}, ENV.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.cookie('jwt', token, {
    httpOnly: true, // prevent XSS attack
    secure: ENV.NODE_ENV === 'development' ? false : true,
    sameSite: 'strict', // prevent CSRF attack 
    maxAge: 7 * 24 * 60 * 60 * 1000 //ms

  })
};