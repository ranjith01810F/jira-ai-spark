import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUp, ArrowDown, Minus, AlertTriangle, Bug, CheckSquare } from 'lucide-react';

interface Issue {
  id: string;
  key: string;
  title: string;
  type: 'story' | 'bug' | 'task' | 'epic';
  status: 'todo' | 'progress' | 'done';
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  assignee?: {
    name: string;
    avatar?: string;
  };
  project: string;
  updated: string;
}

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'highest': return <ArrowUp size={16} className="text-priority-highest" />;
      case 'high': return <ArrowUp size={16} className="text-priority-high" />;
      case 'medium': return <Minus size={16} className="text-priority-medium" />;
      case 'low': return <ArrowDown size={16} className="text-priority-low" />;
      case 'lowest': return <ArrowDown size={16} className="text-priority-lowest" />;
      default: return <Minus size={16} className="text-priority-medium" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug size={16} className="text-jira-red" />;
      case 'story': return <CheckSquare size={16} className="text-jira-green" />;
      case 'task': return <CheckSquare size={16} className="text-jira-blue" />;
      case 'epic': return <AlertTriangle size={16} className="text-jira-purple" />;
      default: return <CheckSquare size={16} className="text-jira-blue" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-elevated transition-shadow"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon(issue.type)}
          <span className="text-sm font-medium text-muted-foreground">{issue.key}</span>
        </div>
        {getPriorityIcon(issue.priority)}
      </div>

      {/* Title */}
      <h3 className="text-foreground font-medium mb-3 line-clamp-2 leading-5">
        {issue.title}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={`text-xs px-2 py-1 ${getStatusColor(issue.status)}`}
          >
            {getStatusText(issue.status)}
          </Badge>
          <span className="text-xs text-muted-foreground">{issue.project}</span>
        </div>
        
        {issue.assignee && (
          <Avatar className="w-6 h-6">
            <AvatarFallback className="bg-muted text-xs">
              {issue.assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Updated time */}
      <div className="mt-2 pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">Updated {issue.updated}</span>
      </div>
    </div>
  );
}