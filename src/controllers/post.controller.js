const postModel = require("../models/post.model")


const createPostController = (req,res)=>{
    const { caption, createdBy } = req.body;
    const file = req.file

    console.log(caption)
    console.log(file)


}

module.exports = {createPostController}