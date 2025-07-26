import { useState } from 'react';
import { JiraHeader } from '@/components/JiraHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { IssueCard } from '@/components/IssueCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Bot } from 'lucide-react';
import { ChatInterface } from '@/components/ChatInterface';
import { ProjectStructure, ProjectData } from '@/components/ProjectStructure';
import { generateProjectStructure } from '@/services/aiService';
import { pushToJira } from '@/services/jiraService';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockProjects = [
  {
    id: '1',
    key: 'AIJIRA',
    name: 'AI Chatbot-Enhanced Jira Mobile',
    type: 'software' as const,
    lead: { name: 'John Doe' },
    issuesCount: 24,
    isStarred: true,
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    key: 'WEB',
    name: 'Website Redesign',
    type: 'business' as const,
    lead: { name: 'Jane Smith' },
    issuesCount: 18,
    isStarred: false,
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    key: 'SUPP',
    name: 'Customer Support Portal',
    type: 'service-desk' as const,
    lead: { name: 'Mike Johnson' },
    issuesCount: 31,
    isStarred: true,
    lastActivity: '3 hours ago'
  }
];

const mockRecentIssues = [
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
  },
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
    key: 'WEB-15',
    title: 'Fix login button alignment on mobile devices',
    type: 'bug' as const,
    status: 'done' as const,
    priority: 'low' as const,
    assignee: { name: 'Mike Johnson' },
    project: 'WEB',
    updated: '1 day ago'
  }
];

export default function Dashboard() {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const { toast } = useToast();

  const handleProblemSubmit = async (problem: string) => {
    setIsGenerating(true);
    try {
      const generated = await generateProjectStructure(problem);
      setProjectData(generated);
      toast({
        title: "Project Generated Successfully!",
        description: "AI has created your project structure. Review and edit as needed.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate project structure. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProjectUpdate = (data: ProjectData) => {
    setProjectData(data);
  };

  const handlePushToJira = async () => {
    if (!projectData) return;
    
    setIsPushing(true);
    try {
      await pushToJira(projectData);
      toast({
        title: "Successfully Pushed to Jira!",
        description: "Your project structure has been created in Jira.",
      });
      setShowAIAssistant(false);
      setProjectData(null);
    } catch (error) {
      toast({
        title: "Push Failed",
        description: "Failed to push to Jira. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsPushing(false);
    }
  };

  if (showAIAssistant) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <JiraHeader 
          title="AI Project Assistant" 
          showNotifications={false}
          showMenu={true}
          onMenuClick={() => setShowAIAssistant(false)}
        />
        
        <div className="p-4 space-y-6">
          {!projectData ? (
            <ChatInterface 
              onProblemSubmit={handleProblemSubmit}
              isLoading={isGenerating}
            />
          ) : (
            <ProjectStructure
              projectData={projectData}
              onProjectUpdate={handleProjectUpdate}
              onPushToJira={handlePushToJira}
              isPushing={isPushing}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <JiraHeader title="Dashboard" />
      
      {/* Search Bar */}
      <div className="p-4 bg-card border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search issues, projects..." 
            className="pl-10 pr-12 bg-background"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Assistant CTA */}
        <div className="bg-gradient-to-r from-jira-blue to-jira-purple rounded-lg p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Bot size={24} />
            <div>
              <h3 className="font-semibold">AI Project Assistant</h3>
              <p className="text-sm text-white/90">Create projects from natural language</p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white text-jira-blue hover:bg-white/90"
            onClick={() => setShowAIAssistant(true)}
          >
            Try AI Assistant
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start gap-2 h-12">
            <Plus size={16} />
            Create Issue
          </Button>
          <Button variant="outline" className="justify-start gap-2 h-12">
            <Plus size={16} />
            Create Project
          </Button>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
            <Button variant="ghost" size="sm" className="text-jira-blue">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Recent Issues */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Recent Issues</h2>
            <Button variant="ghost" size="sm" className="text-jira-blue">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {mockRecentIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}