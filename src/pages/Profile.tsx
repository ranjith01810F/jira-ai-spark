import { JiraHeader } from '@/components/JiraHeader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, LogOut, HelpCircle, Star, User, Mail, Building } from 'lucide-react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <JiraHeader title="You" showNotifications={false} />
      
      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-jira-blue text-white text-lg font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
              <p className="text-muted-foreground">john.doe@company.com</p>
              <p className="text-sm text-muted-foreground">Software Engineer</p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-jira-blue">12</div>
            <div className="text-xs text-muted-foreground">Issues Assigned</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-jira-green">8</div>
            <div className="text-xs text-muted-foreground">Issues Resolved</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-jira-orange">3</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="divide-y divide-border">
          {[
            { icon: Settings, label: 'Account Settings', color: 'text-muted-foreground' },
            { icon: Star, label: 'Starred', color: 'text-muted-foreground' },
            { icon: HelpCircle, label: 'Help & Support', color: 'text-muted-foreground' },
            { icon: LogOut, label: 'Sign Out', color: 'text-jira-red' },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
            >
              <item.icon size={20} className={item.color} />
              <span className={`font-medium ${item.color}`}>{item.label}</span>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}