import { JiraHeader } from '@/components/JiraHeader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, GitCommit, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'comment' | 'status_change' | 'assignment' | 'creation';
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  time: string;
  details?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'comment',
    user: { name: 'John Doe' },
    action: 'commented on',
    target: 'AIJIRA-1',
    time: '2 hours ago',
    details: 'Added implementation details for the LLM integration'
  },
  {
    id: '2',
    type: 'status_change',
    user: { name: 'Jane Smith' },
    action: 'moved',
    target: 'AIJIRA-2',
    time: '4 hours ago',
    details: 'from To Do to In Progress'
  },
  {
    id: '3',
    type: 'assignment',
    user: { name: 'Mike Johnson' },
    action: 'assigned',
    target: 'AIJIRA-3',
    time: '6 hours ago',
    details: 'to Jane Smith'
  },
  {
    id: '4',
    type: 'creation',
    user: { name: 'John Doe' },
    action: 'created',
    target: 'AIJIRA-4',
    time: '1 day ago',
    details: 'Connect mobile app to Jira via REST API with OAuth 2.0'
  },
  {
    id: '5',
    type: 'status_change',
    user: { name: 'Mike Johnson' },
    action: 'resolved',
    target: 'WEB-15',
    time: '1 day ago',
    details: 'Fixed login button alignment issue'
  }
];

export default function Activity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return <MessageSquare size={16} className="text-jira-blue" />;
      case 'status_change': return <GitCommit size={16} className="text-jira-orange" />;
      case 'assignment': return <UserPlus size={16} className="text-jira-purple" />;
      case 'creation': return <CheckCircle size={16} className="text-jira-green" />;
      default: return <AlertCircle size={16} className="text-muted-foreground" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'comment': return 'border-l-jira-blue';
      case 'status_change': return 'border-l-jira-orange';
      case 'assignment': return 'border-l-jira-purple';
      case 'creation': return 'border-l-jira-green';
      default: return 'border-l-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <JiraHeader title="Activity" />
      
      {/* Activity Feed */}
      <div className="p-4">
        <div className="space-y-4">
          {mockActivities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`relative pl-4 border-l-2 ${getActivityColor(activity.type)} ${
                index !== mockActivities.length - 1 ? 'pb-4' : ''
              }`}
            >
              {/* Activity Icon */}
              <div className="absolute -left-2 top-1 w-4 h-4 bg-background flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>

              {/* Activity Content */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-muted text-xs">
                      {activity.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{activity.user.name}</span>
                      <span className="text-muted-foreground">{activity.action}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.target}
                      </Badge>
                    </div>
                    
                    {activity.details && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.details}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      
                      {activity.type === 'comment' && (
                        <Badge variant="outline" className="text-xs">
                          View comment
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-6">
          <button className="text-jira-blue text-sm font-medium">
            Load more activity
          </button>
        </div>
      </div>
    </div>
  );
}