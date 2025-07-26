import { useState } from 'react';
import { JiraHeader } from '@/components/JiraHeader';
import { IssueCard } from '@/components/IssueCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';

const mockSearchResults = [
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
    key: 'AIJIRA-3',
    title: 'Allow inline editing of AI-generated items before submission',
    type: 'story' as const,
    status: 'todo' as const,
    priority: 'high' as const,
    assignee: { name: 'Mike Johnson' },
    project: 'AIJIRA',
    updated: '6 hours ago'
  },
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
];

const filterOptions = [
  { id: 'all', label: 'All', count: 24 },
  { id: 'assigned', label: 'Assigned to me', count: 8 },
  { id: 'created', label: 'Created by me', count: 5 },
  { id: 'watching', label: 'Watching', count: 12 },
  { id: 'recent', label: 'Recently updated', count: 15 }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  const filteredResults = mockSearchResults.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <JiraHeader title="Search" />
      
      {/* Search Input */}
      <div className="p-4 bg-card border-b border-border">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search issues, projects, people..." 
            className="pl-10 pr-12 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={handleSearch}
          >
            <SearchIcon size={16} />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          {filterOptions.map((filter) => (
            <Badge
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap ${
                activeFilter === filter.id 
                  ? 'bg-jira-blue text-white border-jira-blue' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label} ({filter.count})
            </Badge>
          ))}
        </div>

        {/* Advanced Filters */}
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <SlidersHorizontal size={16} />
          Advanced filters
        </Button>
      </div>

      <div className="p-4">
        {!showResults && !searchQuery ? (
          /* Recent Searches */
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Recent searches</h3>
            <div className="space-y-2">
              {['AI chatbot', 'mobile app', 'bug status:done', 'assignee:john'].map((search) => (
                <button
                  key={search}
                  className="w-full text-left p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    setSearchQuery(search);
                    setShowResults(true);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SearchIcon size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">
                {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
              </h3>
              <Button variant="ghost" size="sm">
                <Filter size={16} />
              </Button>
            </div>

            <div className="space-y-3">
              {filteredResults.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>

            {filteredResults.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-2">No results found</div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}