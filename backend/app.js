const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const User = require('./models/User');
const Request = require('./models/Request');
const cors = require("cors");

const app = express();

// middleware
app.use(cors({ 
    // origin: 'http://localhost:3000',
    origin: true,
    credentials: true,
}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");

// database connection
const PORT = process.env.PORT || 8080;
const dbURI = "mongodb+srv://gordonlzy:gordomongo123@eusoffapp.h9b6z.mongodb.net/eusoffapp";
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
app.get('/', (req, res) => res.json({ title: "Home", user: req.verifiedUser }));
// app.get('/meal', requireAuth, (req, res) => res.render('meal'));
app.get('/meal', requireAuth, (req, res) => res.json({ title: 'meal', user: req.verifiedUser }));
// app.get('/laundry', requireAuth, (req, res) => res.render('laundry'));
app.get('/laundry', requireAuth, (req, res) => res.json({ title: 'laundry', user: req.verifiedUser }));
app.get("/profile/:id", requireAuth, (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(async result => {
            const requests = await Request.find({ owner: result._id });
            const getTakerName = await Promise.all(requests.map(async request => {
                const takerName = await User.findById(request.takenBy)
                    .then(taker => {
                        if (taker !== null) {
                            return taker.name;
                        }
                    })
                    .catch(err => console.log(err))
                // request.takerName = await takerName;
                // return request;
                return { takerName: takerName, ...request._doc };
            }));

            const requestsTaken = await Request.find({ takenBy: result._id });
            const getOwnerName = await Promise.all(requestsTaken.map(async request => {
                const ownerName = await User.findById(request.owner)
                    .then(owner => {
                        return owner.name;
                    })
                    .catch(err => console.log(err))
                // request.ownerName = await ownerName;
                // return request;
                return { ownerName: ownerName, ...request._doc };
            }));
            // res.render('profile', { viewedUser: result, requests: getTakerName, requestsTaken: getOwnerName, title: "User profile" });
            res.json({ viewedUser: result, requests: getTakerName, requestsTaken: getOwnerName, title: "User profile" });
        })
        .catch(err => {
            console.log(err);
            // res.render("404", { title: "User not found" });
            res.json({ title: "User not found" });
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
            // res.render("404", { title: "User not found" });
            res.json({ title: "User not found" });
        })
});

// auth routes
app.use(authRoutes);

// requests routes
app.use('/favours', requireAuth, requestRoutes);
// app.use('/favours', requestRoutes);

// 404 page
app.use((req, res) => {
    // res.status(404).render("404", { title: "404" });
    res.status(404).json({ title: "404" });
})