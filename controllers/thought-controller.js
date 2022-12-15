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

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

// thoughtSchema.virtual("reactionCount").get(() => {
//     return this.reactions.length
// })

const Thought = model("thought", thoughtSchema)

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .then(thoughtData => {
            res.json(thoughtData)
        })
        .catch(err => {
           console.log(err);
           res.json(err)
        })
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // create a thought
      createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => {
            // return User.findOneAndUpdate(
            //   { _id: req.body.userId },
            //   { $push: { thoughts: dbThoughtData._id } },
            //   { new: true }
            // );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }
    
            res.json({ message: 'Thought successfully created!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // update thought
      updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // delete thought
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
    
            // remove thought id from user's `thoughts` field
            // return User.findOneAndUpdate(
            //   { thoughts: req.params.thoughtId },
            //   { $pull: { thoughts: req.params.thoughtId } },
            //   { new: true }
            // );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
}

module.exports = thoughtController