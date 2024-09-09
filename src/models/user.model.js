import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    userName : {
        type : string ,
        required : true ,
        unique : true ,
        lowercase : true ,
        trim : true ,
        index : true 
    },
    email :{
        type : string ,
        required : true ,
        unique : true ,
        lowercase : true ,
        trim : true 
    },
    fullName : {
        type : string ,
        required : true ,
        trim : true ,
        index : true
    },
    password : {
        type : string ,// we have to encrypt password wit bcrypt package
        required : true 
    },
    avatar : {
        type : string ,//cloudnary Url 
        required : true 
    },
    coverImage : {
        type : string ,//cloudnary url 
       
    },
    watchHistory :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video"
    }],
    refreshToken :{
        type : string 
    }
},{timestamps})

//it is middleware(hook) , used to hashed the password before saving to the data base.
userSchema.pre("save" , async function(next){
    if(!this.isModified("this.password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})
//this function is used to compare the password.
userSchema.methods.isPasswordCorrect = async function(password){
    return  await bcrypt.compare(this.password,password)
}
userSchema.methods.generateAccessToken = function (){
         return jwt.sign(
        {
          _id :this._id,
          email : this.email,
          userName : this.userName,
          fullName :this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
   {
     _id :this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
    
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
   }
)
}
export const User = mongoose.model("User",userSchema)