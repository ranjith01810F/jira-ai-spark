import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, Bot } from 'lucide-react';

interface ChatInterfaceProps {
  onProblemSubmit: (problem: string) => void;
  isLoading: boolean;
}

export function ChatInterface({ onProblemSubmit, isLoading }: ChatInterfaceProps) {
  const [problem, setProblem] = useState('');

  const handleSubmit = () => {
    if (problem.trim()) {
      onProblemSubmit(problem.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="p-6 shadow-card border-0 bg-gradient-subtle">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Project Assistant</h2>
          <p className="text-sm text-muted-foreground">Describe your project problem in natural language</p>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="e.g., 'We need to build a mobile app for food delivery with user authentication, restaurant browsing, order tracking, and payment integration...'"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={6}
          className="resize-none border-0 bg-card shadow-sm focus:shadow-elevated transition-all duration-200"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>AI will generate Epic, Stories & Tasks</span>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!problem.trim() || isLoading}
            className="bg-gradient-primary hover:shadow-elevated transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Project
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}