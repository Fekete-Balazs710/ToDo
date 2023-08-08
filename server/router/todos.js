import express from "express";
import todo from "../model/todosModel.js"

const router = express.Router();

// Get all todo routes
router.get('/', async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
})

// Create new todo
router.post('/new', async (req, res) => {
    const newTodo = new todo({
        title: "New todo",
        description: "New description",
        priority: "High",
        isChecked: false
    });
    const savedTodo = await newTodo.save()
    res.json(savedTodo)
})

// Get todo by id
router.get('/get/:id', async (req, res) => {
    const t = await todo.findById({ _id: req.params.id })
    res.json(t)
})

// Delete a todo by id
router.delete('/delete/:id', async (req, res) => {
    const tDelete = await todo.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
})

// Update a todo by id
router.put('/update/:id', async (req, res) => {
    const tUpdate = await todo.updateOne(
        { _id: req.params.id },
        {
            title: "New updated todo",
            description: "New updated description",
            priority: "High",
            isChecked: false
        }
    )
    res.json(tUpdate)
})

export default router;
