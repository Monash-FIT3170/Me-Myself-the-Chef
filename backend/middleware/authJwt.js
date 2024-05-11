const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.appuser;
const Role = db.role;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    const isAdmin = roles.some(role => role.name === "admin");
    if (isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    const isModerator = roles.some(role => role.name === "moderator");
    if (isModerator) {
      next();
    } else {
      res.status(403).send({ message: "Require Moderator Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const authJwt = {
  verifyToken,
  // isAdmin,
  // isModerator
};

module.exports = authJwt;
