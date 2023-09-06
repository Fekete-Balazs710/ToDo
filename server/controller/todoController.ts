import { Request, Response } from 'express';
import TodoService from '../service/todoService';
import UserModel from '../model/userModel';
import { createHash } from 'crypto';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import todoService from '../service/todoService';

class TodoController {
    async deleteTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedTodo = await TodoService.deleteTodo(id);
            res.json(deletedTodo);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllTodos(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const todos = await TodoService.getAllTodos(userId);
            res.json(todos);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByIdTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const todo = await TodoService.getByIdTodo(id);
            res.json(todo);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async postTodos(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const newTodo = await TodoService.postTodos(userId);
            res.json(newTodo);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateIsChecked(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { isChecked } = req.body;

            const updatedTodo = await TodoService.updateIsChecked(id, isChecked);
            res.json(updatedTodo);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, description, priority } = req.body;

            const updatedTodo = await TodoService.update(id, title, description, priority);
            res.json(updatedTodo);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async search(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { searchQuery } = req.body;
    
            const filteredTodos = await TodoService.searchTodos(userId, searchQuery);
            res.json(filteredTodos);
    
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async sort(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { attribute } = req.body;
    
            const sortedTodos = await TodoService.sortTodos(userId, attribute);
            res.json(sortedTodos);
    
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error: any) {
            console.error('Error fetching user by email:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async addUser(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;

            // Hashing the password using SHA-256
            const hashedPassword = createHash('sha256').update(password).digest('hex');

            // Save the user to the database
            const savedUser = await TodoService.addUser(firstName, lastName, email, hashedPassword);

            res.json(savedUser);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserCredentials(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const userCredentials = await TodoService.getUserCredentials(userId);
            res.json(userCredentials);

        } catch(error: any) {

        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
  
        try {
            // Check if the user with the provided email exists
            const user = await UserModel.findOne({ email }).select('+password');
        
            if (!user) {
                console.log('user email does not exist');
                return res.status(400).json({ error: 'Invalid credentials' });
            }
        
            console.log('User email correct');
        
            // Hash the provided password using sha256
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        
            // Check if the hashed password matches the stored hashed password
            if (hashedPassword !== user.password) {
                console.log('User password incorrect');
                return res.status(400).json({ error: 'Invalid credentials' });
            }
        
            console.log('User password correct');
            // Generate a JWT token
            const token = jwt.sign({ userId: user._id, firstName: user.firstName, lastName: user.lastName }, '12345', {
                expiresIn: '1h', // Set the token expiration time
            });
        
            // Send the token in a cookie
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
            
            console.log("Token: " + token);

            //save the userId and authToken to whitelist collection
            const userId = user._id;
            await todoService.addUserToWhitelist(userId, token);

            res.status(200).json({ user, token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const deletedUser = await TodoService.deleteFromWhitelist(userId);
            res.json(deletedUser);

        } catch(error: any) {

        }
    }
}

export default new TodoController();
