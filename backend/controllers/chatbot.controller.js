const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

// SET UP THE CHATBOT
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;
const GENERATION_CONFIG = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};
const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];
const INITIATION_MESSAGE = "You are a chatbot for the website 'Me Myself the Chef', which aims to provide it's users with suggestions for healthy meals. Your aim is to provide recomendations for safe healthy meals to users based on their preferences. Add newline breaks to seperate information. Limit the response to 50 words";
const MESSAGE_SUFFIX = "This message must be returned in plain text."; // "If your response includes a recipe preface your message with the word 'PERTUSSIS' before the title. Add new line breaks to seperate information, such as a new line for each ingredient and instruction.";
// This is where we want to code in the standard JSON format we want it to output recipes in, if it write the code word it means its generated a recipe
const GENERATE_RECIPE = 'Resend the previous recipe with the following JSON format ensuring that float are limited to 2 decimal places and no fractions are used, additionally use "grams" to measure small amounts of spices. Ensure that the nutrients - Fat, Calories, Saturated Fat, Carbohydrates, Sugar, Sodium are included in the nutrients section and their quanitity is for the whole recipe, not per serving:{"title": string, "image": "image_link", "servings": int, "extendedIngredients": [ {"nameClean": string, "amount": float,  "measures": { "metric": { "amount": int, "unitShort": string }}}],"analyzedInstructions": [{"steps": [{"number": int, "step": string}]}], "nutrition": { "nutrients": [{"name": string, "amount": float, "unit": string}]}, "readyInMinutes": int, "preperationMinutes": int}';


function extractJSON(text) {
    // Find the index of the first '{'
    const startIndex = text.indexOf('{');
    
    // Find the index of the last '}'
    const endIndex = text.lastIndexOf('}');
    
    // Check if both indices are valid and in the correct order
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        // Extract the substring from the first '{' to the last '}'
        return text.substring(startIndex, endIndex + 1);
    } else {
        // Return null or handle the error as needed if braces are not found or are not in correct order
        console.error("Braces not found or in incorrect order.");
        return null;
    }
}

// ATTEMPT CONNECTION
let chat;
let DEFAULT_HISTORY;
async function initialChatbotConnect () {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
        chat = model.startChat({
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
            history: [],
        });
        console.log("Chatbot succesfully connected")
        // Send initiation Message
        await chat.sendMessage(INITIATION_MESSAGE);
        DEFAULT_HISTORY = [...chat._history]; // may need to check deep/shallow copy here
        console.log("Initiation Message Sent and history recorded")
    
    }  catch (error) {
        console.error('An error occurred when connecting to GEMINI chatbot:', error.message);
        process.exit(1);
    } 
}
initialChatbotConnect()


exports.askChatbot = async (req, res) => {
    try{
        // check the history given
        if (req.body.history.length==0) {
            if (!DEFAULT_HISTORY) {
                chat.history = []
            }
            // if no history use the default
            chat.history = DEFAULT_HISTORY
        } else {
            // else use the given history
            chat.history = req.body.history
        }

        // Send the user message to the GEMINI AI API
        const output = await chat.sendMessage(req.body.input + MESSAGE_SUFFIX);

        // Extract the bot response from the API response
        const botResponse = output.response.text();

        console.log("BOT RESPONSE:" + botResponse);

        if (botResponse.error) {
            res.status(500).send({ error: botResponse.error.message})
        }
        // Send the bot response back as JSON
        res.status(200).send({ message: botResponse, history: chat.history });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.generateRecipe = async (req, res) => {
    try{
        // check the history given
        if (req.body.history.length==0) {
            // if no history use the default
            if (!DEFAULT_HISTORY) {
                chat.history = []
            }
            chat.history = DEFAULT_HISTORY
        } else {
            // else use the given history
            chat.history = req.body.history
        }
        // Send the user message to the GEMINI AI API
        const output = await chat.sendMessage(GENERATE_RECIPE);

        // Extract the bot response from the API response
        const botResponse = output.response.text();

        // EXTRACT THE JSON PART OUT OF THE TEXT STRING
        console.log("INITIAL RESPONSE: " + botResponse);
        jsonRecipe = extractJSON(botResponse);
        console.log("EXTRACTED JSON: " + jsonRecipe);

        if (botResponse.error) {
            return res.status(500).send({ error: botResponse.error.message})
        }

        if (!jsonRecipe) {
            return res.status(500).send({ error: "Invalid JSON object extracted"})
        } 
       
        // Send the bot response back as JSON
        return res.status(200).send({ message: jsonRecipe, history: chat.history });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};