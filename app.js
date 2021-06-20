const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

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