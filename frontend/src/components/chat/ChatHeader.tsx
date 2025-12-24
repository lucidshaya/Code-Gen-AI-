import { Sparkles, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onNewChat: () => void;
  onToggleSidebar?: () => void;
}

export const ChatHeader = ({ onNewChat, onToggleSidebar }: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Lucid Coder AI</h1>
            <p className="text-xs text-muted-foreground">Code Generation</p>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onNewChat}
        className="gap-1.5"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">New Chat</span>
      </Button>
    </header>
  );
};
