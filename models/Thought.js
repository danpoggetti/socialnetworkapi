const {Schema, model} = require ("mongoose")
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
        },

        username: {
            type: String,
            required: true,
        },

        thoughts: [reactionSchema],
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