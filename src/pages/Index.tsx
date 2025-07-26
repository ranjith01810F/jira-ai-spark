import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ProjectStructure, ProjectData } from '@/components/ProjectStructure';
import { generateProjectStructure } from '@/services/aiService';
import { pushToJira } from '@/services/jiraService';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Zap } from 'lucide-react';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Jira Assistant</h1>
              <p className="text-white/90">Transform ideas into structured Jira projects with AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI-Powered Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/60 rounded-full"></span>
              <span className="text-sm">Manual Editing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/60 rounded-full"></span>
              <span className="text-sm">Direct Jira Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <ChatInterface 
            onProblemSubmit={handleProblemSubmit}
            isLoading={isGenerating}
          />
          
          {projectData && (
            <ProjectStructure
              projectData={projectData}
              onProjectUpdate={handleProjectUpdate}
              onPushToJira={handlePushToJira}
              isPushing={isPushing}
            />
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
