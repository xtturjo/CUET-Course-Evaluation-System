import jwt from 'jsonwebtoken';
import errorHandler from '../utils/error.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); 


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("hedar natiiii");
  console.log(token);
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};