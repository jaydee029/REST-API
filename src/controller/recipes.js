const services=require('../services/recipes.js')

const recipeExists=async(req,res,next)=>{
    const recipe=await services.get(req.params.id)

    if(recipe===undefined){
        const error= new Error("Recipe not found")
        error.statuscode=404
        next(error)
    }else{
        res.locals.recipe=recipe
        next()
    }
}

const getAll=async(req,res,next)=>{
    try{
       res.json({data:await services.getRecipes()})
      
    }catch(error){
        next(error)
    }
}

const get=async(req,res,next)=>{
    try{
       /* const recipe=await services.get(req.params.id)
        if(recipe ===undefined){
            const error=new Error("Recipe not found")
            error.statuscode=404
            throw error
        }*/

        //res.json({data :recipe})
        res.json({data: res.locals.recipe})
    }catch(error){
        next(error)
    }
}

const save=async(req,res,next)=>{
    try{
        const{
            name,
            healthLabels,
            cookTimeMinutes,
            prepTimeMinutes,
            ingredients
        }=req.body

        const newRecipes={
            name,
            healthLabels:[...healthLabels],
            cookTimeMinutes,
            prepTimeMinutes,
            ingredients:[...ingredients]
        }
        res.status(201).json({data: await services.save(newRecipes)})
    }
    catch(error){
        next(error)
    }
}

const update=async(req,res,next)=>{
    try{
    /*    const recipe=await services.getAll(req.params.id)

        if (recipe==undefined){
            const error=new Error("Recipe not found")
            error.statuscode=404
            throw error
        }*/

        const {
            name,
            healthLabels,
            cookTimeMinutes,
            prepTimeMinutes,
            ingredients,
        }=req.body

        const updated=await services.update(req.params.id,{
            name,
            healthLabels:[...healthLabels],
            cookTimeMinutes,
            prepTimeMinutes,
            ingredients:[...ingredients]
        })

        res.json({data :updated})
    }catch(error){
        next(error)
    }
}

const remove=async(req,res,next)=>{
    try{
      /*  const recipes= await services.getAll(req.params.id)

        if (recipes===undefined){
            const error=new Error("Recipes not found")
            error.statuscode=404
            throw error
        }*/
        await services.remove(req.params.id)
        res.sendStatus(204)
    }catch(error){
        next(error)
    }
}


module.exports={getAll,
    save,
    get:[recipeExists,get],
    remove:[recipeExists,remove],
    update:[recipeExists,update]
}