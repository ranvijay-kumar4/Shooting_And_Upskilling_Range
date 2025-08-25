const express = require("express");
const {connectMongoDb} = require('./connection');
const {logReqRes} = require('./middlewares')
const userRouter = require('./routes/user')



const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/ranvijay-app1")

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));



app.user("/user", userRouter);


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));