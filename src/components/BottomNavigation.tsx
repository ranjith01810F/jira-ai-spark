import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Kanban, Activity, User } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
  { id: 'boards', label: 'Boards', icon: Kanban, path: '/boards' },
  { id: 'activity', label: 'Activity', icon: Activity, path: '/activity' },
  { id: 'profile', label: 'You', icon: User, path: '/profile' },
];

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'text-jira-blue' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}