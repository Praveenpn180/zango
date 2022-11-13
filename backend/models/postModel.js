const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
    description: {type: String, required : true},
    likes: [],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Posts", postSchema);