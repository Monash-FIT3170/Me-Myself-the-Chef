const config = require("../config/auth.config");
const db = require("../models");
const User = db.appuser;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const AppUser = require("../models/appuser.model");
const SearchHistory = require("../models/searchhistory.model");

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    // create appUser object from request information
    const user = new AppUser({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    // and saves the user to the database
    const savedUser = await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.signin = async (req, res) => {
  try {
    // searches for the username and returns a 404 error if not found
    const user = await AppUser.findOne({
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
    // Im honestly not too certain on the function of this token
    // might be important for authentication purposes so it's staying in
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
      searchhistory: user.search_history,
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// update preferences and search history data
exports.update = async (req, res) => {
try{
  const user = await AppUser.findOne({
    _id: req.userId,
    preferences: []
  });

  // if fail there's a problem with the token verification
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  const Preferences = require("../models/preferences.model");

  // convert user preferences
  for(let i = 0; i <= req.body.preferences.length; i++){
    const preferences = new Preferences({
      ingredient: req.body.preferences[i].ingredient
    });
    user.preferences.push(preferences);

    // Save the user object
    const savedUser = await user.save();
  }
  

} catch (error) {
  res.status(500).send({ message: error.message})
}
}

exports.updateSearchHistory = async (req, res) => {
  try{
    const user = await AppUser.findOne({
      _id: req.userId
    });
    // confirm user
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // create search history object
    const search = new SearchHistory({
      date: req.date,
      entry: req.entry
    });
    console.log(req.body);
    console.log(req.body.date + " " + req.body.entry);
    console.log(search);
    // push to user object
    user.search_history.push(search)

    // Save the objects in the database
    const savedsearch = search.save();
    console.log("first object saved");
    const savedUser = user.save();
    console.log("second obejct saved");

  } catch (error) {
    res.status(500).send({message: error.message})
  }
}
