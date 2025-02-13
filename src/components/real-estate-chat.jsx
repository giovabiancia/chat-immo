import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "../hooks/use-websocket";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { ChatSidebar } from "./chat-sidebar";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    messages: wsMessages,
    status,
    sendMessage,
    isLoading,
  } = useWebSocket();
  const navigate = useNavigate();
  const { chat } = useParams();

  const [chatHistory, setChatHistory] = useState([
    {
      type: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: Date.now(),
    },
  ]);

  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  // Improved smooth scroll behavior
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior, block: "end" });
    }
  }, []);

  const handleSubmit = async (e, uuid) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = {
        type: "user",
        content: input.trim(),
        timestamp: Date.now(),
      };
      setChatHistory((prev) => [...prev, userMessage]);
      console.log(chatHistory);
      if (chatHistory.length === 0) {
        const uuid = uuidv4();
      }
      sendMessage(input.trim(), uuid);
      setInput("");
      // Close sidebar on mobile when sending message
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  useEffect(() => {
    if (wsMessages.length > 0) {
      const lastMessage = wsMessages[wsMessages.length - 1];
      setChatHistory((prev) => [...prev, lastMessage]);
    }
  }, [wsMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  const handleChangeConversation = (conv, id) => {
    navigate("/chat/" + id);
    setChatHistory(conv);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-80  ",
          "md:relative md:translate-x-0"
        )}
      >
        <div className="absolute right-2 top-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ChatSidebar onConversationLoaded={handleChangeConversation} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        <div className="bg-white border-b p-4 flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Immobiliare.it</h1>
        </div>

        <main
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                ref={index === chatHistory.length - 1 ? lastMessageRef : null}
              >
                <ChatMessage {...message} />
              </div>
            ))}
            {isLoading && (
              <ChatMessage
                type="assistant"
                content=""
                timestamp={Date.now()}
                isLoading={isLoading}
              />
            )}
          </div>
        </main>

        <div className=" bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              status={status}
              id={chat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealEstateChat;
