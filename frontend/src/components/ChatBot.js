import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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
      position: 'fixed',
      bottom: 0,
      right: 0
    },
    chatboxHeader: {
      background: '#458D59',
      color: '#fff',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px'
    },
    chatboxHeader_h2: {
        margin: '0',
        fontSize: '18px',
    },
    chatboxHeader_button: {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer'
    },
    chatbox: {
      display: 'flex',
      flexDirection: 'column',
    },
    chatbotButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#458D59', // Dark Green
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
    },
    chatbotButtonHover: {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      transform: 'scale(1.1)',
    },
    messages: {
      maxHeight: '300px',
      overflowY: 'scroll',
    },
    message: {
      marginBottom: '5px',
      marginTop: '5px',
      display: 'flex',
    },
    botMessage: {
      backgroundColor: '#458D59', // Dark Green ('#007bff' Blue)
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      marginRight: 'auto',
      maxWidth: '85%',
      wordBreak: 'break-word',
      justifyContent: 'flex-end',
    },
    userMessage: {
      backgroundColor: '#7DE081', // Light Green ('#e0e0e0' Grey),
      padding: '5px 10px',
      borderRadius: '5px',
      marginLeft: 'auto',
      textAlign: 'left',
      maxWidth: '85%',
      wordBreak: 'break-word',
      justifyContent: 'flex-start',
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
      backgroundColor: '#458D59', // Dark Green
      color: 'white',
      fontFamily: 'Inter',
      fontWeight: '600',
      fontSize: '14px', 
      border: 'none',
      padding: '10px 20px',
      width: '100%',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '5px',
      marginBottom: '5px',
      textAlign: 'left'
    },
  };
   
  const chatbotPageWhiteList = {
    '/page1' : true,
    '/recipe_recommendation': true,
    "/ingredients": true,
    "/saved_recipe": true,
    "/disable_ingredients": true,
    "/recipe": true,
    "/AIRecipe": true
  }

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    let userInputStorage = useRef('');
    let chatbotOpened = useRef(false);
    const [isVisible, setIsVisible] = useState(false); // controls wether the chatbox is visible
    const messageEndRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    
  const toggleChatbotVisibility = () => {
    setIsVisible(prevState => !prevState);
    if (isVisible) {
      setIsHovered(false);
    }
  }

    
  const handleGenerateRecipe = async () => {
    localStorage.setItem("AIrecipe", false)
    const output = await fetch("http://localhost:8080/api/chatbot/recipe", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
    if (!output.ok) {
      console.error("Chatbot Error - output did not ok");
    }

    // extract the recipe JSON
    const recipe = await output.json();
    const recipeTEXT = recipe.message; // its in string format to store
    // store it in local Storage
    localStorage.setItem("AIrecipe", recipeTEXT);

    window.location.reload()
  }

  const handleSendMessage = useCallback(async () => {
    try {
      // If no input, ignore
      if (input.trim() === '') return;
  
      // Add the user message to the messages array
      setMessages(prevMessages => [...prevMessages, { role: 'user', text: input }]);

      // Scroll to the bottom of the updated message area
      // scrollableDiv.scrollTop = scrollableDiv.scrollHeight;

      // Disable the user inputs while it waits
      document.getElementById('chatbotInput').setAttribute("disabled", "true");
      document.getElementById('chatbotButton').setAttribute("disabled", "true");
      userInputStorage.current = input;
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
        setInput(userInputStorage.current);
      } else {
        // Add the bot response to the messages array
        setMessages(prevMessages => [...prevMessages, { role: 'bot', text: botResponse.message }]);
      }
      // Clear the input field
      setInput('');

    }  catch (error) {
        console.error('An error occurred:', error.message);
        setMessages(prevMessages => [...prevMessages, { role: 'error', text: "ChatBot error: Please Try Again" }]);
        setInput(userInputStorage.current);
    }
     // ReEnable the user inputs once it's done
     document.getElementById('chatbotInput').removeAttribute("disabled");
     document.getElementById('chatbotInput').focus();
     document.getElementById('chatbotButton').removeAttribute("disabled");
     document.getElementById('chatbotButton').focus();
     // scroll to the bottom of the message pane so the message is visible
    //  scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }, [input]);
  
  useEffect(() => {
    // Define the event handler
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (isVisible) {
                handleSendMessage();
            }
        }
    }

    // Add the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleSendMessage]); // Dependencies to ensure the latest values of isVisible and handleSendMessage are used

  useEffect(()=> {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  // Chatbot introduction when opened. 
  const introductionMessage = `Hello! You are chatting with the "Me Myself the Chef" chatbot. I'm here to offer healthy meal suggestions based on your preferences. Just let me know what you're looking for, and I'll provide recommendations for wholesome, nutritious meals!`;
  useEffect(() => {
    if (isVisible) {
      if (!chatbotOpened.current) {
        // Add initial message when chatbot is opened
        setMessages(prevMessages => [...prevMessages, { role: 'bot', text: introductionMessage }]);
        chatbotOpened.current = true;
      }
    }
  }, [isVisible, introductionMessage]);

  if (chatbotPageWhiteList[useLocation().pathname] === true) {
    return (
      <div>
        {!isVisible && (
          <button
            className="chatbotButton"
            style={{
              ...chatbotStyles.chatbotButton,
              ...(isHovered ? chatbotStyles.chatbotButtonHover : {}),
            }}
            onClick={toggleChatbotVisibility}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src="/static/images/food-serving.png" alt="Chatbot Logo" style={{ width: '35px', height: '35px' }} />
          </button>
        )}
        {isVisible && <div className="chatbot" style={chatbotStyles.chatbot}>
          <div className="chatbotHeader" style={chatbotStyles.chatboxHeader}>
            <h2 style={chatbotStyles.chatboxHeader_h2}>Chatbot</h2>
            <button onClick={toggleChatbotVisibility} style={chatbotStyles.chatboxHeader_button} >&times;</button>
          </div>
          <div className="chatbox" style={chatbotStyles.chatbox}>
            <Link to="/AIRecipe">
                  <button onClick={handleGenerateRecipe} style={chatbotStyles.button}>Generate Recipe</button>
            </Link>
            <div id='messagesPane' className="messages" style={chatbotStyles.messages}>
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
              <div ref={messageEndRef} />
            </div>
            <input
              id="chatbotInput"
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              style={chatbotStyles.input}
              autoComplete="off"
            />
            <button onClick={handleSendMessage} style={chatbotStyles.button} id="chatbotButton">Send</button>
          </div>
        </div>}
    </div>
    );
  } else {
    return <div></div>}
} 
  

export default Chatbot;