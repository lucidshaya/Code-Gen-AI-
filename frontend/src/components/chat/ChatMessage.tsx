import { useState } from "react";
import { Copy, Check, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export const ChatMessage = ({ role, content, isLoading }: ChatMessageProps) => {
  const isUser = role === "user";

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="typing-indicator flex gap-1 py-2">
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
    }

    // Parse content for code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).split("\n");
        const language = lines[0].trim() || "plaintext";
        const code = lines.slice(1).join("\n");
        return <CodeBlock key={index} code={code} language={language} />;
      }
      
      // Render regular text with inline code support
      const inlineParts = part.split(/(`[^`]+`)/g);
      return (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          {inlineParts.map((inlinePart, i) => {
            if (inlinePart.startsWith("`") && inlinePart.endsWith("`")) {
              return (
                <code
                  key={i}
                  className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm text-primary"
                >
                  {inlinePart.slice(1, -1)}
                </code>
              );
            }
            return inlinePart;
          })}
        </p>
      );
    });
  };

  return (
    <div
      className={cn(
        "message-fade-in flex gap-4 p-4 md:p-6",
        isUser ? "bg-transparent" : "bg-card/50"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          isUser ? "bg-secondary" : "bg-primary/20"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-secondary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>
      <div className="flex-1 overflow-hidden space-y-3">{renderContent()}</div>
    </div>
  );
};
