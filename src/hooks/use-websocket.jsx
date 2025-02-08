"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("disconnected");
  const ws = useRef(null);
  const url = "ws://152.42.137.28:1865/ws";
  const userId = "giovanni";

  useEffect(() => {
    // Create WebSocket connection
    ws.current = new WebSocket(`${url}?user_id=${userId}`);

    ws.current.onopen = () => {
      console.log(`WebSocket connection established`);
      setStatus("connected");
      //toast("Connessione a WS effettuata", { type: "success" });
    };

    ws.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log(`Received response:`, response);

        // Add assistant message to messages if content exists
        if (response.type === "chat") {
          setIsLoading(false);
          if (response.content || response.text) {
            setMessages((prev) => [
              ...prev,
              {
                type: "assistant",
                content: response.content || response.text,
                timestamp: Date.now(),
              },
            ]);
          }
        }
      } catch (error) {
        console.error(`Error decoding response: ${error}`);
        toast("Errore decoding response", { type: "errore" });
        setError(true);
      }
    };

    ws.current.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
      setStatus("error");
    };

    ws.current.onclose = (event) => {
      console.log(`Connection closed`, event);
      setStatus("disconnected");
    };

    // Cleanup function to close connection when component unmounts
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const sendMessage = (content) => {
    setIsLoading(true);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // Send message to server
      ws.current.send(
        JSON.stringify({
          type: "chat",
          text: content,
          user_id: userId,
        })
      );

      // Add user message to messages
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          content,
          timestamp: Date.now(),
        },
      ]);
    } else {
      console.warn("WebSocket is not open");
      toast("WebSocket is not open", { type: "warning" });
    }
  };

  return { messages, status, sendMessage, isLoading, error, setMessages };
}
