const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
       
        required: [true, 'Post is required'],
    },
    userId: {
        type: Object,
        required: [true, 'User is required'],
        ref: 'User',
    },
    comment: {
        type: String,
        required: [true, "Comment description is required"]
    },
    
},
    {
        timestamps: true
    })
    module.exports = mongoose.model("Comments", commentSchema)
