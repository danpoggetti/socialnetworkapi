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
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
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

// userSchema.virtual("friendCount").get(() => {
//     return this.friends.length
// })

const User = model("user", userSchema)

const userController = {
    getUsers(req, res) {
        User.find()
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        })
    },

    getSingleUser(req, res) {
        User.findOne({_id:req.params.userId})
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        })
    },
    addUser(req, res) {
        User.create(req.body)
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // delete user (BONUS: and delete associated thoughts)
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
    
            // BONUS: get ids of user's `thoughts` and delete them all
            //return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
          })
          .then(() => {
            res.json({ message: 'User and associated thoughts deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

}
module.exports = userController