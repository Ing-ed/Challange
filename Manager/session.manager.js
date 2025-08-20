import { userModel } from "../Models/user.model.js";

class SessionManager{
    constructor(){}
    
    async SignUP(info){
        const {email, pass} = info;
        console.log(info, "info")
        try{
            let exist = await userModel.findOne({email:email});
            console.log(exist)
            if (exist){
                return({result:"Error", payload:"Error: éste email ya se encuentra registrado"});
            }
            let result = await userModel.create(info);
            console.log("usuario creado", result)
            return({result:"OK",payload:"Usuario registrado con exito"});
        } catch (error){
            return({result:"Error",payload:error.message});
        }
    }
    async Login(info){
        const {email, pass} = info;
        try{
            let exist = await userModel.findOne({email:email});
            if(!exist){
                return({result:"Error",payload:"El usuaio no se encontro"});
            }
            if(exist.pass !== pass){
                return({result:"Error",payload:"Usuario o contraseña incorrecos"});
            }
            return({result:"OK",payload:{email:exist.email,name:exist.name}});
        }catch (error){
            return({result:"Error",payload:error.message});
        }
    }
}
export default SessionManager