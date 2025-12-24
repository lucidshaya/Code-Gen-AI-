import { MessageSquare, Plus, Trash2, X, PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  isOpen,
  onClose,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:relative z-50 md:z-auto h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200 ease-in-out",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-0 md:-translate-x-0"
        )}
      >
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-sidebar-border",
          !isOpen && "hidden"
        )}>
          <h2 className="font-semibold text-sm">Conversations</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={onNew} className="h-8 w-8">
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <PanelLeftClose className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className={cn("flex-1 p-2", !isOpen && "hidden")}>
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No conversations yet
            </p>
          ) : (
            <div className="space-y-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                    activeId === conv.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50"
                  )}
                  onClick={() => onSelect(conv.id)}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-sm truncate">{conv.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className={cn("p-4 border-t border-sidebar-border", !isOpen && "hidden")}>
          <p className="text-xs text-muted-foreground text-center">
            Lucid Coder AI
          </p>
        </div>
      </aside>
    </>
  );
};
