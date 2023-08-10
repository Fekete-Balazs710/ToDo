import { ObjectId } from "mongoose";

const editTodosTitle = () => {
    
    const todoEdit = (_id: ObjectId, title: string) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }) // Send the new isEditing value
        }
        fetch("http://localhost:3000/todos/update/title/" + _id, requestOptions)
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

export default editTodosTitle;