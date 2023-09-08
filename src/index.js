const express=require("express")
const auth=require("./middleware/auth")
const recipesrouter=require("./router/recipes.js")
const usersrouter=require("./router/users.js")
const app=express()
const cors= require("cors")
const path=require("path")

app.use(cors())

app.use((req,res,next)=>{
    const {method,path}=req;
    console.log(`New Request to ${method}${path} at ${new Date().toISOString()}`)
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicdir=path.join(__dirname,"./public");
app.use(express.static(publicdir));

app.get("/:id", (req, res) => {
    res.redirect(`/api/src/recipes/${req.params.id}`);
});

app.use('/api/src/recipes',recipesrouter)
app.use('/api/src/users',usersrouter)
app.use(auth.initialize())

const port =process.env.PORT ||8080

app.listen(port,()=>{
    console.log(`The server is up at port ${port}.`)
})