import { Router } from "express";
import SessionManager from "../Manager/session.manager.js";


const sessionManager = new SessionManager();

const router = new Router();

router.get("/",(req,res)=>{
    res.send("OK");
})

router.post("/signup",async (req,res)=>{
    console.log("req.body= ",req.body)
    const result = await sessionManager.SignUP(req.body);
    console.log("result", result)
    res.send(result);
})

router.post("/login",async (req,res)=>{
    const result = await sessionManager.Login(req.body);
    console.log(result,"result post")
    if(result.result === "OK"){
        console.log("generar cookie");
        res.cookie("auth",result.payload.token,{sameSite:'None',httponly:false,secure:true}).send(result)
    } else {
        res.send(result);
    }
})
export default router;