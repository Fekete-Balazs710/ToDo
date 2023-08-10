import { ObjectId } from "mongoose";

const editTodosCheck= () => {
    
    const todoEdit = (_id: ObjectId, isChecked: boolean) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isChecked }) // Send the new isEditing value
        }
        fetch("http://localhost:3000/todos/update/isChecked/" + _id, requestOptions)
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

export default editTodosCheck;