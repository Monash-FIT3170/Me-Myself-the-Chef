const db = require("../models");
const AppUser = db.appuser;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    const usernameExists = await AppUser.findOne({ username: req.body.username }).exec();
    if (usernameExists) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // // Email
    // const emailExists = await AppUser.findOne({ email: req.body.email }).exec();
    // if (emailExists) {
    //   return res.status(400).send({ message: "Failed! Email is already in use!" });
    // }

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;