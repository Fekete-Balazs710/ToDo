import todo from "../model/todosModel.js";

//Read todo element by ID
const getByIdTodo = async (req, res) => {
    const t = await todo.findById({ _id: req.params.id })
    res.json(t)
}

export default getByIdTodo;