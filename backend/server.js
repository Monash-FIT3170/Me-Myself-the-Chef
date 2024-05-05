require('dotenv').config()  // Attaches env variables to process object
const express = require('express')
const recipeRoutes = require('./routes/recipes')


// App
const app = express()


// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path) // Log path to console
    next()
})


// Routes
app.get('/', (req, res) => {
    res.json({msg: "Hello World!"})
})

app.use('/api/recipes', recipeRoutes)


// Server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Listening on port", PORT)
})