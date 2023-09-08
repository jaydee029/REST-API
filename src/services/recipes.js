const fs=require('fs').promises
const path=require('path')

const recipesfilepath=path.join(__dirname,"../../db/recipes.json")

const getRecipes=async()=>JSON.parse(await fs.readFile(recipesfilepath))

const get =async(id)=>{
    const recipes =await getRecipes()
    return recipes.find((recipe)=>
        recipe.id===parseInt(id)
    )
}

const save=async(recipe)=>{
    const recipes= await getRecipes()
    recipe.id=recipes.length+1

    recipes.push(recipe)

    await fs.writeFile(recipesfilepath,JSON.stringify(recipes))

    return recipe
}

const update =async(id, update)=>{
    const recipes=await getRecipes()
    update.id===parseInt(id)

    const updatedrecipes= recipes.map((recipe)=>{
        recipe.id===parseInt(id) ? update :recipe
    })

    await fs.writeFile(recipesfilepath,JSON.stringify(updatedrecipes))

    return update
}

const remove=async(id)=>{
    const recipes=await getRecipes()

    const newRecipes=recipes.map((recipe)=>{
        recipe.id===parseInt(id)? null: recipe
    })
    .filter((recipe)=>recipe!==null)

    await fs.writeFile(recipesfilepath,JSON.stringify(newRecipes))

}
module.exports={getRecipes,save,get,remove,update}