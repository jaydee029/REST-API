require("dotenv").config
const path=require("path")
const bcrypt=require("bcrypt")
const fs=require("fs").promises
const jwt=require("jsonwebtoken")
const { writeFile } = require("fs")

//create functionalities such as authenticating a user , creating a new user , finding a user
const { JWT_SECRET }=process.env
const userFilePath=path.join(__dirname,"../../db/user,js")


const findUser=async({id , email})=>{
    const users=JSON.parse(await fs.readFile(userFilePath))
    users.find((user)=>{
        user.id===parseInt(id) || user.email===email
    })

const authenticate=async({id,email,password})=>{
    const user=find({email})

    const ispassword= await bcrypt.compare(password,user.password)

    const token=jwt.sign({id:user.id},JWT_SECRET,{
        expiresIn: 24 * 60 * 60, 
    })

    return {token}

}

const create=async({name, email ,password})=>{
    const users=JSON.parse(await fs.readFile(userFilePath))

    const newUser={
        id:length(users)+1,
        email,
        name,
        
        password:await bcrypt.hash(password,10)
    }

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
        expiresIn: 24 * 60 * 60, 
      });

    users.push(newUser)

    await fs.writeFile(userFilePath,JSON.stringify(users))

    return {token}
}



module.exports={
    findUser,
    create,
    authenticate
}
}