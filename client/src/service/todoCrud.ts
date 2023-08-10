import { ref } from "vue"
import { TodoType } from "../types/TodoType"

const todos2 = ref<TodoType[]>([]);

const getTodos = () => {
    const GetAllTodos = async () => {
        try {
            await fetch("http://localhost:3000/todos")
                .then(res => res.json())
                .then(data => {
                    todos2.value = data;
                });
        } catch (error) {
            console.log(error);
        }
    }

    const todoCreate = () => {
        fetch("http://localhost:3000/todos/new", { method: "POST"})
    }

    return {
        todos2,
        GetAllTodos,
        todoCreate
    }
}

export default getTodos;
