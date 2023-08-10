import { ObjectId } from "mongoose";

const deleteTodos = () => {
    
    const todoDelete = (_id: ObjectId) => {
        fetch("http://localhost:3000/todos/delete/" + _id, { method: "DELETE"})
            .then(() => {  })
    }

    return {
        todoDelete
    }
}

export default deleteTodos;