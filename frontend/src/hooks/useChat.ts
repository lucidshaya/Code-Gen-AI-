import { useState, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const createConversation = useCallback((initialMessage?: string) => {
    const newConv: Conversation = {
      id: generateId(),
      title: initialMessage?.slice(0, 30) || "New Chat",
      messages: [],
      timestamp: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      let convId = activeConversationId;

      if (!convId) {
        convId = createConversation(content);
      }

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === convId) {
            return {
              ...c,
              messages: [...c.messages, userMessage],
              title: c.messages.length === 0 ? content.slice(0, 30) + "..." : c.title,
            };
          }
          return c;
        })
      );

      setIsLoading(true);

      try {
        const response = await fetch("/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: content }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to generate code");
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: data.code,
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === convId) {
              return {
                ...c,
                messages: [...c.messages, assistantMessage],
              };
            }
            return c;
          })
        );
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: "AI service is not available at this moment.",
        };
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === convId) {
              return {
                ...c,
                messages: [...c.messages, errorMessage],
              };
            }
            return c;
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversationId, createConversation]
  );

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  const newChat = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  return {
    conversations: conversations.map((c) => ({
      id: c.id,
      title: c.title,
      timestamp: c.timestamp,
    })),
    messages: activeConversation?.messages || [],
    activeConversationId,
    isLoading,
    sendMessage,
    selectConversation: setActiveConversationId,
    deleteConversation,
    newChat,
  };
};
