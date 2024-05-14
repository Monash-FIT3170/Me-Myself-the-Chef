const config = require("../config/auth.config");
const db = require("../models");
const User = db.appuser;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const AppUser = require("../models/appuser.model");
const SearchHistory = db.searchhistory

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
exports.updatePreferences = async (req, res) => {
  try{
    const user = await AppUser.findOne({
      _id: req.userId,
    });

    // if fail there's a problem with the token verification
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const Preferences = db.preferences;
    // convert user preferences
    for(let i = 0; i < req.body.length; i++){
      console.log(req.body[i]);
      const preference = new Preferences({ingredient: req.body[i].ingredient});
      preference.save();
      user.preferences.push(preference);
    }
    // Save the user object
    await user.save();
    res.send({ message: "User preferences was updated successfully!" });
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
    const SH = db.searchhistory
    const data = new SH({ date: req.body.date, entry: req.body.entry});
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
    // get user token
    const user = await AppUser.findOne({
      _id: req.userId
    });
    // confirm user
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send({ preferences: user.preferences});
  } catch (error) {
    res.status(500).send({ message: error.message})
  }
}
