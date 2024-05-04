'use strict';

const express = require("express");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const NavBar = require("./my-app/frontend/src/components/NavBar.js").default;

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "src", "views"));

// Serve static files from the public directoryd
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/recipe", (req, res) => {
    // Render the NavBar component to a string
    const navBarString = ReactDOMServer.renderToString(NavBar);
    
    // Pass the NavBar component as a prop to the recipe view
    res.render("recipe", { navBar: navBarString });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
