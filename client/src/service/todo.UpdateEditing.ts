import { ObjectId } from "mongoose";

const editTodosEditingMode = () => {
    
    const todoEdit = (_id: ObjectId, isEditing: boolean) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isEditing }) // Send the new isEditing value
        }
        fetch("http://localhost:3000/todos/update/isEditing/" + _id, requestOptions)
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

export default editTodosEditingMode;