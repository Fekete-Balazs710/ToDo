import TodoService from "../service/todoService.js";

class TodoController {
    async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const deletedTodo = await TodoService.deleteTodo(id);
            res.json(deletedTodo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllTodos(req, res) {
        try {
            const todos = await TodoService.getAllTodos();
            res.json(todos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByIdTodo(req, res) {
        try {
            const { id } = req.params;
            const todo = await TodoService.getByIdTodo(id);
            res.json(todo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async postTodos(req, res) {
        try {
            const newTodo = await TodoService.postTodos();
            res.json(newTodo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateIsChecked(req, res) {
        try {
            const { id } = req.params;
            const { isChecked } = req.body;

            const updatedTodo = await TodoService.updateIsChecked(id, isChecked);
            res.json(updatedTodo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const { description } = req.body;
            const { priority } = req.body;

            const updatedTodo = await TodoService.update(id, title, description, priority);
            res.json(updatedTodo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TodoController();
