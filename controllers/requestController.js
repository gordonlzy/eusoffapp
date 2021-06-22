const Request = require('../models/Request');

module.exports.request_index = (req, res) => {
    Request.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('favours/requests', { requests: result, title: "Eusoff Favours" });
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
            res.redirect("/favours/requests");
        })
        .catch(err => console.log(err));
}

module.exports.request_details = (req, res) => {
    const id = req.params.id;
    Request.findById(id)
        .then(result => {
            res.render('favours/details', { request: result, title: "Request details" });
        })
        .catch(err => {
            console.log(err);
            res.render("404", { title: "Request not found" });
        })
}

module.exports.request_delete = (req, res) => {
    const id = req.param.id;
    Request.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "favours/requests" });
        })
        .catch(err => console.log(err));
}