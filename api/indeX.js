import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Import cors
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

// Load environment variables from .env
dotenv.config({ path: './.env' });

// Log the port value for debugging
console.log('PORT:', process.env.PORT);

const PORT = parseInt(process.env.PORT, 10) || 3300;

console.log(`PORT: "${PORT}" (type: ${typeof PORT})`);

const app = express(); // Define the Express application instance

// Middleware// Enable CORS with default settings
app.use(express.json());
app.use(cookieParser());

app.get('/api/test-cookies', (req, res) => {
  console.log('Cookies:', req.cookies);
  console.log(req);
  
  res.json({ receivedCookies: req.cookies});
});


app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your React frontend
    credentials: true, // Allow cookies and authentication headers

  })
)

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => { // Use app.listen to start the server
      console.log(`MongoDB is connected. Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
 // const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
