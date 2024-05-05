require('dotenv').config()  // Attaches env variables to process object

const express = require('express')
const mongoose = require('mongoose')
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
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('Connected to database')
        // Listen to port
        app.listen(process.env.PORT, () => {
            console.log('Listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })