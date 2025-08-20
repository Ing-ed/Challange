import mongoose from "mongoose";

const taskCollection = 'tasks';
const taskSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    }
})
export const taskModel = new mongoose.model(taskCollection,taskSchema);