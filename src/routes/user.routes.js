import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

//not understood this code , till now only this and custom error and response api not understood.
router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1

        },
        {
            name : "coverImage", 
            maxCount : 1

        }

    ]),
    registerUser)




export default router 