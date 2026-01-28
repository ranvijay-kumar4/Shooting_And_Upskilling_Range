import express from 'express';
import parser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

let todo = ["Data"];

app.use(parser.json());

app.get('/api/hello', (req, res) => {
    res.json({message: "Hello World"});
});

app.get('/api/todo', (req, res) => {
    res.json(todo);
});

app.post('/api/todo', (req, res) => {

});


app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
});