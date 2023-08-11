import todo from "../model/todosModel.js";

//Delete todo element by ID
const deleteTodo = async (req, res) => {
    const tDelete = await todo.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
}

export default deleteTodo;