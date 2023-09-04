import todoController from '../controller/todoController';
import UserModel from '../model/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import { requireAuth, checkUser } from '../middleware/authMiddleware';

import crypto from 'crypto';

const router = Router();

//router.use(checkUser);

// Get all todo routes
router.get('/:userId', todoController.getAllTodos);

// Create new todo
router.post('/new/:userId', todoController.postTodos);

// Get todo by id
router.get('/get/:id', todoController.getByIdTodo);

// Delete a todo by id
router.delete('/delete/:id', todoController.deleteTodo);

// Update isChecked property of todo by id
router.put('/update/isChecked/:id', todoController.updateIsChecked);

// Update title, description, and priority
router.put('/update/:id', todoController.update);

//Search functionality for todos
router.post('/search/:userId', todoController.search);

//Sorting functionality for todos
router.post('/sort/:userId', todoController.sort);

// Get user by email
router.get('/users/email/:email', todoController.getUserByEmail);

// Add new user to the database on signup
router.post('/users/new', todoController.addUser);

// Get user credentials
router.get('/users/credentials/:userId', todoController.getUserCredentials);

router.post('/login', todoController.login);

export default router;
