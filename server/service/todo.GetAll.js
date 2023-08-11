import todo from "../model/todosModel.js";

//Get all todo elements from the database
const getAllTodos = async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
}

export default getAllTodos;