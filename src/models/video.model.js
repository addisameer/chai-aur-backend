import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
     videoFile : {
        type : string, //cloudnary url 
        required : true 
     },
     thunbnail : {
        type : string,  
        required : true
     },
     title : {
        type : string,  
        required : true
     },
     description :   {
        type : string,  
        required : true
     },
     duration : {
        type :Number,  //cloudnary 
        required : true
     },
     views : {
        type : Number,
        default : 0 
     },
     ispublished :{
        type : Boolean ,
        default :true
     },
     owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
     }
},{timestamps})
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)