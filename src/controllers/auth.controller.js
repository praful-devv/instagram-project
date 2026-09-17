const userModel = require("../models/auth.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerController = async(req,res)=>{
    const {username,email,password,bio,profile_img} = req.body

    const isUserExists = await userModel.findOne({

        $or:[
            {username},
            {email}
        ]
    })

    if(isUserExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password,12)

    const user = await userModel.create({
        username,email,password:hash,bio,profile_img
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRETS,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user created successfully",
        user:{
            name:user.username,
            email:user.email,
            bio:user.bio,
            profile_img:user.profile_img
        }
    })

}

module.exports = {registerController} 