import todoController from '../controller/todoController';
import UserModel from '../model/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import { requireAuth, checkUser } from '../middleware/authMiddleware';

const router = Router();

export default router;