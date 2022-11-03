const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
     coverPicture: String,
     about: String,
     livesIn: String,
     worksAt: String,
     relationship: String,
     country: String,
     followers: [],
     following: [],
   
},
{timestamps:true}
)

module.exports =  mongoose.model("User", userSchema);