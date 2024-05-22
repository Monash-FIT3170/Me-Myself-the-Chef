const express = require('express')
const {
    complexSearch,
    getRecipes,
    getRecipeInfo,
    getRecipesByIngredients
} = require('../controllers/spoonacular')

const router = express.Router()

router.post('/complexSearch/', complexSearch)
router.get('/query/:query', getRecipes)
router.get('/id/:id', getRecipeInfo)
router.get('/ingredients/:ingredients', getRecipesByIngredients)

module.exports = router