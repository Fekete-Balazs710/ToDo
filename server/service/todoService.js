import TodoModel from "../model/todosModel.js";

class TodoService {
    async deleteTodo(todoId) {
        try {
            const tDelete = await TodoModel.findByIdAndDelete({ _id: todoId });
            return tDelete;
        } catch (error) {
            throw new Error("Error deleting todo");
        }
    }

    async getAllTodos() {
        try {
            const todos = await TodoModel.find();
            return todos;
        } catch (error) {
            throw new Error("Error retrieving todos");
        }
    }

    async getByIdTodo(todoId) {
        try {
            const t = await TodoModel.findById({ _id: todoId });
            return t;
        } catch (error) {
            throw new Error("Error retrieving todo by ID");
        }
    }

    async postTodos() {
        try {
            const newTodo = new TodoModel({
                title: "Todo Title", 
                description: "Todo Description",
                priority: "High",
                isChecked: false,
                date: Date.now()
            });
            const savedTodo = await newTodo.save();
            return savedTodo;
        } catch (error) {
            throw new Error("Error creating new todo");
        }
    }

    async updateIsChecked(todoId, isChecked) {
        try {
            const tUpdate = await TodoModel.findByIdAndUpdate(
                todoId,
                { $set: { isChecked } },
                { new: true }
            );
            return tUpdate;
        } catch (error) {
            throw new Error("Failed to update todo's isChecked");
        }
    }

    async update(todoId, title, description, priority) {
        try {
            const tUpdate = await TodoModel.findByIdAndUpdate(
                todoId,
                { $set: { title, description, priority } },
                { new: true }
            );
            return tUpdate;
        } catch (error) {
            throw new Error("Failed to update todo");
        }
    }
}

export default new TodoService();
