const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const imageKit = new ImageKit({
  privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
});


const createPostController = async(req,res)=>{
//     const { caption, createdBy } = req.body;
    

   const file = await imageKit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:'post'
   })

   res.status(200).json({
    message:"post created"
   })


}

module.exports = {createPostController}