import TodoModel from "../model/todosModel";
import UserModel from "../model/userModel";
import ArchiveModel from "../model/archiveModel";

const priorityValues: Record<string, number> = {
    'High': 3,
    'Medium': 2,
    'Low': 1,
};

class TodoService {
    async deleteTodo(todoId: string) {
        try {
            const todoToDelete = await TodoModel.findById(todoId);

            if (!todoToDelete) {
                throw new Error("Todo not found");
            }

            // Archive the todo before deleting
            const archivedTodo = new ArchiveModel({
                title: todoToDelete.title,
                description: todoToDelete.description,
                priority: todoToDelete.priority,
                isChecked: todoToDelete.isChecked,
                date: todoToDelete.date,
                userId: todoToDelete.userId
            });

            await archivedTodo.save();

            // Delete the todo from the main collection
            const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
            
            return deletedTodo;
        } catch (error) {
            throw new Error("Error deleting todo");
        }
    }

    async getAllTodos(userId: string) {
        try {
            const todos = await TodoModel.find({ userId });
            return todos;
        } catch (error) {
            throw new Error("Error retrieving todos");
        }
    }

    async getByIdTodo(todoId: string) {
        try {
            const t = await TodoModel.findById({ _id: todoId });
            return t;
        } catch (error) {
            throw new Error("Error retrieving todo by ID");
        }
    }

    async postTodos(userId: string) {
        try {
            const newTodo = new TodoModel({
                title: "Todo Title", 
                description: "Todo Description",
                priority: "High",
                isChecked: false,
                date: Date.now(),
                userId: userId
            });
            const savedTodo = await newTodo.save();
            return savedTodo;
        } catch (error) {
            throw new Error("Error creating new todo");
        }
    }

    async updateIsChecked(todoId: string, isChecked: boolean) {
        try {
            const tUpdate = await TodoModel.findByIdAndUpdate(
                todoId,
                { $set: { isChecked } },
                { new: true }
            );
            return tUpdate;
        } catch (error) {
            throw new Error("Failed to update todo's isChecked");
        }
    }

    async update(todoId: string, title: string, description: string, priority: string) {
        try {
            const tUpdate = await TodoModel.findByIdAndUpdate(
                todoId,
                { $set: { title, description, priority } },
                { new: true }
            );
            return tUpdate;
        } catch (error) {
            throw new Error("Failed to update todo");
        }
    }

    async searchTodos(userId: string, searchQuery: string) {
        try {
            const todos = await TodoModel.find({ userId });
            const filteredTodos = todos.filter(todo => 
                searchQuery
                    .toLowerCase()
                    .split(" ")
                    .every(v => (todo.title.toLowerCase().includes(v) || (todo.description as string).toLowerCase().includes(v)))
            );
            return filteredTodos;
        } catch (error) {
            throw new Error('Error searching todos: ' + error);
        }
    }

    async sortTodos(userId: string, attribute: string) {
        try {
            const todos = await TodoModel.find({ userId });
    
            return todos.sort((a: any, b: any) => {
                switch (attribute) {
                    case 'title':
                        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                    case 'description':
                        return a.description.toLowerCase().localeCompare(b.description.toLowerCase());
                    case 'priority':
                        return priorityValues[b.priority] - priorityValues[a.priority];
                    case 'date':
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    default:
                        return 0;
                }
            });
        } catch (error) {
            throw new Error('Error sorting todos: ' + error);
        }
    }

    async addUser(firstName: string, lastName: string, email: string, hashedPassword: string) {
        try {
            const newUser = new UserModel({
                firstName,
                lastName,
                email,
                password: hashedPassword, 
            });

            const savedUser = await newUser.save();

            console.log(savedUser);

            return savedUser;

        } catch (error) {
            throw new Error("Failed to add user");
        }
    }

    async getUserCredentials(userId: string) {
        try {
            const t = await UserModel.findById({ _id: userId });
            return t;
        } catch (error) {
            throw new Error("Error retrieving user by ID");
        }
    }
}

export default new TodoService();
