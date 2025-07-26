import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  key: string;
  name: string;
  type: 'software' | 'business' | 'service-desk';
  lead: {
    name: string;
    avatar?: string;
  };
  issuesCount: number;
  isStarred: boolean;
  lastActivity: string;
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'software': return 'bg-jira-blue-light text-jira-blue border-jira-blue/20';
      case 'business': return 'bg-jira-orange/10 text-jira-orange border-jira-orange/20';
      case 'service-desk': return 'bg-jira-green/10 text-jira-green border-jira-green/20';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProjectTypeText = (type: string) => {
    switch (type) {
      case 'software': return 'Software';
      case 'business': return 'Business';
      case 'service-desk': return 'Service Desk';
      default: return type;
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-elevated transition-shadow"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-jira-blue rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">{project.key}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground leading-5">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.key}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-6 w-6 ${project.isStarred ? 'text-jira-yellow' : 'text-muted-foreground'}`}
          >
            <Star size={14} fill={project.isStarred ? 'currentColor' : 'none'} />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-muted-foreground">
            <MoreHorizontal size={14} />
          </Button>
        </div>
      </div>

      {/* Project Type */}
      <Badge 
        variant="outline" 
        className={`text-xs px-2 py-1 mb-3 ${getProjectTypeColor(project.type)}`}
      >
        {getProjectTypeText(project.type)}
      </Badge>

      {/* Stats */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">
          {project.issuesCount} issues
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Lead:</span>
          <Avatar className="w-5 h-5">
            <AvatarFallback className="bg-muted text-xs">
              {project.lead.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Last Activity */}
      <div className="pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">Last activity {project.lastActivity}</span>
      </div>
    </div>
  );
}