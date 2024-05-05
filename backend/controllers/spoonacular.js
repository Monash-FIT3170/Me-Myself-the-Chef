const axios = require('axios');

const BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/'
const HEADERS = {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
}


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


const getRecipeInfo = async (req, res) => {
    // Returns full information for a specific recipe
    const {id} = req.params

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
        const response = await axios.request(options)
        console.log(response.data)
        return res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
}

module.exports = {
    getRecipes,
    getRecipeInfo
}