import { ref } from "vue"
import { TodoType } from "../types/TodoType"

const todos2 = ref<TodoType[]>([]);

const getAllTodos = () => {
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

    return {
        todos2,
        GetAllTodos
    }
}

export default getAllTodos;