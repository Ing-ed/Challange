import bcrypt from 'bcrypt'

class HashService{
    constructor(){}
    CreateHash(pass){
        pass = bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
        return pass;
    }
    CompareHash(pass,user){
        console.log(pass,user,"CompareHash")
        return(bcrypt.compareSync(pass,user))
    }
}
export default HashService