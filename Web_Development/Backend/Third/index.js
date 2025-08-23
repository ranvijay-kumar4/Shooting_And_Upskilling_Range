const express = require("express");
const users = require("./MOCK_DATA.json")
// Will use https://www.mockaroo.com/ for fake data

const app = express();
const PORT = 8000;


// HTML FORMAT

app.get('/users', (req, res ) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `

    res.send(html);
});

// JSON FORMAT
// /api/name -> is good practice of representation

// For all users api/users
app.get('/api/users', (req, res) => {
    return res.json(users);
    // This will provide JSON data on webpage
});

// :variable_name ->Dynamic Path Parameters anything written after :

app.route('/api/users/:id')
.get((req, res ) => {
    const id = Number(req.params.id);
    const user = user.find((user) => user.id === id);

    return res.json(user);
})
.patch((req, res) => {
    return res.json({status : "pending"});
})
.delete((req, res) => {
    return res.json({status : "pending"});
});


// For individual user api/users/12



// .get('/api/users/:id', (req, res ) => {
//     const id = Number(req.params.id);
//     const user = user.find((user) => user.id === id);

//     return res.json(user);
// });


app.post('/api/users', (req, res) => {
    return res.json({status : "pending"});
});


// app.patch('/api/users/:id', (req, res) => {
//     return res.json({status : "pending"});
// });


// app.delete('/api/users/:id', (req, res) => {
//     return res.json({status : "pending"});
// });







app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
// Change the start script in package.json for npm start command