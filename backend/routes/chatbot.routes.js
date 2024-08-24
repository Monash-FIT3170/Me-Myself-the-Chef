
const controller = require('../controllers/chatbot.controller');

// CHATBOT API EXPORTS

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
    
    app.post(
        "/api/chatbot",
        controller.askChatbot
    );

    app.post(
      "/api/chatbot/recipe",
      controller.generateRecipe
    );
}