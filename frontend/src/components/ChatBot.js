// src/Chatbot.js
import React, { useState } from 'react';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// CHATBOT STUFF
function Chatbot() {
  // Inside the Chatbot component
  const chatbotStyles = {
    chatbot: {
      width: '300px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      margin: '0 auto',
      padding: '10px',
    },
    chatbox: {
      display: 'flex',
      flexDirection: 'column',
    },
    messages: {
      maxHeight: '300px',
      overflowY: 'scroll',
    },
    message: {
      marginBottom: '10px',
    },
    botMessage: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      marginLeft: 'auto',
    },
    userMessage: {
      backgroundColor: '#e0e0e0',
      padding: '5px 10px',
      borderRadius: '5px',
      marginRight: 'auto',
    },
    input: {
      width: '100%',
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

    // SET UP THE CHATBOT
    // const MODEL_NAME = "gemini-1.0-pro";
    // const API_KEY = "AIzaSyASRzJzvR4ntfYWazNTHDSKjB9hMpdux4A";
    // const GENERATION_CONFIG = {
    //     temperature: 0.9,
    //     topK: 1,
    //     topP: 1,
    //     maxOutputTokens: 2048,
    // };
    // const SAFETY_SETTINGS = [
    //     { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    //     { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    //     { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    //     { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    // ];

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    
    // try {
    //     const genAI = new GoogleGenerativeAI(API_KEY);
    //     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    //     const chat = model.startChat({
    //         generationConfig: GENERATION_CONFIG,
    //         safetySettings: SAFETY_SETTINGS,
    //         history: [],
    //     });
    // }  catch (error) {
    //     console.error('An error occurred:', error.message);
    //     process.exit(1);
    // } 
    

  const handleSendMessage = async () => {

    try {
        // const genAI = new GoogleGenerativeAI(API_KEY);
        // const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        // const chat = model.startChat({
        //     generationConfig: GENERATION_CONFIG,
        //     safetySettings: SAFETY_SETTINGS,
        //     history: [],
        // });

        // If no input, ignore
        if (input.trim() === '') return;
  
        // Add the user message to the messages array
        setMessages(prevMessages => [...prevMessages, { role: 'user', text: input }]);

        // Send the user message to the CHATBOT API
        const output = await fetch("http://localhost:8080/api/chatbot", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"input": input})
        })
        if (!output.ok) {
            throw new Error('chatbotAPI response error');
        }
  
      // Extract the bot response from the API response
      const botResponse = await output.json();
      if (botResponse.error) {
        console.error('AI Error:', botResponse.error.message);
        return
        }
  
      // Add the bot response to the messages array
      setMessages(prevMessages => [...prevMessages, { role: 'bot', text: botResponse.message }]);
  
      // Clear the input field
      setInput('');
    }  catch (error) {
        console.error('An error occurred:', error.message);
        alert('An error occurred: ' + error.message);
    }
  };


  return (
    <div className="chatbot" style={chatbotStyles.chatbot}>
      <div className="chatbox" style={chatbotStyles.chatbox}>
        <div className="messages" style={chatbotStyles.messages}>
          {messages.map((message, index) => (
            <div key={index} className="message" style={chatbotStyles.message}>
              {message.role === 'bot' ? (
                <div className="bot-message" style={chatbotStyles.botMessage}>{message.text}</div>
              ) : (
                <div className="user-message" style={chatbotStyles.userMessage}>{message.text}</div>
              )}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={chatbotStyles.input}
        />
        <button onClick={handleSendMessage} style={chatbotStyles.button}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;