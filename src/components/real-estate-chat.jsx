import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ChatSidebar } from "./chat-sidebar";
import { useWebSocket } from "../hooks/use-websocket";

const WELCOME_MESSAGE = `
# Benvenuto nell'Assistente Immobiliare 👋
Sono qui per aiutarti a trovare la casa dei tuoi sogni. Posso aiutarti con:
- 🏠 Ricerca di immobili in vendita o affitto
- 📍 Informazioni su zone e quartieri
- 💰 Valutazioni e stime di mercato
- 📋 Consigli per compravendita
Come posso aiutarti oggi?
`;

export function RealEstateChat() {
  const [input, setInput] = useState("");
  const { messages: wsMessages, status, sendMessage } = useWebSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: Date.now(),
    },
  ]);
  const chatContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      sendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    if (wsMessages.length > 0) {
      const lastMessage = wsMessages[wsMessages.length - 1];

      setChatHistory((prev) => [...prev, lastMessage]);

      setIsLoading(false);
    }
  }, [wsMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <main ref={chatContainerRef} className="flex-1 overflow-y-auto">
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {isLoading && (
            <ChatMessage
              type="assistant"
              content=""
              timestamp={Date.now()}
              isLoading
            />
          )}
        </main>
        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
