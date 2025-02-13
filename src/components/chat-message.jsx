import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp, User2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { toast } from "react-toastify";

export function ChatMessage({ type, content, timestamp, isLoading }) {
  const isAssistant = type === "agent";
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(content);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = async (type) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://152.42.137.28:1865/custom/segnalazione_risposta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: content, // passing the message content
            should_be_blocked: type === "negative",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Feedback submitted successfully:", data);
      setFeedback(type);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast("Error submitting feedback:" + error, { type: "error" });
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative w-full px-4 md:px-8 py-6 ease-linear",
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

          <div className="flex items-center justify-between">
            <div
              className={cn(
                "text-xs text-muted-foreground",
                isAssistant ? "text-left" : "text-right"
              )}
            >
              {timestamp && new Date(timestamp).toLocaleTimeString()}
            </div>
            {!isAssistant && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "transition-all",
                    feedback === "positive"
                      ? "opacity-100 text-green-500 hover:text-green-600 hover:bg-green-50"
                      : feedback
                      ? "hidden"
                      : "group-hover:opacity-100"
                  )}
                  onClick={() => handleFeedback("positive")}
                  disabled={feedback === "positive" || isSubmitting}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {feedback === "positive" && (
                    <span className="ml-2 text-xs">
                      Thanks for the feedback!
                    </span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "transition-all",
                    feedback === "negative"
                      ? "opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50"
                      : feedback
                      ? "hidden"
                      : "group-hover:opacity-100"
                  )}
                  onClick={() => handleFeedback("negative")}
                  disabled={feedback === "negative" || isSubmitting}
                >
                  <ThumbsDown className="h-4 w-4" />
                  {feedback === "negative" && (
                    <span className="ml-2 text-xs">Feedback sent</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
