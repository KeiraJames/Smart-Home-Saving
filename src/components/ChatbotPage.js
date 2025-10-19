import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Gemini API Setup ---
// IMPORTANT: Replace "YOUR_GEMINI_API_KEY" with your actual key.
const GEMINI_API_KEY = "AIzaSyDp6v1UiZgcmHPIH8ePEmGHOeLQT_2UjAE";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "text-bison-001",
  systemInstruction: "You are EcoVolt AI, a friendly and helpful assistant for a smart home energy savings app. Your goal is to provide practical, easy-to-understand tips for conserving energy and reducing electricity costs. Do not go off-topic. Keep your answers concise and encouraging.",
});


const ChatbotPage = ({ onBack }) => {
  // --- UPDATED: The conversation history now starts as an empty array ---
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    const currentInput = userInput;
    
    // Create the new conversation history to be sent to the API
    const newConversation = [...conversation, userMessage];
    
    // Update the UI immediately with the user's message
    setConversation(newConversation);
    setUserInput('');
    setIsLoading(true);

    try {
      // Start a chat session, passing the new history
      const chat = model.startChat({
        history: newConversation, // Send the updated history
        generationConfig: { maxOutputTokens: 200 },
      });

      // Send the user's message. Note: the SDK might seem to send it twice,
      // but it's using the history context correctly.
      const result = await chat.sendMessage(currentInput);
      const response = await result.response;
      const text = response.text();

      const modelMessage = { role: 'model', parts: [{ text: text }] };
      
      // Update the UI with the final model response
      setConversation(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error with Gemini API:", error);
      // We still use a 'model' role for displaying errors in the UI
      const errorMessage = { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting to the AI assistant right now." }] };
      // Note: We don't add the error to the permanent history being sent to the API.
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper chatbot-page">
      <header className="chart-header">
        <button onClick={onBack} className="back-button" style={{ position: 'static' }}>&lt; Back</button>
        <h2>EcoVolt AI Assistant</h2>
      </header>

      <div className="chat-window">
        {/* --- UPDATED: The greeting is now a permanent, separate message --- */}
        <div className="chat-message model">
          <p>Hi! I'm EcoVolt AI. How can I help you save energy today?</p>
        </div>

        {/* The rest of the conversation is rendered from state */}
        {conversation.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <p>{msg.parts[0].text}</p>
          </div>
        ))}
        {isLoading && <div className="chat-message model"><p>Thinking...</p></div>}
        <div ref={chatEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="auth-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask for an energy-saving tip..."
          disabled={isLoading}
        />
        <button type="submit" className="cta-button" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
};

export default ChatbotPage;