import React, { useState } from 'react';

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
      backgroundColor: '#458D59', // Dark Green ('#007bff' Blue)
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      marginLeft: 'auto',
    },
    userMessage: {
      backgroundColor: '#7DE081', // Light Green ('#e0e0e0' Grey),
      padding: '5px 10px',
      borderRadius: '5px',
      marginRight: 'auto',
      'text-align': 'right',
    },
    errorMessage: {
      backgroundColor: '#E4080A',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      marginLeft: 'auto',
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

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    let userInputStorage = "";

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    

  const handleSendMessage = async () => {
    try {
      // If no input, ignore
      if (input.trim() === '') return;
  
      // Add the user message to the messages array
      setMessages(prevMessages => [...prevMessages, { role: 'user', text: input }]);

      // Disable the user inputs while it waits
      document.getElementById('chatbotInput').setAttribute("disabled", "true");
      document.getElementById('chatbotButton').setAttribute("disabled", "true");
      userInputStorage = input;
      setInput('...Thinking...');

      // Send the user message to the CHATBOT API
      const output = await fetch("http://localhost:8080/api/chatbot", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({"input": input})
      })

      if (!output.ok) {
        console.error("Chatbot Error - output did not ok");
      }

      // Extract the bot response from the API response
      const botResponse = await output.json();
      if (botResponse.error) {
        console.error('AI Error:', botResponse.error.message);
        setMessages(prevMessages => [...prevMessages, { role: 'error', text: "ChatBot error: Please Try Again" }]);
        setInput(userInputStorage);
      } else {
        // Add the bot response to the messages array
        setMessages(prevMessages => [...prevMessages, { role: 'bot', text: botResponse.message }]);
      }
      // Clear the input field
      setInput('');
    }  catch (error) {
        console.error('An error occurred:', error.message);
        setMessages(prevMessages => [...prevMessages, { role: 'error', text: "ChatBot error: Please Try Again" }]);
        setInput(userInputStorage);
    }
     // ReEnable the user inputs once it's done
     setInput(userInputStorage);
     document.getElementById('chatbotInput').removeAttribute("disabled");
     document.getElementById('chatbotInput').focus();
     document.getElementById('chatbotButton').removeAttribute("disabled");
     document.getElementById('chatbotButton').focus();
  };


  return (
    <div className="chatbot" style={chatbotStyles.chatbot}>
      <div className="chatbox" style={chatbotStyles.chatbox}>
        <div className="messages" style={chatbotStyles.messages}>
          {messages.map((message, index) => (
            <div key={index} className="message" style={chatbotStyles.message}>
              {message.role === 'bot' ? (
                <div className="bot-message" style={chatbotStyles.botMessage}>{message.text}</div>
              ) : message.role === 'error' ? (
                <div className="error-message" style={chatbotStyles.errorMessage}>{message.text}</div>
              ) : (
                <div className="user-message" style={chatbotStyles.userMessage}>{message.text}</div>
              )}
            </div>
          ))}
        </div>
        <input
          id="chatbotInput"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={chatbotStyles.input}
        />
        <button onClick={handleSendMessage} style={chatbotStyles.button} id="chatbotButton">Send</button>
      </div>
    </div>
  );
}

export default Chatbot;