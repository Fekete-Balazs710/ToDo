import { ObjectId } from "mongoose";

const editTodosPriority = () => {
    
    const todoEdit = (_id: ObjectId, priority: string) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priority }) // Send the new isEditing value
        }
        fetch("http://localhost:3000/todos/update/priority/" + _id, requestOptions)
            .then(res => res.json())
            .then(res => { console.log(res) })
            .catch(error => {
                console.error(error);
            });
    }

    return {
        todoEdit
    }
}

export default editTodosPriority;