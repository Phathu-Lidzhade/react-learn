import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem("messages") || "[]"));
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  // const [ chatMessages, setChatMessages ] = array;

  useEffect(() => {
    Chatbot.addResponses({'goodbye': 'Goodbye. Have a nice day!',
    'give me a unique id': function(){
      return `Sure! Here is a unique id: ${crypto.randomUUID() }`;
    },
    'tell me a joke': 'Why did the scarecrow win an award? Because he was outstanding in his field!'
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <p>
        Welcome to the chatbot project! Send a message using the textbox below
      </p>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App;
