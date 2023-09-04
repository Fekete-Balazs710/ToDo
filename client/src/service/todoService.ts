import { ObjectId } from "mongoose";
import { ref } from "vue";
import { TodoType } from "../types/TodoType";
import UpdatedTodoType from "../types/UpdatedTodoType";
import { UserType } from "../types/UserType";
class TodoService {
  private todos = ref<TodoType[]>([]);
  private credentials = ref(null);
  // constructor(userId: string) {
  //   this.getAll(userId);
  // }

  async getAll(userId: string) {
    try {

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      this.todos.value = data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async delete(_id: ObjectId) {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/delete/${_id}`, {
        method: "DELETE",
      });
      this.todos.value = this.todos.value.filter((todo) => todo._id !== _id);
    } catch (error) {
      console.log(error);
    }
  }

  async create(userId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/new/${userId}`, {
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

      await fetch(`${import.meta.env.VITE_BASE_URL}/update/isChecked/${_id}`, requestOptions);

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

      await fetch(`${import.meta.env.VITE_BASE_URL}/update/${_id}`, requestOptions);

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

  async fetchFilteredTodos(userId: string, searchQuery: string) {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/search/${userId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch filtered todos');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching filtered todos:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  async sortTodos(userId: string, attribute: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sort/${userId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ attribute }),
      });

      if (!response.ok) {
          throw new Error('Failed to sort todos');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error sorting todos:', error);
  }
  }

  async getUserByEmail(email: String) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/email/${email}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user by email');
        }
        
        const data = await response.json();
        return data; // Return the user data if found
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

  async postUser(newUser: UserType) {
    try {
      
     const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newUser),
     }

     await fetch(`${import.meta.env.VITE_BASE_URL}/users/new`, requestOptions)
    } catch (error) {
      console.error(error);
    }
  }

  async getUserCredentials(userId: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/credentials/${userId}`);
        const data = await response.json();
        this.credentials.value = data; 
    } catch (error) {
        console.log(error);
    }
  }

  get() {
    return this.todos;
  }

  getCredentials() {
    return this.credentials;
  }
}

const todoService = new TodoService();

export default todoService;
