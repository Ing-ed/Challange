import { taskModel } from "../Models/tasks.model.js";
import mongoose from "mongoose";

class TaskManager{
    constructor(){}
    async Create(info){
        try{
            let result = await taskModel.create(info);
            return({result:"OK",payload:result});
        } catch (error){
            return({result:"Error",payload:error.message});
        }
    }
    async Update(info){
        const {tid,field,value} = info;
        console.log(info,"info");
        let update = {$set:{}}
        update.$set[field] = value
        console.log(update,"update");
        try{
            let exist = await taskModel.findOne({_id:new mongoose.Types.ObjectId(tid)});
            if(!exist){
                return({result:"Error",payload:"La tarea no se encontró"});
            }
            let result = await taskModel.updateOne({_id:tid},update);
            return({result:"OK",payload:result});
        } catch(error){
            return({result:"Error",payload:error.message});
        }
    }
    async Check(info){
        const {tid} = info;
        try{
            let exist = await taskModel.findOne({_id:tid});
            console.log(exist,"MANAGER")
            if(!exist){
                return({result:"Error",payload:"La tarea no se encontró"});
            }
            let result = await taskModel.updateOne({_id:tid},{completed:!exist._doc.completed});
            
            return({result:"OK",payload:{...exist._doc, completed:!exist._doc.completed}});
        } catch(erro){
            return({result:"Error",payload:error.message});
        }
    }
    async GetAll(info){
        const {uid} = info;
        try{
            // let result = await taskModel.find();
            let result = await taskModel.find({uid:uid});
            if(!result){
                return({result:"Error",payload:"El usuario tiene tareas"});
            }
            return({resutl:"OK",payload:result});
        }catch (error){
            return({result:"Error",payload:error.message});
        }
    }
    async Delete(info){
        const {tid} = info;
        try{
            const exist = await taskModel.findOne({_id:tid});
            if(!exist){
                return({result:"Error",payload:"La tarea no se encontro"});
            }
            let result = await taskModel.deleteOne({_id:tid});
            return({result:"OK",payload:"Tarea eliminada"});
        } catch (error){
            return({result:"Error",payload:error.message})
        }
    }
}

export default TaskManager