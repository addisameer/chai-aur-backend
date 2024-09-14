import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {  uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser= asyncHandler(async(req,res)=>{
  // take users data from frontend
  //Apply validation - not empty 
  //check if user is already exist - email , username 
  //check for images - check for avatar
  //upload them to cloudinary - avatar
  //create a user object - upload the entry in db
  //remove password and refresh token from response
  //check for user creation.
  //send a response.




  // take users data from frontend
  const {userName,email,fullName,password,avatar,coverImage}=req.body
  //Apply validation 
  if(!(userName&&email&&fullName&&password)){
    console.log("All fields required");
  }

  //Already existing user or not 
  const existingUser =await User.findOne({
    $or : [{email},{userName}]
  })
  if(existingUser){
    console.log("Already registered");
   
  }

  //heck for local images
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath=req.files?.coverImage[0].path

  //check for avatar
  if(!avatarLocalPath){
    console.log("Avatar is not uploaded in local path");
  }
  //upload files on cloudnary
  const avatarResponse =await uploadOnCloudinary(avatarLocalPath)
  const coverImageResponse =await uploadOnCloudinary(coverImageLocalPath)

  //
  if(!avatarResponse){
    console.log("Avatar is not uploaded in cloudinary")
  }


  //create a object
const user = await User.create({
    userName,
    email,
    fullName,
    password,
    avatar:avatarResponse.url,
    coverImage : coverImageResponse?.url || ""

  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    console.log("User is not registered in db");
  }




  //validate avatar
  if(!response){
    console.log("Avatar not uploaded on cloudnary");
  }


  res.status(200).json({
    message : "user registered successfully"
  })
})

const loginUser ={}


export {registerUser,loginUser}