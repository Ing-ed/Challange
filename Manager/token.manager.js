
import jwt from "jsonwebtoken"

class TokenManager{
    constructor(secret = "mobyDick"){
        this.SECRET =secret;
    }
    CreateToken(user){
        // //console.log(user, "user")
        const token = jwt.sign(user,this.SECRET)
        return token;
    }
    VeryfyToken(token){
        try{
            const result = jwt.verify(token,this.SECRET)
            console.log(result,"decoded")
            return result
        } catch (e){
            return({})
            //console.log("error -> ", e)
        }
    }
}
export default TokenManager
