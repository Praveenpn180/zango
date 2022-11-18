const asyncHandler = require("express-async-handler")
const PostModel = require("../models/postModel.js")
const CommentModel = require("../models/commentModel.js")
const mongoose = require("mongoose")
const cloudinaryUploadImg = require('../utils/cloudinary')
// creating a post

const createPost = asyncHandler(async (req, res) => {

  try {
    const newPost = new PostModel(req.body)
    await newPost.save();
    res.status(200).json(newPost);

  } catch (error) {
    res.status(500).json(error);
  }
}
)

//upload post
const uploadPost = asyncHandler(async (req, res) => {

  try {


    //   const imageResult = await cloudinary.uploader.upload(req.body.name, {
    //     folder: 'public/images',
    // })
    if (req.file) {
      const localPath = `public/images/${req.file.filename}`;
      const imgUploaded = await cloudinaryUploadImg(localPath);
      console.log(imgUploaded.url);
      await PostModel.create({
        ...req.body,

        image: imgUploaded?.url,
      });

      res.status(200).json("file upload successfully");

    } else {
      await PostModel.create({
        ...req.body,

      });
      res.status(200).json("post upload successfully");
    }


    // return res.status(200).json("file upload successfully")

  } catch (error) {
    res.status(500).json(error);
  }
}
)

//get all  post
const getAllPost = async (req, res) => {
  try {
    let posts = await PostModel.find()
      .populate("userId")
      .populate("comments")

      .sort({ createdAt: -1 })


    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }

}
//get Comment
const getComment = async (req, res) => {
  try {
    console.log(req.params.id);
    let comment = await CommentModel.find({"postId":req.params.id})
                .populate("userId")
                .sort({ createdAt: -1 })
               if (!comment[0]) {
                comment.push({"postId":req.params.id})
                res.status(200).json(comment)
               }else{
                res.status(200).json(comment)
               }
    
  } catch (error) {
    res.status(500).json(error)
  }

}

// get a post

const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) { }
};

// delete a post
const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
const likePost = async (req, res) => {

  const id = req.params.id;
  const userId = req.params.userId;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Add comment

const addComment = async (req, res) => {
try{
  console.log(req.body);
 // const post = await PostModel.findByIdAndUpdate(req.body.postId,{ $push: { comments:{"userId":req.body.userId,"comment":req.body.comment,"Date":new Date()} } });
const comment = await CommentModel.create({...req.body})
console.log(comment);
 return res.status(200).json("Post Commented");
}catch(err){
  console.log(err);
}

}


// Get timeline posts
const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  uploadPost,
  getPost,
  getAllPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  addComment,
  getComment
}