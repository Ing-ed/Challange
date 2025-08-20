import mongoose from "mongoose";
const userCollection = 'users';

/**
 * Schema of user collection in mongoDB
 */
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        default:"user"
    }
});
export const userModel = new mongoose.model(userCollection,userSchema);