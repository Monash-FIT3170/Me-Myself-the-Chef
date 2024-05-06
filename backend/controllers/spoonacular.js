const axios = require('axios')
const mongoose = require('mongoose')

const BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/'
const HEADERS = {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
}
const RECIPES = mongoose.connection.collection('recipes')


const getRecipes = async (req, res) => {
    // Returns the first 10 recipes matching a query
    const {query} = req.params

    const options = {
        method: 'GET',
        url: BASE_URL + 'recipes/complexSearch',
        params: {
            query: query
        },
        headers: HEADERS
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


const getRecipesByIngredients = async (req, res) => {
    // Returns recipes with the specified ingredients
    // http://localhost:4000/api/recipes/ingredients/chicken,garlic
    let {ingredients} = req.params

    const options = {
        method: 'GET',
        url: BASE_URL + 'recipes/findByIngredients',
        params: {
            ingredients: ingredients
        },
        headers: HEADERS
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
            return res.json(recipe)
        }

        // Otherwise make an API call to Spoonacular
        const options = {
            method: 'GET',
            url: BASE_URL + 'recipes/' + id + '/information',
            params: {
                includeNutrition: false,
                addWinePairing: false,
                addTasteData: false
            },
            headers: HEADERS
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
    getRecipes,
    getRecipesByIngredients,
    getRecipeInfo
}