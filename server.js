const API_KEY = "09861c68c07140d8a96e353c8d4f86cc"
const axios = require('axios');
const express = require('express');
const router = express.Router();


// single routing

router.get('/test', async (req, res) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=bannana,+flour,+sugar&number=2`)
    res.json(response.data);
  }
  catch (err) {
    console.log(err)
  }
})

const app = express();
app.use(express.json());
app.use('/', router);
app.listen(5000);

console.log("Server is ready to listen to handle requests on port 5000");

// app.listen(PORT, (err) => {
//   if (err) console.log(err);
//   console.log("Server listening on PORT", PORT);
// })

// // need to prefix url with ?apiKey=API_KEY& etc
// // https://api.spoonacular.com/recipes/findByIngredients

// const express = require("express"),
//   app = express(),
//   port = process.env.PORT || 5000,
//   cors = require("cors");

// app.use(cors());
// app.listen(port, () => console.log("Backend server live on " + port));

// app.get("/", (req, res) => {
//   axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples,+flour,+sugar&number=2`)
//   .then((response) => {
//     console.log(response[0].id);
//     res.send({message: {response}});
//   })
//   .catch((error) => {
//     console.log(error)
//   });
//   //res.send({ message: "We did it!" });
// });