const {Schema, model} = require ("mongoose")
const thoughtSchema = new Schema (
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
            virtuals: true,
        },
        id: false
    }
)

thoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length
})

const Thought = model("Thought", thoughtSchema)
model.exports = Thought