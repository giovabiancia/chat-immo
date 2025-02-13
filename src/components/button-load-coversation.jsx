import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ButtonLoadCoversation({ data, onConversationLoaded }) {
  const [isLoading, setIsLoading] = useState(false);

  function generateRandomConversation(length = 5) {
    const messages = [
      "Ciao! Come posso aiutarti?",
      "Hai bisogno di assistenza su qualcosa?",
      "Ecco un consiglio per te: rimani curioso e continua a imparare!",
      "Oggi è un ottimo giorno per essere produttivo!",
      "Se hai domande, sono qui per rispondere!",
      "Non dimenticare di prenderti una pausa e rilassarti!",
      "Un piccolo passo oggi può portarti lontano domani!",
      "La conoscenza è potere, continua a esplorare!",
      "Sorridi! Oggi potrebbe essere il giorno che cambierà tutto!",
      "Se hai un problema, proviamo a risolverlo insieme!",
    ];

    const conversation = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      const randomType = Math.random() < 0.5 ? "agent" : "assistant"; // 50% probabilità per ciascuno
      conversation.push({
        type: randomType,
        content: messages[randomIndex],
        timestamp: Date.now(),
      });
    }

    return conversation;
  }

  const handleClick = () => {
    setIsLoading(true);
    console.log("recover chat ");

    onConversationLoaded(generateRandomConversation(5));

    /* fetch("http://152.42.137.28:1865/custom/get_conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "user_chat",
        chat_id: "test",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let chat_history = data["chat_history"];

        if (!chat_history) {
          return toast.warning(
            `Errore nel recupero della conversazione: ${error.message}`,
            {
              type: "warning",
            }
          );
        }

        let conData = chat_history.map((chat) => {
          return {
            type: "",
            content: "",
            timestamp: "",
          };
        });

        // onConversationLoaded(conData);
      })
      .catch((error) => {
        console.error("Errore nel recupero della conversazione:", error);
        toast.error(
          `Errore nel recupero della conversazione: ${error.message}`,
          {
            type: "error",
          }
        );
      })
      .finally(() => setIsLoading(false));  */
  };
  return (
    <Button
      key={data?.id}
      variant="ghost"
      className="w-full justify-start gap-2 text-gray-700 hover:text-primary hover:bg-blue-50"
      loading={isLoading}
      onClick={() => handleClick(data?.id)}
    >
      {data?.test || "Senza nome"}
    </Button>
  );
}
