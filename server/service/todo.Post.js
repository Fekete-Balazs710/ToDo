import todo from "../model/todosModel.js";

//Add new todo element to database
const postTodos = async (req, res) => {
    const newTodo = new todo({
        title: "Todo Title", 
        description: "Todo Description",
        priority: "High",
        isChecked: false,
        isEditing: false,
        date: Date.now()
    });
    const savedTodo = await newTodo.save()
    res.json(savedTodo)
}

export default postTodos;