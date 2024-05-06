const express = require('express')
const {
    getRecipes,
    getRecipeInfo,
    getRecipesByIngredients
} = require('../controllers/spoonacular')

const router = express.Router()

router.get('/query/:query', getRecipes)
router.get('/id/:id', getRecipeInfo)
router.get('/ingredients/:ingredients', getRecipesByIngredients)

module.exports = router