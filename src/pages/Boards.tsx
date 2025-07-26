import { JiraHeader } from '@/components/JiraHeader';
import { IssueCard } from '@/components/IssueCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal } from 'lucide-react';

const mockColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-100',
    issues: [
      {
        id: '2',
        key: 'AIJIRA-2',
        title: 'Build a UI for inputting problem statements and showing AI output',
        type: 'task' as const,
        status: 'todo' as const,
        priority: 'medium' as const,
        assignee: { name: 'Jane Smith' },
        project: 'AIJIRA',
        updated: '4 hours ago'
      },
      {
        id: '3',
        key: 'AIJIRA-3',
        title: 'Allow inline editing of AI-generated items before submission',
        type: 'story' as const,
        status: 'todo' as const,
        priority: 'high' as const,
        assignee: { name: 'Mike Johnson' },
        project: 'AIJIRA',
        updated: '6 hours ago'
      }
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: 'bg-blue-100',
    issues: [
      {
        id: '1',
        key: 'AIJIRA-1',
        title: 'Integrate LLM (e.g., OpenAI GPT-4) with the mobile app',
        type: 'story' as const,
        status: 'progress' as const,
        priority: 'high' as const,
        assignee: { name: 'John Doe' },
        project: 'AIJIRA',
        updated: '2 hours ago'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-100',
    issues: [
      {
        id: '4',
        key: 'WEB-15',
        title: 'Fix login button alignment on mobile devices',
        type: 'bug' as const,
        status: 'done' as const,
        priority: 'low' as const,
        assignee: { name: 'Mike Johnson' },
        project: 'WEB',
        updated: '1 day ago'
      }
    ]
  }
];

export default function Boards() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <JiraHeader title="Boards" />
      
      {/* Board Header */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">AIJIRA Board</h2>
            <p className="text-sm text-muted-foreground">Software project</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={16} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            All issues (4)
          </Badge>
          <Badge variant="outline" className="text-xs">
            Only my issues
          </Badge>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {mockColumns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-72">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color.replace('bg-', 'bg-')}`} />
                  <h3 className="font-medium text-foreground">{column.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {column.issues.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus size={14} />
                </Button>
              </div>

              {/* Issues */}
              <div className="space-y-3">
                {column.issues.map((issue) => (
                  <div key={issue.id} className="transform hover:scale-[1.02] transition-transform">
                    <IssueCard issue={issue} />
                  </div>
                ))}
                
                {/* Add Issue Button */}
                <Button 
                  variant="ghost" 
                  className="w-full h-12 border-2 border-dashed border-muted-foreground/25 text-muted-foreground hover:border-jira-blue hover:text-jira-blue"
                >
                  <Plus size={16} className="mr-2" />
                  Create issue
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}