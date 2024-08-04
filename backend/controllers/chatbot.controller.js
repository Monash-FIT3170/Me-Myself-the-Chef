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

// ATTEMPT CONNECTION
let chat;
try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    chat = model.startChat({
        generationConfig: GENERATION_CONFIG,
        safetySettings: SAFETY_SETTINGS,
        history: [],
    });

    console.log("chatbot succesfully connected?")
}  catch (error) {
    console.error('An error occurred when connecting to GEMINI chatbot:', error.message);
    process.exit(1);
} 

exports.askChatbot = async (req, res) => {
    try{
        // Send the user message to the GEMINI AI API
        const output = await chat.sendMessage(req.body.input);

        // Extract the bot response from the API response
        const botResponse = output.response.text();

        console.log("BOT RESPONSE:" + botResponse);

        if (botResponse.error) {
            res.status(500).send({ error: botResponse.error.message})
        }
        // Send the bot response back as JSON
        res.status(200).send({ message: botResponse });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};