import express from "express";
import todo from "../model/todosModel.js"

import getAllTodos from '../service/todo.GetAll.js'
import postTodos from "../service/todo.Post.js";
import getByIdTodos from "../service/todo.GetById.js";
import deleteTodo from "../service/todo.Delete.js";
import updateIsEditing from "../service/todo.UpdateEditing.js";
import updateIsChecked from "../service/todo.UpdateCheck.js";
import updatePriority from "../service/todo.updatePriority.js";
import updateTitle from "../service/todo.updateTitle.js";
import updateDescription from "../service/todo.updateDescription.js";

const router = express.Router();

// Get all todo routes
router.get('/', getAllTodos)

// Create new todo
router.post('/new', postTodos)

// Get todo by id
router.get('/get/:id', getByIdTodos)

// Delete a todo by id
router.delete('/delete/:id', deleteTodo)

// Update isEditing property of todo by id
router.put('/update/isEditing/:id', updateIsEditing);

// Update isChecked property of todo by id
router.put('/update/isChecked/:id', updateIsChecked);

// Update priority property of todo by id
router.put('/update/priority/:id', updatePriority);

// Update title property of todo by id
router.put('/update/title/:id', updateTitle);

// Update description property of todo by id
router.put('/update/description/:id', updateDescription);

export default router;
