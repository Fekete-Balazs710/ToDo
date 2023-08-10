import { ObjectId } from "mongoose";

const editTodosDescription = () => {
    
    const todoEdit = (_id: ObjectId, description: string) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }) // Send the new isEditing value
        }
        fetch("http://localhost:3000/todos/update/description/" + _id, requestOptions)
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

export default editTodosDescription;