import React from 'react';
import { 
  Home, 
  Settings, 
  LayoutGrid, 
  FileCode, 
  Database, 
  Users,
  ChevronRight,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  currentView: 'home' | 'projects' | 'workspace' | 'templates' | 'knowledge' | 'agents' | 'settings';
  onNavigate: (view: 'home' | 'projects' | 'workspace' | 'templates' | 'knowledge' | 'agents' | 'settings') => void;
  hasActiveProject: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, hasActiveProject }) => {
  return (
    <div className="w-64 border-r border-border bg-surface flex flex-col h-screen shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div>
            <h1 className="font-bold text-gray-100 tracking-tight">Agentic Studio</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Pro Edition</p>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-2">WORKSPACE</div>
        <nav className="space-y-1">
          <NavItem 
            icon={<Home size={18} />} 
            label="Home" 
            active={currentView === 'home'} 
            onClick={() => onNavigate('home')}
          />
          <NavItem 
            icon={<LayoutGrid size={18} />} 
            label="Projects" 
            active={currentView === 'projects'}
            onClick={() => onNavigate('projects')}
          />
          {hasActiveProject && (
             <NavItem 
                icon={<Cpu size={18} />} 
                label="Active Session" 
                active={currentView === 'workspace'}
                onClick={() => onNavigate('workspace')}
             />
          )}
          <NavItem 
            icon={<FileCode size={18} />} 
            label="Templates" 
            active={currentView === 'templates'}
            onClick={() => onNavigate('templates')} 
          />
        </nav>
      </div>

      <div className="px-4 py-2 mt-4">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-2">RESOURCES</div>
        <nav className="space-y-1">
          <NavItem 
            icon={<Database size={18} />} 
            label="Knowledge Base" 
            active={currentView === 'knowledge'}
            onClick={() => onNavigate('knowledge')}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Agents" 
            active={currentView === 'agents'}
            onClick={() => onNavigate('agents')}
          />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <button 
            onClick={() => onNavigate('settings')}
            className={`flex items-center gap-2 transition-colors w-full px-3 py-2 rounded-md ${currentView === 'settings' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${active ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
  >
    {icon}
    <span>{label}</span>
    {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
  </button>
);
