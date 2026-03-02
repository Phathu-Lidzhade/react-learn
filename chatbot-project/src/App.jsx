import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'

function ChatInput({
        chatMessages,
        setChatMessages,
        isLoading,
        setIsLoading,
      }) {
        const [inputText, setInputText] = useState("");

        function saveInputText(event) {
          setInputText(event.target.value);
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
            },
          ];

          setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
              message: <img className="loading-spinner" src="images/loading-spinner.gif" />,
              sender: "robot",
              id: crypto.randomUUID(),
            },
          ]);

          const response = await Chatbot.getResponseAsync(inputText);

          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: "robot",
              id: crypto.randomUUID(),
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
          </div>
        );
      }

      function ChatMessage({ message, sender }) {
        //const message = props.message;
        //const sender = props.sender;
        //const { message, sender } = props;

        /*
        if (sender === "robot") {
          return(
            <div>
              <img src="images/robot.png" 
                width="50"
              />
              {message}
            </div>
          );
        }
        */

        return (
          <div className={
            sender === 'user' 
              ? 'chat-message-user' 
              : 'chat-message-robot'
            }>
            {sender === "robot" && 
              (<img src="images/robot.png" 
              className="chat-message-profile" />)
            }

            <div className="chat-message-text">
              {message}
            </div>

            {sender === "user" && 
              (<img src="images/user.png" 
              className="chat-message-profile" />)
            }
          </div>
        );
      }

      function useAutoScroll(dependencies) {
        const chatMessagesRef = useRef(null);
        useEffect(() => {
          const containerElem = chatMessagesRef.current;
          if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        }, [dependencies]);

        return chatMessagesRef;
      }

      function ChatMessages({ chatMessages }) {
        const chatMessagesRef = useAutoScroll(chatMessages);

        return (
          <div 
            className="chat-messages-container"
            ref={chatMessagesRef}
          >
            {chatMessages.map((chatMessage) => (
              <ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                key={chatMessage.id}
              />
            ))}
          </div>
        );
      }

function App() {
        const [isLoading, setIsLoading] = useState(false);

        const [chatMessages, setChatMessages] = useState([]);
        // const chatMessages = array[0];
        // const setChatMessages = array[1];
        // const [ chatMessages, setChatMessages ] = array;

        return (
          <div className="app-container">
            <p>Welcome to the chatbot project! Send a message using the textbox below</p>
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

export default App
