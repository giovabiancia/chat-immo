import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function ChatMessage({ type, content, timestamp, isLoading }) {
  const isAssistant = type === "assistant";

  // Funzione per verificare se il contenuto è HTML
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(content);

  return (
    <div
      className={cn(
        "group relative w-full px-4 md:px-8 py-6",
        isAssistant ? "bg-blue-50" : "bg-background"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-3xl gap-4 md:gap-6",
          isAssistant ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Avatar className="h-5 w-5 md:h-8 md:w-8 shrink-0">
          {isAssistant ? (
            <img
              className="h-5 w-5 md:h-8 md:w-8"
              src="./icona-immobiliare.png"
              alt="Assistant Icon"
            />
          ) : (
            <AvatarFallback className="bg-secondary text-white">
              <User2 className="h-5 w-5" />
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 space-y-2">
          <div
            className={cn(
              "prose prose-blue dark:prose-invert max-w-none",
              isAssistant ? "text-left" : "text-right"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce bg-primary/50 rounded-full [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce bg-primary/50 rounded-full [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce bg-primary/50 rounded-full" />
              </div>
            ) : isHTML ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <ReactMarkdown remarkPlugins={[]} rehypePlugins={[rehypeRaw]}>
                {content}
              </ReactMarkdown>
            )}
          </div>

          <div
            className={cn(
              "text-xs text-muted-foreground",
              isAssistant ? "text-left" : "text-right"
            )}
          >
            {timestamp && new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
