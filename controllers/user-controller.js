const {
    User, Thought
} = require("../models")

const userController = {
    getUsers(req, res) {
        user.find()
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        })
    }
}