// FloatingButton.js
import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';
import './FloatingButton.css';

const FloatingButton = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="floating-button-container">
      <button className="floating-button" onClick={toggleChatbot}>
        Open Chatbot
      </button>
      {isChatbotVisible && <ChatbotWindow onClose={toggleChatbot} />}
    </div>
  );
};

export default FloatingButton;
