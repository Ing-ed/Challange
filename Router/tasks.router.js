import { Router } from "express";
import TaskManager from "../Manager/tasks.manager.js";
import TokenManager from "../Manager/token.manager.js";


const taskManager = new TaskManager();
const tokenManager = new TokenManager();

const router = new Router();

router.get("/getusertasks", async (req,res)=>{
    const cookie = req.cookies.auth
    console.log("obtension de cuki", cookie)
    const uid = tokenManager.VeryfyToken(cookie)
    console.log(uid, "uid getTask");
    if(!uid){
        res.send({result:"Error",payload:{name:"Error de autenticacion TASKROUTER"}})
        // res.redirect("/login")
    }
    console.log(uid)
    const result = await taskManager.GetAll({uid:uid});
    console.log(result,"result")
    res.send(result);
})

router.post("/newtask",async (req,res) =>{
    const cookie = req.cookies?.auth
    const uid = tokenManager.VeryfyToken(cookie)
    if(!uid){
        res.send({result:"Error",payload:{name:"Error de autenticacion 2"}})
        // res.redirect("/login")
    }
    console.log("newtask",{...req.body,uid:uid})
    const result = await taskManager.Create({...req.body,uid:uid});
    console.log(result,"Resultado")
    res.send(result);
})

router.put("/updatetask",async (req,res) =>{
    const cookie = req.cookies?.auth
    const uid = tokenManager.VeryfyToken(cookie)
    if(!uid){
        res.send({result:"Error",payload:{name:"Error de autenticacion 3"}})
        // res.redirect("/login")
    }
    console.log("updateTask",req.body);
    const result = await taskManager.Update(req.body);
    console.log(result);
    res.send(result);
})

router.put("/checktask",async (req,res) =>{
    const cookie = req.cookies?.auth
    const uid = tokenManager.VeryfyToken(cookie)
    if(!uid){
        res.send({result:"Error",payload:{name:"Error de autenticacion 4"}})
        // res.redirect("/login")
    }
    console.log("checktask");
    const result = await taskManager.Check(req.body);
    console.log(result);
    res.send(result);
})

router.delete("/deletetask",async (req,res)=>{
    const cookie = req.cookies?.auth
    const uid = tokenManager.VeryfyToken(cookie)
    if(!uid){
        res.send({result:"AuthError",payload:{name:"Error de autenticacion 5"}})
        // res.redirect("/login")
    }
    console.log("deleteTask");
    const result = await taskManager.Delete(req.body);
    console.log("resultDelete",result);
    res.send(result);
})
export default router