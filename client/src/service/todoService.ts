import { ObjectId } from "mongoose";
import { ref } from "vue";
import { TodoType } from "../types/TodoType";
import UpdatedTodoType from "../types/UpdatedTodoType";
class TodoService {
  private todos = ref<TodoType[]>([]);

  constructor() {
    this.getAll();
  }

  async getAll() {
    try {
      const response = await fetch("http://localhost:3600/todos");
      const data = await response.json();
      this.todos.value = data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(_id: ObjectId) {
    try {
      await fetch(`http://localhost:3600/todos/delete/${_id}`, {
        method: "DELETE",
      });
      this.todos.value = this.todos.value.filter((todo) => todo._id !== _id);
    } catch (error) {
      console.log(error);
    }
  }

  async add() {
    try {
      const response = await fetch("http://localhost:3600/todos/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const savedTodo = await response.json();
      this.todos.value.push(savedTodo);
    } catch (error) {
      console.log(error);
    }
  }
  
  async editCheck(_id: ObjectId, isChecked: boolean) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked }) // Send the new isChecked value
      };

      await fetch(`http://localhost:3600/todos/update/isChecked/${_id}`, requestOptions);

      // Update the isChecked property locally
      const todoToUpdate = this.todos.value.find((todo) => todo._id === _id);
      if (todoToUpdate) {
        todoToUpdate.isChecked = isChecked;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async update(_id: ObjectId, updatedTodo: UpdatedTodoType) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            title: updatedTodo.title, 
            description: updatedTodo.description, 
            priority: updatedTodo.priority })
      };

      await fetch(`http://localhost:3600/todos/update/${_id}`, requestOptions);

      // Update the description property locally
      const todoToUpdate = this.todos.value.find((todo) => todo._id === _id);
      if (todoToUpdate) {
        todoToUpdate.title = updatedTodo.title;
        todoToUpdate.description = updatedTodo.description;
        todoToUpdate.priority = updatedTodo.priority;
      }
    } catch (error) {
      console.error(error);
    }
  }

  get() {
    return this.todos;
  }
}

const todoService = new TodoService();
export default todoService;
