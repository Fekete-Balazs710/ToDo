import { ObjectId } from "mongoose";
import { ref } from "vue";
import { TodoType } from "../types/TodoType";

class TodoService {
  private todos = ref<TodoType[]>([]);

  constructor() {
    this.getAllTodos();
  }

  async getAllTodos() {
    try {
      const response = await fetch("http://localhost:3600/todos");
      const data = await response.json();
      this.todos.value = data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(_id: ObjectId) {
    try {
      await fetch(`http://localhost:3600/todos/delete/${_id}`, {
        method: "DELETE",
      });
      this.todos.value = this.todos.value.filter((todo) => todo._id !== _id);
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo() {
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
  
  async editTodoCheck(_id: ObjectId, isChecked: boolean) {
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

  async editTodoDescription(_id: ObjectId, description: string) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }) // Send the new description value
      };

      await fetch(`http://localhost:3600/todos/update/description/${_id}`, requestOptions);

      // Update the description property locally
      const todoToUpdate = this.todos.value.find((todo) => todo._id === _id);
      if (todoToUpdate) {
        todoToUpdate.description = description;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async editTodoEditingMode(_id: ObjectId, isEditing: boolean) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isEditing }) // Send the new isEditing value
      };

      await fetch(`http://localhost:3600/todos/update/isEditing/${_id}`, requestOptions);

      // Update the isEditing property locally
      const todoToUpdate = this.todos.value.find((todo) => todo._id === _id);
      if (todoToUpdate) {
        todoToUpdate.isEditing = isEditing;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async editTodoPriority(_id: ObjectId, priority: string) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority }) // Send the new priority value
      };

      await fetch(`http://localhost:3600/todos/update/priority/${_id}`, requestOptions);

      // Update the priority property locally
      const todoToUpdate = this.todos.value.find((todo) => todo._id === _id);
      if (todoToUpdate) {
        todoToUpdate.priority = priority;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async editTodoTitle(_id: ObjectId, title: string) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }) // Send the new title value
      };

      await fetch(`http://localhost:3600/todos/update/title/${_id}`, requestOptions);

      // Update the title property locally
      const todoToUpdate = this.todos.value.find((todo) => todo._id === _id);
      if (todoToUpdate) {
        todoToUpdate.title = title;
      }
    } catch (error) {
      console.error(error);
    }
  }

  getTodos() {
    return this.todos;
  }
}

const todoService = new TodoService();
export default todoService;
