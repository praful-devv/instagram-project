const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imageKit = new ImageKit({
  privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
});
const jwt = require("jsonwebtoken")

const createPostController = async (req, res) => {
  
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message:"unauthorized Access"
    })
  }

  let decode;
  try {
     decode = await jwt.verify(token, process.env.JWT_SECRETS);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized Access",
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "post",
    folder:"post_img"
  });

  const post = await postModel.create({
    caption:req.body.caption,
    post_img:file.url,
    createdBy:decode.id
  })

  res.status(201).json({
    message: "post created",
  });
};

module.exports = { createPostController };
