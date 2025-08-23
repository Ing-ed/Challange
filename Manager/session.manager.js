import { userModel } from "../Models/user.model.js";
import HashService from "../Servides/password.services.js";
import TokenManager from "./token.manager.js";

const hashService = new HashService();
const tokenManager = new TokenManager();
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
            let passHash = hashService.CreateHash(pass);
            let result = await userModel.create({...info, pass:passHash});
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
            if(!hashService.CompareHash(pass,exist.pass)){
                return({result:"Error",payload:"Contraseña incorrecta"});
            }
            if(exist.pass !== pass){
                return({result:"Error",payload:"Usuario o contraseña incorrecos"});
            }
            const token = tokenManager.CreateToken({exist._id});
            return({result:"OK",payload:exist});
        }catch (error){
            return({result:"Error",payload:error.message});
        }
    }
}
export default SessionManager