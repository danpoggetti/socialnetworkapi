const router = require ("express").Router()
const {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser
} = require("../../controllers/user-controller")

router.route("/").get(getUsers).post(addUser)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)
module.exports = router