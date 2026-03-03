import dayjs from "dayjs";
import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingImage from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({
  chatMessages,
  setChatMessages,
  isLoading,
  setIsLoading,
}) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  async function sendMessage() {
    // Prevent sending if loading or if input is empty
    if (isLoading || inputText.trim() === "") {
      return;
    }

    setInputText("");
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ];

    setChatMessages([
      ...newChatMessages,
      // This creates a temporary Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be remove later, when we add the response.
      {
        message: <img className="loading-spinner" src={LoadingImage} />,
        sender: "robot",
        id: crypto.randomUUID()
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ]);
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="chat-input"
      />
      <button
        type="button"
        onClick={sendMessage}
        disabled={isLoading || inputText.trim() === ""}
        className="send-btn"
      >
        Send
      </button>
      <button className="clear-btn" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}
