import { Sparkles, Zap, FileCode, Terminal } from "lucide-react";

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const suggestions = [
  {
    icon: FileCode,
    title: "React Component",
    prompt: "Create a responsive React navbar component with dropdown menus and mobile hamburger menu",
  },
  {
    icon: Terminal,
    title: "TypeScript Function",
    prompt: "Write a TypeScript function to debounce API calls with proper typing",
  },
  {
    icon: Zap,
    title: "API Integration",
    prompt: "Show me how to create a custom React hook for fetching data with loading and error states",
  },
  {
    icon: Sparkles,
    title: "Tailwind UI",
    prompt: "Build a beautiful pricing card component with Tailwind CSS featuring hover animations",
  },
];

export const WelcomeScreen = ({ onPromptClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        <span className="gradient-text">Lucid Coder AI</span>
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Your AI-powered code generation assistant. Ask me to write, explain, or debug any code.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(suggestion.prompt)}
            className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <suggestion.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">{suggestion.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {suggestion.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
