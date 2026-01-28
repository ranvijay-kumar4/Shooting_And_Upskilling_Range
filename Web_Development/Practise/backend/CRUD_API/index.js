import express from 'express';
import parser from 'body-parser';

const app = express();
app.use(parser.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});