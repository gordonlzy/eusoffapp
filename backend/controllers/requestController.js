const Request = require('../models/Request');
const User = require('../models/User');

// handle error
const handleErrors = (err, userCredit) => {
    console.log(err.message, err.code);
    let errors = { category: "", credit: "", remark: "" };

    // insufficient credits
    if (err.message === "insufficient credit") {
        errors.credit = `not enough credits, you have ${userCredit} credits left`;
    }

    if (err.message === "zero credit") {
        errors.credit = `don't be cheap, give some credits`;
    }

    if (err.message === "zero user credit") {
        errors.credit = `you have no credits left, go do some good`;
    }

    return errors;
};

module.exports.request_index = (req, res) => {
    Request.find().sort({ createdAt: -1 })
        .then(async (result) => {
            const requests = result.map(async (request) => {
                const ownerName = await User.findById(request.owner)
                    .then(owner => {
                        return owner.name;
                    })
                    .catch(err => console.log(err));
                // request.ownerName = ownerName;
                // return request;
                return { ownerName: ownerName, ...request._doc };
            });
            const requestWithOwnerName = await Promise.all(requests);
            // res.render('favours/requests', { requests: requestWithOwnerName, title: "Eusoff Favours" });
            res.json({ requests: requestWithOwnerName, title: "Eusoff Favours", user: req.verifiedUser });
        })
        .catch((err) => console.log(err));
}

module.exports.request_create_get = (req, res) => {
    // res.render('favours/create', { title: "Create a new request" });
    res.json({ title: "Create a new request", user: req.verifiedUser });
}

module.exports.request_create_post = async (req, res) => {
    const { category, credit, remark, owner, status, userID } = req.body;
    const user = await User.findById(userID);
    const userCredit = user.credit;
    const newUserCredit = userCredit - credit;
    try {
        if (parseInt(credit) > parseInt(userCredit)) {
            throw Error("insufficient credit");
        } 
        if (parseInt(credit) == 0) {
            throw Error("zero credit");
        } 
        if (parseInt(userCredit) == 0) {
            throw Error("zero user credit");
        } 

        const update = await User.findByIdAndUpdate(userID, { credit: newUserCredit })
            .catch(err => console.log(err));
        const request = new Request({ category, credit, remark, owner, status, pendingCredit: credit });
        request.save()
            .then(result => {
                res.status(200).json({ user: user._id });
            })
            .catch(err => console.log(err));
        }
    catch (err) {
        const errors = handleErrors(err, userCredit);
        res.status(400).json({ errors });
    }
}

module.exports.request_details = (req, res) => {
    const id = req.params.id;
    Request.findById(id)
        .then(async result => {
            const owner = await User.findById(result.owner);
            const takenBy = await User.findById(result.takenBy);
            // const resultWithOwnerTaker = result;
            // resultWithOwnerTaker.ownerName = owner.name;
            if (takenBy !== null) {
                // resultWithOwnerTaker.takerName = takenBy.name;
                return { takerName: takenBy.name, ownerName: owner.name, ...result._doc };
            }
            return { ownerName: owner.name, ...result._doc };
            // return resultWithOwnerTaker;
        })
        .then(result => {
            // res.render('favours/details', { request: result, title: "Request details" });
            res.json({ request: result, title: "Request details" });
        })
        .catch(err => {
            console.log(err);
            // res.render("404", { title: "Request not found" });
            res.json({ title: "Request not found" });
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
    console.log(req.body);
    const id = req.params.id;
    Request.findByIdAndUpdate(id, req.body)
        .then(result => {
            console.log("edited correctly");
            res.redirect("/favours");
        })
        .catch(err => console.log(err));
}

module.exports.request_takeRequest_post = (req, res) => {
    const { takenBy } = req.body;
    const id = req.params.id;
    Request.findByIdAndUpdate(id, { status: "Taken", takenBy })
        .then(result => {
            res.json({ redirect: "/favours" });
        })
        .catch(err => console.log(err));
};

module.exports.request_remove_post = (req, res) => {
    const { userID } = req.body;
    const id = req.params.id;
    Request.findByIdAndUpdate(id, { status: "Available", takenBy: undefined })
        .then(result => {
            res.json({ redirect: `/profile/${userID}` });
        })
        .catch(err => console.log(err));
};

module.exports.request_complete_post = async (req, res) => {
    const { userID, takenByID } = req.body;
    const id = req.params.id;
    const pendingCreditTransfer = await Request.findById(id)
        .then(result => {
            return result.pendingCredit;
        })
        .catch(err => console.log(err));
    console.log("takenByID", takenByID);
    const credit = await User.findOne({ _id: takenByID })
        .then(result => {
            return result.credit;
        })
        .catch(err => console.log(err));
    console.log("credit", credit);
    console.log("pendingCreditTransfer", pendingCreditTransfer);
    const newUserCredit = credit + pendingCreditTransfer;
    console.log("newUserCredit", newUserCredit);
    const update = await User.findOneAndUpdate({ _id: takenByID }, { credit: newUserCredit })
        .catch(err => console.log(err));
    Request.findByIdAndUpdate(id, { status: "Completed", pendingCredit: 0 })
        .then(result => {
            res.json({ redirect: `/profile/${userID}` });
        })
        .catch(err => console.log(err));
}