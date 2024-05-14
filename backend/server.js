const express = require("express");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const db = require("../backend/models");
const dbConfig = require("../backend/config/db.config");

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
require('../backend/routes/auth.routes')(app);
require('../backend/routes/user.routes')(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
