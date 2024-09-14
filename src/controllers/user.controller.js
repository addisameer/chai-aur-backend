import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser= asyncHandler(async(req,res)=>{
    res.status(200).json({
      message : "register page post api sb set hai ab to "
    })
  
})
const loginUser= asyncHandler(async(req,res)=>{
  res.status(200).json({
    message : "ok"
  })
})



export {registerUser,loginUser}