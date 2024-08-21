const axios = require('axios')
const mongoose = require('mongoose')

const BASE_URL = 'https://api.spoonacular.com/'
const API_KEY = process.env.SPOONACULAR_API_KEY
const RECIPES = mongoose.connection.collection('recipes')


const complexSearch = async (req, res) => {
    // To use this one send a POST request with query, ingredients and preferences (all are optional)
    let {query, ingredients, preferences, excIngredients} = req.body
    console.log(req.body)

    // Process list of ingredients.
    let ingredientsString = ""
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsString += ingredients[i].title
        // check to add ",+"
        if (i !== (ingredients.length - 1)) {
            ingredientsString += ","
        }
    }

        // Process list of ingredients.
    let excludeIngredientsString = ""
    for (let i = 0; i < excIngredients.length; i++) {
        excludeIngredientsString += excIngredients[i].title
        // check to add ",+"
        if (i !== (excIngredients.length - 1)) {
            excludeIngredientsString += ","
        }
    }

    console.log(ingredientsString)
    console.log(excludeIngredientsString)

    // Process list of diets.
    const diets = preferences ? preferences.dietaryRequirements : []
    let dietString = ""
    for (i = 0; i < diets.length; i++) {
        if (diets[i].state) {
            dietString += diets[i].name

            if (i < (diets.length - 1)) {
                dietString += ","
            }
        }
    }

    let diet_array = diets.filter(diet => diet.state)
    diets1 = diet_array.map(diet => diet.name)
    dietString = diets1.join()

    // Process list of allergies
    const allergies = preferences ? preferences.allergies : []
    let allergiesString = ""
    for (i = 0; i < allergies.length; i++) {
        allergiesString += allergies[i].title
        if (i < (allergies.length - 1)) {
            allergiesString += ","
        }
    }

    //--------------------------------------------------------------------              <-OOOO
    // Process list of cuisines to exclude.
    const cuisines = preferences ? preferences.cuisines : []
    let cuisinesString = ""
    for (i = 0; i < cuisines.length; i++) {
        if (cuisines[i].state) {
            cuisinesString += cuisines[i].name

            if (i < (cuisines.length - 1)) {
                cuisinesString += ","
            }
        }
    }

    // Processlist of nutritional preferences
    const nutritions = preferences ? preferences.nutrition : []
    const minEnergy = nutritions[0].min_amount
    const maxEnergy = nutritions[0].max_amount
    const minProtein = nutritions[1].min_amount
    const maxProtein = nutritions[1].max_amount 
    const minTotalFat = nutritions[2].min_amount
    const maxTotalFat = nutritions[2].max_amount
    const minSaturatedFat = nutritions[3].min_amount
    const maxSaturatedFat = nutritions[3].max_amount
    const minCarbs = nutritions[4].min_amount
    const maxCarbs = nutritions[4].max_amount
    const minSugar = nutritions[5].min_amount
    const maxSugar = nutritions[5].max_amount
    const minSodium = nutritions[6].min_amount
    const maxSodium = nutritions[6].max_amount

    // Process max prep time
    const maxPrepTime = preferences ? preferences.maxPrepTime : 180

    console.log("diet: " + dietString)
    if (query) {
        console.log("query: " + query)
    }

    console.log("allergies: " + allergiesString)
    console.log("ingredients: " + ingredientsString)
    console.log("exclude ingredients: " + excludeIngredientsString)

    const options = {
        method: 'GET',
        url: BASE_URL + 'recipes/complexSearch',
        params: {
            apiKey: API_KEY,
            query: query,
            diet: dietString,
            intolerances: allergiesString,
            includeIngredients: ingredientsString,
            excludeIngredients: excludeIngredientsString,

            // new prefs
            maxReadyTime: maxPrepTime,
            cuisine: cuisinesString,
            
            minCalories: minEnergy,
            maxCalories: maxEnergy,
            minProtein: minProtein, 
            maxProtein: maxProtein,
            minCarbs: minCarbs,
            maxCarbs: maxCarbs,
            minSugar: minSugar,
            maxSugar: maxSugar,
            minFat: minTotalFat,
            maxFat: maxTotalFat,
            minSaturatedFat: minSaturatedFat,
            maxSaturatedFat: maxSaturatedFat,
            minSodium: minSodium,
            maxSodium: maxSodium,
        }
    }

    try {
        const response = await axios.request(options)
        console.log(response.data)
        return res.status(200).json(response.data.results)
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
}


const getRecipes = async (req, res) => {
    // Returns the first 10 recipes matching a query
    const {query} = req.params

    const options = {
        method: 'GET',
        url: BASE_URL + 'recipes/complexSearch',
        params: {
            apiKey: API_KEY,
            query: query
        }
    }

    try {
        const response = await axios.request(options)
        return res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
}


const getRecipesByIngredients = async (req, res) => {
    // Returns recipes with the specified ingredients
    // http://localhost:8080/api/recipes/ingredients/chicken,garlic
    let {ingredients} = req.params

    const options = {
        method: 'GET',
        url: BASE_URL + 'recipes/findByIngredients',
        params: {
            apiKey: API_KEY,
            ingredients: ingredients
        },
    }
    try {
        const response = await axios.request(options)
        console.log(response.data)
        return res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
}


const getRecipeInfo = async (req, res) => {
    // Returns full information for a specific recipe
    // Saves API calls by storing the recipe into MongoDB such that
    // next calls to this recipe will be fetched from the database
    const {id} = req.params
    let recipe

    try {
        // Check if recipe exists in MongoDB
        recipe = await RECIPES.findOne({_id: parseInt(id)})
        if (recipe) {
            console.log('Recipe found in MongoDB')
            return res.json(recipe.recipe)
        }

        // Otherwise make an API call to Spoonacular
        const options = {
            method: 'GET',
            url: BASE_URL + 'recipes/' + id + '/information',
            params: {
                apiKey: API_KEY,
                includeNutrition: true,
                addWinePairing: false,
                addTasteData: false
            },
        }
        try {
            // Make request
            const apiRes = await axios.request(options)
            if (apiRes.status !== 200) {
                return res.status(404).json({error: 'Could not find recipe'})
            }
            recipe = apiRes.data
            // Store recipe in MongoDB
            await RECIPES.insertOne({_id: recipe.id, recipe: recipe})
            console.log('Recipe fetched from Spoonacular and stored into MongoDB')
            return res.status(200).json(recipe)
        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

module.exports = {
    complexSearch,
    getRecipes,
    getRecipesByIngredients,
    getRecipeInfo
}