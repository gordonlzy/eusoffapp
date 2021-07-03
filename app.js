const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const User = require('./models/User');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
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
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/meal', requireAuth, (req, res) => res.render('meal'));
app.get('/laundry', requireAuth, (req, res) => res.render('laundry'));
app.get("/profile/:id", requireAuth, (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.render('profile', { viewedUser: result, title: "User profile" });
        })
        .catch(err => {
            console.log(err);
            res.render("404", { title: "User not found" });
        })
});
app.post("/profile/:id", requireAuth, (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.redirect(`/profile/${id}`);
        })
        .catch(err => {
            console.log(err);
            res.render("404", { title: "User not found" });
        })
});

// auth routes
app.use(authRoutes);

// requests routes
app.use('/favours', requireAuth, requestRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})