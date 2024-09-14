import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from "fs"

cloudinary.config({ 
    cloud_name : process.env.CLOUDNARY.CLOUD_NAME,
    api_key : process.env.CLOUDNARY_API_KEY, 
    api_secret : process.env.CLOUDNARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath)return null 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        console.log("file uploaded successfully",response.url)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
        
    }
}
