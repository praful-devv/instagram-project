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
            message:isUserExists.email?"user already exists":"username is already taken"
        })
    }

    if(!password){
        return res.status(400).json({
            message:"password is required"
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

const loginController = async(req,res)=>{
    const {username,email,password} = req.body

    const isUserExists = await userModel.findOne({
        $or:[
            {username},{email}
        ]
    })

    if(!isUserExists){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password,isUserExists.password)

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:isUserExists._id
    },process.env.JWT_SECRETS,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(200).json({
        message:"login successfully",
        user:{
            username:isUserExists.username,
            email:isUserExists.email,
            bio:isUserExists.bio,
            profile_img:isUserExists.profile_img
        }
    })

}

module.exports = {registerController,loginController} 