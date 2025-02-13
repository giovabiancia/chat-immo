"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, SendHorizonal, XCircle } from "lucide-react";
import { useRef, useEffect } from "react";

export function ChatInput({ input, setInput, onSubmit, isLoading, status }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className=" bg-background px-4 py-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={onSubmit} className="flex items-end gap-3">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            className="min-h-[48px] max-h-[200px] resize-none"
            disabled={isLoading}
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-primary text-white hover:bg-primary/90"
          >
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Invia messaggio</span>
          </Button>
          {status === "connected" && <CheckCircle color="green"></CheckCircle>}
          {status === "disconnected" && <XCircle color="red"></XCircle>}
        </form>
        <div className="mt-2 text-xs text-muted-foreground">
          Premi Invio per inviare, Shift + Invio per andare a capo
        </div>
      </div>
    </div>
  );
}
