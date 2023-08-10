import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TodosRoute from './router/todos.js';
import dotenv from 'dotenv'; 

//create the express app
const app = express();
app.use(cors());

//Load the environment variables from .env file
dotenv.config();

//Handle CORS + middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//database connection
const uri = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "todo_Fekete_Balazs"
})
.then(() => {
    console.log("Successfully connected to MongoDB: " + mongoose.connection.name);
})
.catch(err => console.log(err));

app.use(bodyParser.json())

//routes
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/todos', TodosRoute)

//start the server at the given port from .env file
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening at port " + port)
});
