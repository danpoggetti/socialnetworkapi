const {Schema, model} = require ("mongoose")
const reactionSchema = new Schema (
    {
        reactionBody: {
            type: String,
            required: true,
            trim: true,
        },

        username: {
            type: String,
            required: true,
        },

    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

model.exports = reactionSchema