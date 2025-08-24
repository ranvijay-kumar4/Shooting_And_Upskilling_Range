const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require('fs');

const mongoose = require("mongoose");

// Will use https://www.mockaroo.com/ for fake data

const app = express();
const PORT = 8000;

mongoose
    .connect('mongodb://127.0.0.1:27017/ranvijay-app1')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log('Mongo Error', err));


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
});

const user = mongoose.model("user", userSchema);






// Middleware
app.use(express.urlencoded({ extended: false }));

// Middleware created by .use -> with handler function -> request, response, next middleware
// app.use((req, res, next) => {
//     console.log("Hello From M 1");
//     req.myUserName = "Ranvijay";
//     next();
// });

// app.use((req, res, next) => {
//     console.log("Hello From M 2");
//     next();
// });
// myUserName is accessed by 2nd one too and we can change the request and response objects


app.use((req, res, next) => {
    app.use((req, res, next) => {
        fs.appendFile("log.txt", `\n ${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err, data) => {
            next();
        });
    });
});



// HTML FORMAT

// app.get('/users', (req, res) => {
//     const html = `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `
//     res.send(html);
// });


// HTML FORMAT

app.get('/users', async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `
    res.send(html);
});

app.get('/api/users', async(req, res) => {
    const allDbUsers = await User.find({});

    res.setHeader("X-MyName", "Ranvijay");
    return res.json(allDbUsers);
});


// JSON FORMAT
// /api/name -> is good practice of representation

// For all users api/users
// app.get('/api/users', (req, res) => {
//     return res.json(users);
    // This will provide JSON data on webpage
// });

// :variable_name ->Dynamic Path Parameters anything written after :

// app.route('/api/users/:id')
//     .get((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);

        // if(!user)
        //     return res.status(404).json({error: "User not found"});
        
        // return res.json(user);
//     })
//     .patch((req, res) => {
//         return res.json({ status: "pending" });
//     })
//     .delete((req, res) => {
//         return res.json({ status: "pending" });
//     });


app.route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json({error: "User not found"});

        return res.json(user);
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'})
        return res.json({ status: "pending" });
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id, "Success")
        return res.json({ status: "pending" });
    });



// For individual user api/users/12



// .get('/api/users/:id', (req, res ) => {
//     const id = Number(req.params.id);
//     const user = user.find((user) => user.id === id);

//     return res.json(user);
// });


app.post('/api/users', async (req, res) => {
    console.log("haa")
    const body = req.body;
    // All the data from frontend is present in body

    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields req..." });
    }

    users.push({ ...body, id: users.length + 1 });
    // To write file we require fs

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "Success", id: users.length });
    // });

    // We Do not have to do this above more instead we use
    
    
    // This will create user
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    }, {timestamps: true});

    console.log(result);

    return res.status(201).json({msg: "Success"});

    // return res.json({status : "pending"});
});


// app.patch('/api/users/:id', (req, res) => {
//     return res.json({status : "pending"});
// });


// app.delete('/api/users/:id', (req, res) => {
//     return res.json({status : "pending"});
// });







app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
// Change the start script in package.json for npm start command