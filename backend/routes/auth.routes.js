const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authJwt");

// User Based API exports

module.exports = function(app) {
  app.use(
    function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    }
  );

  // Add a new user to the database
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
      // verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  // Log a user in and retrieve their data/access-token
  app.post(
    "/api/auth/signin",
     controller.signin
  );

  // Update a specific user's preference information
  app.post(
    "/api/auth/updatePreferences",
    [authJwt.verifyToken],
    controller.updatePreferences
  );

  // Update a specific user's browser history info
  app.post(
    "/api/auth/updateSearchHistory",
    [authJwt.verifyToken],
    controller.updateSearchHistory
  );

  app.get(
    "/api/auth/getPreferences",
    [authJwt.verifyToken],
    controller.getPreferences
  );

  // Update a specific user's saved recipes
  app.post(
      "/api/auth/updateSavedRecipes",
      [authJwt.verifyToken],
      controller.updateSavedRecipes
  );

  app.get(
      "/api/auth/getSavedRecipes",
      [authJwt.verifyToken],
      controller.getSavedRecipes
  );
};