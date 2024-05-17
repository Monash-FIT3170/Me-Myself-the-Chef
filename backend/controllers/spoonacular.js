const axios = require('axios')
const mongoose = require('mongoose')

const BASE_URL = 'https://api.spoonacular.com/'
const API_KEY = process.env.SPOONACULAR_API_KEY
const RECIPES = mongoose.connection.collection('recipes')


const complexSearch = async (req, res) => {
    // To use this one send a POST request with query, ingredients and preferences
    let {query, ingredients, preferences} = req.body
    console.log(req.body)
    // Process list of ingredients.
    let ingredientsString = ""
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsString += ingredients[i].title
        // check to add ",+"
        if (i !== (ingredients.length - 1)) {
            ingredientsString += ",+"
        }
    }

    // Process list of diets.
    const diets = preferences ? preferences.dietaryRequirements : []
    let dietString = ""
    for (let i = 0; i < diets.length; i++) {
        if (diets[i].state) {
            dietString += diets[i].name
        }
        if (i !== (ingredients.length - 1)) {
            dietString += ","
        }
    }

    // Process list of allergies
    const allergies = preferences ? preferences.allergies : []
    let allergiesString = ""
    for (let i = 0; i < allergies.length; i++) {
        allergiesString += allergies[i].title
        if (i !== (ingredients.length - 1)) {
            allergiesString += ","
        }
    }

    // Process max prep time
    const maxPrepTime = 20  // preferences ? preferences.maxPrepTime : 20

    const options = {
        method: 'GET',
        url: BASE_URL + 'recipes/complexSearch',
        params: {
            apiKey: API_KEY,
            query: query,
            diet: dietString,
            intolerances: allergiesString,
            includeIngredients: ingredientsString,
            maxReadyTime: maxPrepTime
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