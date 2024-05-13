const express = require("express");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "src", "views"));

// Serve static files from the public directoryd
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());


// // Define routes
// app.get("/recipe", (req, res) => {
//     // Render the NavBar component to a string
//     const navBarString = ReactDOMServer.renderToString(NavBar);
    
//     // Pass the NavBar component as a prop to the recipe view
//     res.render("recipe", { navBar: navBarString });
// });

app.get("/api/page1data", async (req, res) => {
    res.json([1,2,3,4,5])
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
