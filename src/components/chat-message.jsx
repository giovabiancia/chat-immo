import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export function ChatMessage({ type, content, timestamp, isLoading }) {
  const isAssistant = type === "assistant";

  return (
    <div
      className={cn(
        "group relative w-full px-4 md:px-8 py-6",
        isAssistant ? "bg-blue-50" : "bg-background"
      )}
    >
      <div className="mx-auto flex max-w-3xl gap-4 md:gap-6">
        <Avatar className="h-8 w-8 md:h-10 md:w-10 shrink-0">
          <AvatarFallback
            className={
              isAssistant ? "bg-white text-white" : "bg-secondary text-white"
            }
          >
            {isAssistant ? (
              <img className="h-5 w-5" src="./icona-immobiliare.png" />
            ) : (
              <User2 className="h-5 w-5" />
            )}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="prose prose-blue dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce bg-primary/50 rounded-full [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce bg-primary/50 rounded-full [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce bg-primary/50 rounded-full" />
              </div>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
