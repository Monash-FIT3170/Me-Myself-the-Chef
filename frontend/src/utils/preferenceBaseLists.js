//base preference lists
//if you make changes to aby of these lists after running, you must clear the localStorage to see changes.

const baseDietaryList = [
    {id: 0, name: "Gluten Free", state: false},
    {id: 1, name: "Ketogenic", state: false},
    {id: 2, name: "Vegetarian", state: false},
    {id: 3, name: "Vegan", state: false},
    {id: 4, name: "Pescetarian", state: false}
]

const baseCuisineList = [
    {id: 0, name: "African", value: "african", state: false},
    {id: 1, name: "Asian", value: "asian", state: false},
    {id: 2, name: "American", value: "american", state:false},
    {id: 3, name: "British", value: "british", state: false},
    {id: 4, name: "Cajun", value: "cajun", state: false},
    {id: 5, name: "Caribbean", value: "caribbean", state: false},
    {id: 6, name: "Chinese", value: "chinese", state: false},
    {id: 7, name: "Eastern European", value: "easterneuropean", state: false},
    {id: 8, name: "European", value: "european", state: false},
    {id: 9, name: "French", value: "french", state: false},
    {id: 10, name: "German", value: "german", state: false},
    {id: 11, name: "Greek", value: "greek", state: false},
    {id: 12, name: "Indian", value: "indian", state: false},
    {id: 13, name: "Irish", value: "irish", state: false},
    {id: 14, name: "Italian", value: "italian", state: false},
    {id: 15, name: "Japanese", value: "japanese", state: false},
    {id: 16, name: "Jewish", value: "jewish", state: false},
    {id: 17, name: "Korean", value: "korean", state: false},
    {id: 18, name: "Latin American", value: "latinamerican", state: false},
    {id: 19, name: "Mediterranean", value: "mediterranean", state: false},
    {id: 20, name: "Mexican", value: "mexican", state: false},
    {id: 21, name: "Middle Eastern", value: "middleeastern", state: false},
    {id: 22, name: "Nordic", value: "nordic", state: false},
    {id: 23, name: "Southern", value: "southern", state: false},
    {id: 24, name: "Spanish", value: "spanish", state: false},
    {id: 25, name: "Thai", value: "thai", state: false},
    {id: 26, name: "Vietnamese", value: "vietnamese", state: false}
]

const baseNutritionList = [
    {id: 0, name: "Energy", min_amount: 0, max_amount: 5000},
    {id: 1, name: "Protein", min_amount: 0, max_amount: 100},
    {id: 2, name: "Total Fat", min_amount: 0, max_amount: 100},
    {id: 3, name: "Saturated Fat", min_amount: 0, max_amount: 100},
    {id: 4, name: "Carbohydrate", min_amount: 0, max_amount: 100},
    {id: 5, name: "Sugars", min_amount: 0, max_amount: 100},
    {id: 6, name: "Sodium", min_amount: 0, max_amount: 1000},
]



module.exports = { baseDietaryList, baseCuisineList, baseNutritionList };