require('dotenv').config()  // Attaches env variables to process object

const express = require("express");
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log(req.method, req.path) // Log path to console
    next()
})
app.use(bodyParser.json());

// Database setup
const db = require("./models");
const dbConfig = require("./config/db.config");

// MongoDB connection
db.mongoose.connect(dbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/chatbot.routes')(app);

// Comment Routes
const commentsRouter = require('./routes/comments');
app.use('/api/comments', commentsRouter);

// Recipe Routes
const recipeRoutes = require('./routes/recipes')
app.use('/api/recipes', recipeRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
