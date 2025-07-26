import { Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface JiraHeaderProps {
  title: string;
  showNotifications?: boolean;
  showSettings?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function JiraHeader({ 
  title, 
  showNotifications = true, 
  showSettings = false, 
  showMenu = false,
  onMenuClick 
}: JiraHeaderProps) {
  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showMenu && (
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            <Menu size={20} />
          </Button>
        )}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {showNotifications && (
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-jira-red text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        )}
        
        {showSettings && (
          <Button variant="ghost" size="sm">
            <Settings size={20} />
          </Button>
        )}
        
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-jira-blue text-white text-sm font-medium">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}