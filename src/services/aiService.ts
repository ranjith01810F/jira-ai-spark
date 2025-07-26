import { ProjectData } from '@/components/ProjectStructure';

// Mock AI service for generating project structure
// In a real implementation, this would call OpenAI GPT-4 API
export async function generateProjectStructure(problemStatement: string): Promise<ProjectData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate a realistic project structure based on the problem statement
  const projectName = extractProjectName(problemStatement);
  const projectKey = generateProjectKey(projectName);

  return {
    name: projectName,
    key: projectKey,
    epic: {
      id: 'epic-1',
      title: `${projectName} Development`,
      description: `Complete development of ${projectName} with all core features and functionality as described in the problem statement.`,
      userStories: [
        {
          id: 'story-1',
          title: 'User Authentication System',
          description: 'As a user, I want to securely sign up, log in, and manage my account so that my data is protected and I can access personalized features.',
          priority: 'High' as const,
          tasks: [
            {
              id: 'task-1',
              title: 'Implement user registration',
              description: 'Create registration form with validation and email verification',
              priority: 'High' as const,
            },
            {
              id: 'task-2',
              title: 'Implement user login',
              description: 'Create login form with authentication and session management',
              priority: 'High' as const,
            },
            {
              id: 'task-3',
              title: 'Password reset functionality',
              description: 'Allow users to reset their password via email',
              priority: 'Medium' as const,
            },
          ],
        },
        {
          id: 'story-2',
          title: 'Core Application Features',
          description: 'As a user, I want to access the main features of the application so that I can accomplish my primary goals.',
          priority: 'High' as const,
          tasks: [
            {
              id: 'task-4',
              title: 'Design main user interface',
              description: 'Create responsive and intuitive UI for core features',
              priority: 'High' as const,
            },
            {
              id: 'task-5',
              title: 'Implement core functionality',
              description: 'Build the main features as described in requirements',
              priority: 'High' as const,
            },
            {
              id: 'task-6',
              title: 'Add search and filtering',
              description: 'Allow users to find content quickly',
              priority: 'Medium' as const,
            },
          ],
        },
        {
          id: 'story-3',
          title: 'Mobile Optimization',
          description: 'As a user, I want the application to work seamlessly on mobile devices so that I can use it anywhere.',
          priority: 'Medium' as const,
          tasks: [
            {
              id: 'task-7',
              title: 'Responsive design implementation',
              description: 'Ensure all features work properly on mobile devices',
              priority: 'Medium' as const,
            },
            {
              id: 'task-8',
              title: 'Touch gesture support',
              description: 'Add appropriate touch interactions for mobile users',
              priority: 'Low' as const,
            },
          ],
        },
      ],
    },
  };
}

function extractProjectName(problemStatement: string): string {
  // Simple extraction logic - in real implementation, this would use AI
  const keywords = problemStatement.toLowerCase();
  
  if (keywords.includes('food') && keywords.includes('delivery')) {
    return 'Food Delivery Platform';
  }
  if (keywords.includes('e-commerce') || keywords.includes('shopping')) {
    return 'E-Commerce Platform';
  }
  if (keywords.includes('chat') || keywords.includes('messaging')) {
    return 'Chat Application';
  }
  if (keywords.includes('booking') || keywords.includes('reservation')) {
    return 'Booking System';
  }
  if (keywords.includes('social') || keywords.includes('network')) {
    return 'Social Platform';
  }
  if (keywords.includes('project') && keywords.includes('management')) {
    return 'Project Management Tool';
  }
  
  // Default fallback
  return 'Custom Application';
}

function generateProjectKey(projectName: string): string {
  return projectName
    .toUpperCase()
    .replace(/[^A-Z\s]/g, '')
    .split(' ')
    .map(word => word.substring(0, 3))
    .join('')
    .substring(0, 6);
}