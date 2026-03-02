import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState([]);
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  // const [ chatMessages, setChatMessages ] = array;

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
