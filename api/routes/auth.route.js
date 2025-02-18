import express from 'express';
import { signup,signin, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post("/sigout",signout);

export default router;