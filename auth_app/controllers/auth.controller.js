const config = require("../config/auth.config");
const db = require("../models");
const User = db.appuser;
// const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const AppUser = require("../models/appuser.model");

exports.signup = async (req, res) => {
  try {
    // create appUser object from request information
    const user = new AppUser({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    // and saves the user to the database
    const savedUser = await user.save();

    // User no longer Requires roles - thus this block is redundant
    // let roles = [];
    // if (req.body.roles) {
    //   roles = await Role.find({ name: { $in: req.body.roles } });
    // } else {
    //   const defaultRole = await Role.findOne({ name: "user" });
    //   roles.push(defaultRole);
    // }

    // user.roles = roles.map(role => role._id);
    // await user.save();

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
