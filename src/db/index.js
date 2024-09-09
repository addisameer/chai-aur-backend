import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async() => {
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`Database connected : DB HOST - ${connectionInstance.connection.host}`);       
    } catch (error) {
        console.log(`Database connection failed ${error}`);             
    }
}


export default  connectDB