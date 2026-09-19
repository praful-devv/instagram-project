const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
   caption:String,
   profile_img:{
    type:String,
    require:true,
   },
   createdBy:{
    ref:"users",
    type:mongoose.Schema.Types.ObjectId
   }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel