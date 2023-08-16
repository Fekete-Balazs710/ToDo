import express from "express";
import todo from "../model/todosModel.js"

import todoService from "../service/todoService.js";

const router = express.Router();

// Get all todo routes
router.get('/', todoService.getAllTodos)

// Create new todo
router.post('/new', todoService.postTodos)

// Get todo by id
router.get('/get/:id', todoService.getByIdTodo)

// Delete a todo by id
router.delete('/delete/:id', todoService.deleteTodo)

// Update isEditing property of todo by id
router.put('/update/isEditing/:id', todoService.updateIsEditing);

// Update isChecked property of todo by id
router.put('/update/isChecked/:id', todoService.updateIsChecked);

// Update priority property of todo by id
router.put('/update/priority/:id', todoService.updatePriority);

// Update title property of todo by id
router.put('/update/title/:id', todoService.updateTitle);

// Update description property of todo by id
router.put('/update/description/:id', todoService.updateDescription);

export default router;
