import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonLoadCoversation from "./button-load-coversation";
import { toast } from "react-toastify";

export function ChatSidebar({ onConversationLoaded }) {
  const [conversazioni, setConversazioni] = useState([]);
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  useEffect(() => {
    //setConversazioni([
    //{ test: "Valutazione di una Villa a Roma: Stima e Dettagli" },
    //]);

    fetch("http://152.42.137.28:1865/custom/get_chat_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "user", // Sostituisci con il valore corretto
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data) {
          return toast.warning(`Chat list non presente`, {
            type: "warning",
          });
        }
        setConversazioni(data);
      })
      .catch((error) => {
        console.error("Errore nel recupero delle chat:", error);
        toast.error(`Errore nel recupero delle chat: ${error.message}`, {
          type: "error",
        });
      })
      .finally(() => setLoading(false)); // Disattiva il loader alla fine
  }, []);

  return (
    <div className="flex h-full w-[300px] flex-col bg-gray-80">
      <div className="p-4 border-b bg-primary">
        <div className="flex justify-center mb-7">
          <img src="./logo.svg" alt="Immobiliare.it Logo" className="h-8" />
        </div>
        <Button
          className="w-full justify-start gap-2 bg-secondary text-white hover:bg-secondary/90 font-bold"
          onClick={() => window.location.reload()}
        >
          <PlusCircle className="h-4 w-4" />
          Nuova chat
        </Button>
      </div>
      <h2 className="ms-4 pt-4 mb-2 px-2 text-xs font-semibold text-primary uppercase">
        Conversazioni
      </h2>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="space-y-1">
            {loading ? (
              // Mostra il loader
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : conversazioni.length > 0 ? (
              conversazioni.map((d, i) => (
                <ButtonLoadCoversation
                  data={d}
                  key={i}
                  onConversationLoaded={onConversationLoaded}
                ></ButtonLoadCoversation>
              ))
            ) : (
              <p className="text-gray-500 text-sm px-2">
                Nessuna conversazione disponibile
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
