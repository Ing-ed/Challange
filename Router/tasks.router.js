import { Router } from "express";
import TaskManager from "../Manager/tasks.manager.js";


const taskManager = new TaskManager();

const router = new Router();

router.get("/getusertasks/:uid", async (req,res)=>{
    const {uid} = req.params;
    console.log(uid)
    const result = await taskManager.GetAll({uid:uid});
    console.log(result,"result")
    res.send(result);
})

router.post("/newtask",async (req,res) =>{
    console.log("newtask",req.body)
    const result = await taskManager.Create(req.body);
    console.log(result,"Resultado")
    res.send(result);
})

router.put("/updatetask",async (req,res) =>{
    console.log("updateTask",req.body);
    const result = await taskManager.Update(req.body);
    console.log(result);
    res.send(result);
})

router.put("/checktask",async (req,res) =>{
    console.log("checktask");
    const result = await taskManager.Check(req.body);
    console.log(result);
    res.send(result);
})

router.delete("/deletetask",async (req,res)=>{
    console.log("deleteTask");
    const result = await taskManager.Delete(req.body);
    console.log("resultDelete",result);
    res.send(result);
})
export default router