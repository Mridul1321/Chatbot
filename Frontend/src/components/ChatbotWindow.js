// ChatbotWindow.js
import React, { useState, useRef, useEffect } from 'react';
import './ChatbotWindow.css';

const ChatbotWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, user: 'user' }]);
      // Assuming you have a function to handle sending text to Flask
      sendTextToFlask(inputValue);
      setInputValue('');
    }
  };

  const handleReceiveMessage = (response) => {
    setMessages((prevMessages) => [...prevMessages, { text: response, user: 'bot' }]);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat window when messages change
    inputRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendTextToFlask = async (text) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const responseData = await response.json();
      handleReceiveMessage(responseData.response);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div className="chatbot-window">
      <div className="chat-header">
        <span>Chatbot</span>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
        <div ref={inputRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotWindow;
