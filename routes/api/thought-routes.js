const router = require("express").Router()
const {
    getThoughts,
    createThought,
    getThought,
    updateThought,
    deleteThought
} = require("../../controllers/thought-controller.js")

router.route('/').get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

module.exports = router