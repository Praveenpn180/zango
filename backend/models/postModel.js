const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
      
  },
    description: {type: String, required : true},
    likes: [],
   
   
    image: String,
  }, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
  
    timestamps: true,
  }
);

//populate comment
postSchema.virtual('comments', {
  ref: 'Comments',
  foreignField: 'postId',
  localField: '_id',
})


module.exports = mongoose.model("Posts", postSchema);