const postTodos = () => {
    
    const todoCreate = () => {
        fetch("http://localhost:3000/todos/new", { method: "POST"})
    }

    return {
        todoCreate
    }
}

export default postTodos;