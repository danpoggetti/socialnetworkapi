const {Schema, model} = require ("mongoose")
const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
        },

        thoughts: [
            {
                type: Schema.Type.ObjectId,
                ref: "Thought",
            }
        ],

        friends: [
            {
                type: Schema.Type.ObjectId,
                ref: "User",
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

userSchema.virtual("friendCount").get(() => {
    return this.friends.length
})

const User = model("User", userSchema)
model.exports = User