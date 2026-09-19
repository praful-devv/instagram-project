const express = require("express")
const postController = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer");
const upload = multer({ Storage: multer.memoryStorage()});

postRouter.post("/", upload.single("post_img"),postController.createPostController);

module.exports = postRouter