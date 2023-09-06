import todoController from '../controller/todoController';
import UserModel from '../model/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import { requireAuth, checkUser } from '../middleware/authMiddleware';

const router = Router();

// Get user by email
router.get('/users/email/:email', todoController.getUserByEmail);

// Add new user to the database on signup
router.post('/users/new', todoController.addUser);

// Get user credentials
router.get('/users/credentials/:userId', todoController.getUserCredentials);

router.post('/login', todoController.login);

router.delete('/logout/:userId', todoController.logout);

export default router;