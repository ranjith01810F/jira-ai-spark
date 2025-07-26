import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit3, Check, X, Layers, Users, CheckSquare, Upload } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  tasks: Task[];
}

export interface Epic {
  id: string;
  title: string;
  description: string;
  userStories: UserStory[];
}

export interface ProjectData {
  name: string;
  key: string;
  epic: Epic;
}

interface ProjectStructureProps {
  projectData: ProjectData;
  onProjectUpdate: (data: ProjectData) => void;
  onPushToJira: () => void;
  isPushing: boolean;
}

export function ProjectStructure({ projectData, onProjectUpdate, onPushToJira, isPushing }: ProjectStructureProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  const startEdit = (id: string, item: any) => {
    setEditingItem(id);
    setEditValues(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValues({});
  };

  const saveEdit = (type: 'project' | 'epic' | 'story' | 'task', id: string) => {
    const updatedData = { ...projectData };
    
    if (type === 'project') {
      updatedData.name = editValues.name;
      updatedData.key = editValues.key;
    } else if (type === 'epic') {
      updatedData.epic.title = editValues.title;
      updatedData.epic.description = editValues.description;
    } else if (type === 'story') {
      const storyIndex = updatedData.epic.userStories.findIndex(s => s.id === id);
      if (storyIndex !== -1) {
        updatedData.epic.userStories[storyIndex] = { ...updatedData.epic.userStories[storyIndex], ...editValues };
      }
    } else if (type === 'task') {
      for (const story of updatedData.epic.userStories) {
        const taskIndex = story.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
          story.tasks[taskIndex] = { ...story.tasks[taskIndex], ...editValues };
          break;
        }
      }
    }
    
    onProjectUpdate(updatedData);
    setEditingItem(null);
    setEditValues({});
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card className="p-6 shadow-card border-0 bg-gradient-subtle">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Generated Project Structure</h2>
              <p className="text-sm text-muted-foreground">Review and edit before pushing to Jira</p>
            </div>
          </div>
          <Button
            onClick={onPushToJira}
            disabled={isPushing}
            className="bg-gradient-primary hover:shadow-elevated transition-all duration-200"
          >
            {isPushing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Pushing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Push to Jira
              </>
            )}
          </Button>
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Project Information</h3>
            {editingItem !== 'project' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startEdit('project', { name: projectData.name, key: projectData.key })}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingItem === 'project' ? (
            <div className="space-y-3">
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                placeholder="Project Name"
              />
              <Input
                value={editValues.key}
                onChange={(e) => setEditValues({ ...editValues, key: e.target.value })}
                placeholder="Project Key"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => saveEdit('project', 'project')}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelEdit}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Project Name</p>
                <p className="font-medium">{projectData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Key</p>
                <p className="font-medium">{projectData.key}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Epic */}
      <Card className="p-6 shadow-card border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Epic</h3>
              <p className="text-sm text-muted-foreground">High-level feature or capability</p>
            </div>
          </div>
          {editingItem !== projectData.epic.id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => startEdit(projectData.epic.id, projectData.epic)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {editingItem === projectData.epic.id ? (
          <div className="space-y-3">
            <Input
              value={editValues.title}
              onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
              placeholder="Epic Title"
            />
            <Textarea
              value={editValues.description}
              onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
              placeholder="Epic Description"
              rows={3}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => saveEdit('epic', projectData.epic.id)}>
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={cancelEdit}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">{projectData.epic.title}</h4>
            <p className="text-muted-foreground">{projectData.epic.description}</p>
          </div>
        )}
      </Card>

      {/* User Stories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Stories ({projectData.epic.userStories.length})
        </h3>
        
        {projectData.epic.userStories.map((story) => (
          <Card key={story.id} className="p-4 shadow-card border-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                  <Users className="w-3 h-3 text-blue-600" />
                </div>
                <Badge className={getPriorityColor(story.priority)}>{story.priority}</Badge>
              </div>
              {editingItem !== story.id && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(story.id, story)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {editingItem === story.id ? (
              <div className="space-y-3">
                <Input
                  value={editValues.title}
                  onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                  placeholder="Story Title"
                />
                <Textarea
                  value={editValues.description}
                  onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                  placeholder="Story Description"
                  rows={2}
                />
                <select
                  value={editValues.priority}
                  onChange={(e) => setEditValues({ ...editValues, priority: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit('story', story.id)}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{story.title}</h4>
                <p className="text-sm text-muted-foreground">{story.description}</p>
              </div>
            )}

            {/* Tasks */}
            {story.tasks.length > 0 && (
              <div className="mt-4 space-y-2">
                <h5 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Tasks ({story.tasks.length})
                </h5>
                {story.tasks.map((task) => (
                  <div key={task.id} className="ml-6 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getPriorityColor(task.priority)} variant="outline">
                        {task.priority}
                      </Badge>
                      {editingItem !== task.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(task.id, task)}
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    {editingItem === task.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editValues.title}
                          onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                          placeholder="Task Title"
                          className="text-sm"
                        />
                        <Textarea
                          value={editValues.description}
                          onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                          placeholder="Task Description"
                          rows={2}
                          className="text-sm"
                        />
                        <select
                          value={editValues.priority}
                          onChange={(e) => setEditValues({ ...editValues, priority: e.target.value })}
                          className="w-full p-2 border rounded-md text-sm"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveEdit('task', task.id)}>
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEdit}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <h6 className="text-sm font-medium text-foreground">{task.title}</h6>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}