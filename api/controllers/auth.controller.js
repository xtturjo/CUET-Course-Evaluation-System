import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); 

export const signup = async(req,res, next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        next(errorHandler(400, 'All fields are required'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
      } catch (error) {
        next(error);
      }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);
  
  if (!email || !password) {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true, // ✅ Prevents JavaScript access
      secure: false, // ✅ Set to true if using HTTPS (localhost doesn't need it)
      sameSite: 'lax', // ✅ Prevents CSRF issues, adjust as needed
    })
    .json(rest);
    
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    console.log("tr mare chudi");
    res
    .clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // Set to true if using HTTPS
    })
    .status(200)
    .json({ message: 'Signout successful' });
  } catch (error) {
    next(error); // Pass any errors to the global error handler
  }
};






