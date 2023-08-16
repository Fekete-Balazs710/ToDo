import TodoModel from "../model/todosModel.js";

class TodoService {
    async deleteTodo(req, res) {
        try {
            const tDelete = await TodoModel.findByIdAndDelete({ _id: req.params.id });
            res.json(tDelete);
        } catch (error) {
            res.status(500).json({ error: "Error deleting todo" });
        }
    }

    async getAllTodos(req, res) {
        try {
            const todos = await TodoModel.find();
            res.json(todos);
        } catch (error) {
            res.status(500).json({ error: "Error retrieving todos" });
        }
    }

    async getByIdTodo(req, res) {
        try {
            const t = await TodoModel.findById({ _id: req.params.id });
            res.json(t);
        } catch (error) {
            res.status(500).json({ error: "Error retrieving todo by ID" });
        }
    }

    async postTodos(req, res) {
        try {
            const newTodo = new TodoModel({
                title: "Todo Title", 
                description: "Todo Description",
                priority: "High",
                isChecked: false,
                isEditing: false,
                date: Date.now()
            });
            const savedTodo = await newTodo.save();
            res.json(savedTodo);
        } catch (error) {
            res.status(500).json({ error: "Error creating new todo" });
        }
    }

    async updateIsChecked(req, res) {
        try {
            const { isChecked } = req.body;
            const { id } = req.params;

            const tUpdate = await TodoModel.findByIdAndUpdate(
                id,
                { $set: { isChecked } },
                { new: true }
            );
            res.json(tUpdate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update todo's isChecked" });
        }
    }

    async updateDescription(req, res) {
        try {
            const { description } = req.body;
            const { id } = req.params;

            const tUpdate = await TodoModel.findByIdAndUpdate(
                id,
                { $set: { description } },
                { new: true }
            );
            res.json(tUpdate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update todo's description" });
        }
    }

    async updateIsEditing(req, res) {
        try {
            const { isEditing } = req.body;
            const { id } = req.params;

            // Update all todos with isEditing set to false except the one specified by ID
            await TodoModel.updateMany(
                { _id: { $ne: id } },
                { $set: { isEditing: false } }
            );

            // Update the specified todo's isEditing field
            const tUpdate = await TodoModel.findByIdAndUpdate(
                id,
                { $set: { isEditing } },
                { new: true }
            );
            res.json(tUpdate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update todo's isEditing" });
        }
    }

    async updatePriority(req, res) {
        try {
            const { priority } = req.body;
            const { id } = req.params;

            const tUpdate = await TodoModel.findByIdAndUpdate(
                id,
                { $set: { priority } },
                { new: true }
            );
            res.json(tUpdate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update todo's priority" });
        }
    }

    async updateTitle(req, res) {
        try {
            const { title } = req.body;
            const { id } = req.params;

            const tUpdate = await TodoModel.findByIdAndUpdate(
                id,
                { $set: { title } },
                { new: true }
            );
            res.json(tUpdate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update todo's title" });
        }
    }
}

export default new TodoService();