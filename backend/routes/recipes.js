const express = require('express')
const {
    getRecipes,
    getRecipeInfo
} = require('../controllers/spoonacular')

const router = express.Router()

router.get('/query/:query', getRecipes)
router.get('/id/:id', getRecipeInfo)

module.exports = router