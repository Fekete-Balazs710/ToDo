import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import TodosRoute from './router/todos';
import UsersRoute from './router/users';
import dotenv from 'dotenv';

// create the express app
const app = express();
app.use(cors());

// Load the environment variables from .env file
dotenv.config();

// Handle CORS + middleware
app.use(function(req: express.Request, res: express.Response, next: () => void) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'auth-token, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Use cookie-parser middleware
app.use(cookieParser());

// database connection
const uri = process.env.MONGO_CONNECTION_STRING!;
const options: ConnectOptions = {
  dbName: 'todo_Fekete_Balazs'
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log('Successfully connected to MongoDB: ' + mongoose.connection.name);
  })
  .catch((err: Error) => console.log(err));

app.use(bodyParser.json());

// routes
app.get('/', (req: express.Request, res: express.Response) => {
 
});

app.use('/todos', TodosRoute);

app.use('/users', UsersRoute);

// start the server at the given port from .env file
const port = process.env.PORT!;
app.listen(port, () => {
  console.log('Listening at port ' + port);
});
