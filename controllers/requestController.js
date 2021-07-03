const Request = require('../models/Request');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.request_index = (req, res) => {
    Request.find().sort({ createdAt: -1 })
        .then(async (result) => {
            const requests = result.map(async (request) => {
                const ownerName = await User.findById(request.owner)
                    .then(owner => {
                        return owner.name;
                    })
                    .catch(err => console.log(err));
                request.ownerName = ownerName;
                return request;
            });
            const requestWithOwnerName = await Promise.all(requests);
            res.render('favours/requests', { requests: requestWithOwnerName, title: "Eusoff Favours" });
        })
        .catch((err) => console.log(err))
}

module.exports.request_create_get = (req, res) => {
    res.render('favours/create', { title: "Create a new request" });
}

module.exports.request_create_post = (req, res) => {
    const request = new Request(req.body);
    request.save()
        .then(result => {
            res.redirect("/favours");
        })
        .catch(err => console.log(err));
}

module.exports.request_details = (req, res) => {
    const id = req.params.id;
    Request.findById(id)
        .then(async result => {
            const owner = await User.findById(result.owner);
            const takenBy = await User.findById(result.takenBy);
            const resultWithOwnerTaker = result;
            resultWithOwnerTaker.ownerName = owner.name;
            if (takenBy !== null) {
                resultWithOwnerTaker.takerName = takenBy.name;
            }
            return resultWithOwnerTaker;
        })
        .then(result => {
            res.render('favours/details', { request: result, title: "Request details" });
        })
        .catch(err => {
            console.log(err);
            res.render("404", { title: "Request not found" });
        })
}

module.exports.request_delete = (req, res) => {
    const id = req.params.id;
    Request.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/favours" });
        })
        .catch(err => console.log(err));
}

module.exports.request_edit_post = (req, res) => {
    const id = req.params.id;
    Request.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.redirect("/favours");
        })
        .catch(err => console.log(err));
}

module.exports.request_takeRequest_post = (req, res) => {
    const { takenBy } = req.body;
    const id = req.params.id;
    Request.findByIdAndUpdate(id, {status: "Taken", takenBy})
        .then(result => {
            res.json({ redirect: "/favours" });
        })
        .catch(err => console.log(err));
};