import { useState } from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatInput } from "@/components/chat/ChatInput";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    conversations,
    messages,
    activeConversationId,
    isLoading,
    sendMessage,
    selectConversation,
    deleteConversation,
    newChat,
  } = useChat();

  const handleSend = (message: string) => {
    sendMessage(message);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId || undefined}
        onSelect={selectConversation}
        onNew={newChat}
        onDelete={deleteConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          onNewChat={newChat}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {messages.length === 0 && !isLoading ? (
          <WelcomeScreen onPromptClick={handleSend} />
        ) : (
          <ChatContainer messages={messages} isLoading={isLoading} />
        )}

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  );
};

export default Index;
