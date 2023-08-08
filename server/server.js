import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TodosRoute from './router/todos.js';

//create the express app
const app = express();

//Handle CORS + middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//database connection
const uri = "mongodb+srv://feketebalazs710:nimbusz2000@cluster0.xrxiki8.mongodb.net/";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB");
})
.catch(err => console.log(err));

app.use(bodyParser.json())

//routes
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/todos', TodosRoute)

//start the server at port 3000
app.listen(3000, () => {
    console.log("Listening at port 3000")
});
