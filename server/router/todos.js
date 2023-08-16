import express from "express";
import todo from "../model/todosModel.js"

import todoController from '../controller/todoController.js'

const router = express.Router();

// Get all todo routes
router.get('/', todoController.getAllTodos)

// Create new todo
router.post('/new', todoController.postTodos)

// Get todo by id
router.get('/get/:id', todoController.getByIdTodo)

// Delete a todo by id
router.delete('/delete/:id', todoController.deleteTodo)

// Update isChecked property of todo by id
router.put('/update/isChecked/:id', todoController.updateIsChecked);

//Update title, description and priority
router.put('/update/:id', todoController.update);

export default router;
