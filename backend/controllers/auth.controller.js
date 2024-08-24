const config = require("../config/auth.config");
const db = require("../models"); // access mongoDB models from here
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // create appUser object from request information
    const user = new db.appuser({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    // Saves the user to the database and sends response
    await user.save();
    res.send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // searches for the username and returns a 404 error if not found
    const user = await db.appuser.findOne({
      username: req.body.username
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // confirm that the encrypted password matches the password submitted,
    // returning a 401 error if it is incorrect
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    // Configure a token for the user that last for a time limit
    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );
    // send response with signin information
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      searchHistory: user.search_history,
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// update preferences data
exports.updatePreferences = async (req, res) => {
  try{
    // searches for the username and returns a 404 error if not found
    const user = await db.appuser.findOne({
      _id: req.userId,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // convert submitted user preference data into a mongoDB
    // preference object, ensuring that lists still contain
    // appropriate objects as well
    const preference = new db.preferences.Preferences({
      dietaryRequirements: [],
      dietaryCombination: req.body.dietaryCombination,
      allergies: [],
      maxPrepTime: req.body.maxPrepTime,
      nutrition: []
    });

    // dietaryRequirements list
    for(let i = 0; i<req.body.dietaryRequirements.length; i++){
      const dietaryRequirement = new db.preferences.DietaryRequirements({
        id: req.body.dietaryRequirements[i].id,
        name: req.body.dietaryRequirements[i].name,
        state: req.body.dietaryRequirements[i].state
      });
      preference.dietaryRequirements.push(dietaryRequirement);
    }

    // allergies list
    for(let i = 0; i<req.body.allergies.length; i++){
      const allergy = new db.preferences.Allergies({
        id: req.body.allergies[i].id,
        title: req.body.allergies[i].title
      });
      preference.allergies.push(allergy);
    }

    // nutrition list
    for(let i = 0; i<req.body.nutrition.length; i++){
      const nutrition = new db.preferences.Nutrition({
        id: req.body.nutrition[i].id,
        name: req.body.nutrition[i].name,
        min_amount: req.body.nutrition[i].min_amount,
        max_amount: req.body.nutrition[i].max_amount
      });
      preference.nutrition.push(nutrition);
    }

    preference.save(); // save the completed object to mongoDB
    user.preferences = preference; // add the object to the user
    user.save(); // save user data
    res.send({ message: "User preferences was updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message})
  }
}

exports.updateSearchHistory = async (req, res) => {
  try{
    const user = await db.appuser.findOne({
      _id: req.userId
    });
    // confirm user
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // create search history object
    const data = new db.searchhistory({ date: req.body.date, entry: req.body.entry});
    await Promise.all([
      data.save()
    ]);
    user.search_history.push(data);

    // Save the objects in the database
    await user.save();
    res.send({ message: "Search History updated successfully!" });
  } catch (error) {
    res.status(500).send({message: error.message})
  }
}

exports.getPreferences = async (req, res) => {
  try{
    // get user from database
    const user = await db.appuser.findOne({
      _id: req.userId
    });
    // confirm user
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // get user Preference from seperate database collection
    const preference = await db.preferences.Preferences.findOne({
      _id: user.preferences
    });
    // confirm existence
    if (!preference) {
      return res.status(404).send({ message: "Preference Object Not found." });
    }
    // send succesful response
    res.status(200).send({ preferences: preference});
  } catch (error) {
    res.status(500).send({ message: error.message})
  }
}

// SAVED RECIPES ---------------------------------------------------------------

exports.updateSavedRecipes = async (req, res) => {
  try {
    // Find the user
    const user = await db.appuser.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    // Update user's saved recipes
    user.saved_recipes = req.body.saved_recipes;
    // Save the updated user
    const updatedUser = await user.save();
    // Respond with the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors
    res.status(500).json(error);
  }
};


exports.getSavedRecipes = async (req, res) => {
  try{
    // Find the user
    const user = await db.appuser.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    // Return the user's saved recipes
    res.status(200).json(user.saved_recipes);
  } catch (error) {
    res.status(500).json(error);
  }
}
