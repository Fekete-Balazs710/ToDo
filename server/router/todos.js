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
        title: "Title", 
        description: "Todo Description",
        priority: "High",
        isChecked: false,
        isEditing: false,
        date: Date.now()
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

// Update isEditing property of todo by id
router.put('/update/isEditing/:id', async (req, res) => {
    const { isEditing } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update all todos with isChecked set to false except the one specified by ID
        await todo.updateMany(
            { _id: { $ne: id } }, // Update all documents except the one specified by ID
            { $set: { isEditing: false } }
        );

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { isEditing } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
});

// Update isChecked property of todo by id
router.put('/update/isChecked/:id', async (req, res) => {
    const { isChecked } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { isChecked } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
});

// Update priority property of todo by id
router.put('/update/priority/:id', async (req, res) => {
    const { priority} = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { priority } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
});

// Update title property of todo by id
router.put('/update/title/:id', async (req, res) => {
    const { title } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { title } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
});

// Update description property of todo by id
router.put('/update/description/:id', async (req, res) => {
    const { description } = req.body; // Extract the new isChecked value from the request body
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Update the specified todo's isChecked field
        const tUpdate = await todo.findByIdAndUpdate(
            id,
            { $set: { description } },
            { new: true }
        );
        res.json(tUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todos" });
    }
});

export default router;
