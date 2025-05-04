import express from "express";
import { login, logout, onBoard, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/onboarding",protectRoute,onBoard)


router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})

export default router;
