const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://gordonlzy:gordomongo123@eusoffapp.h9b6z.mongodb.net/eusoffapp";
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
    res.cookie("newUser", false);
    res.send("You got the cookies");
})

app.get('/read  -cookies', (req, res) => {
    const cookies = res.cookies;
    console.log(cookies);
    res.json(cookies);
})