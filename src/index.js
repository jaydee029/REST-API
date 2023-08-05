const express=require("express")
const auth=require("./middleware/auth")
const recipesrouter=require("./router/recipes.js")
const usersrouter=require("./router/users.js")
const app=express()
const cors= require("cors")

app.use(cors())

app.use((req,res,next)=>{
    const {method,path}=req;
    console.log(`New Request to ${method}${path} at ${new Date().toISOString()}`)
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/api/src/recipes");
});

app.use('/api/src/recipes',recipesrouter)
app.use('/api/src/users',usersrouter)
app.use(auth.initialize())

const port =process.env.PORT ||8080

app.listen(port,()=>{
    console.log(`The server is up at port ${port}.`)
})