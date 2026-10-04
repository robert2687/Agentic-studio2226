import React, { useState, useEffect, useRef } from 'react';
import { AgentPhase } from '../../types';
import { initialAgents } from '../../lib/mockData';
import { useAgentController } from '../../lib/agentStore';
import { AgentCard } from '../AgentCard';
import { CommandPalette } from '../CommandPalette';
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelHandle } from 'react-resizable-panels';
import { Terminal, LayoutDashboard, Zap, ShieldCheck, Search, Bug, Stethoscope, Bot, ChevronLeft, Menu } from 'lucide-react';

interface Props {
  status: AgentPhase;
  onTriggerError?: () => void;
}

// ----------------------------------------------------------------------
// THE GENERATED APP: AgenticDashboard (Next.js 14 Pattern)
// ----------------------------------------------------------------------
const AgenticDashboard: React.FC = () => {
  const { agents, toggleAgentStatus, healAgent, healAll } = useAgentController(initialAgents);
  const [logs, setLogs] = useState<string[]>([
      "[SYSTEM]: Initialization complete.", 
      "[PLANNER]: Analyzing fleet status...",
      "[ORCHESTRATOR]: Connected to Neural Hive."
  ]);

  // Command Palette Handler
  const handleCommand = (action: string, id?: string) => {
     if (action === 'heal_all') {
         healAll();
         setLogs(prev => [...prev, `[COMMAND]: Executing global heal protocol...`, `[PATCHER]: All systems restored.`]);
     }
     if (action === 'deploy') {
         setLogs(prev => [...prev, `[COMMAND]: Initializing production deployment...`, `[SYSTEM]: Optimizing build chunks...`]);
     }
     if (action === 'restart') {
         setLogs(prev => [...prev, `[COMMAND]: Restarting simulation sequence...`]);
         window.location.reload(); // Simple reload for simulation restart
     }
     if (action === 'focus' && id) {
         toggleAgentStatus(id);
         setLogs(prev => [...prev, `[COMMAND]: Focus switched to unit ${id}`]);
     }
  };

  // Sidebar Logic
  const sidebarRef = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const panel = sidebarRef.current;
    if (panel) {
      if (isCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  // Simulate real-time logs when agent status changes
  useEffect(() => {
    const activeCount = agents.filter(a => a.status === 'active').length;
    const errorCount = agents.filter(a => a.status === 'error').length;
    
    if (errorCount > 0) {
        setLogs(prev => [...prev.slice(-6), `[ALERT]: ${errorCount} unit(s) reporting critical failure.`]);
    } else {
        setLogs(prev => [...prev.slice(-6), `[ORCHESTRATOR]: ${activeCount} agents currently operational. Systems nominal.`]);
    }
  }, [agents]);

  return (
    <div className="h-full bg-[#020617] text-slate-300 font-sans overflow-hidden">
      <CommandPalette agents={agents} onAction={handleCommand} />
      
      <PanelGroup direction="horizontal">
        {/* 1. Sidebar */}
        <Panel 
            ref={sidebarRef}
            defaultSize={20} 
            minSize={15} 
            collapsible={true}
            onCollapse={() => setIsCollapsed(true)}
            onExpand={() => setIsCollapsed(false)}
            className="bg-[#030816] flex flex-col border-r border-slate-800 transition-all duration-300 ease-in-out"
        >
            <div className="p-4 flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 text-indigo-500 font-bold text-lg tracking-tighter">
                        <Bot className="fill-indigo-500/20" /> 
                        <span className="truncate">SWARM OS</span>
                    </div>
                    <button 
                        onClick={toggleSidebar} 
                        className="p-1 hover:bg-slate-800 rounded text-slate-500 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                </div>

                <nav className="flex flex-col gap-1">
                <div className="flex items-center gap-3 p-3 bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 rounded-lg cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                </div>
                <div className="flex items-center gap-3 p-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors">
                    <Zap className="w-4 h-4" /> Activity
                </div>
                <div className="flex items-center gap-3 p-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors">
                    <ShieldCheck className="w-4 h-4" /> Security
                </div>
                </nav>
                
                <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/10">
                    <div className="text-xs font-bold text-indigo-400 mb-1">Total Compute</div>
                    <div className="text-2xl font-mono text-white">84%</div>
                    <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[84%] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-transparent hover:bg-indigo-500/50 transition-colors cursor-col-resize active:bg-indigo-500" />

        {/* 2. Main Content */}
        <Panel defaultSize={55} minSize={30} className="bg-[#020617] flex flex-col relative">
            {isCollapsed && (
                <button 
                  onClick={toggleSidebar}
                  className="absolute top-6 left-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 text-indigo-400 rounded-md border border-slate-700 backdrop-blur-sm transition-all shadow-lg"
                >
                  <Menu className="w-4 h-4" />
                </button>
            )}

            <div className="flex-1 p-6 overflow-y-auto">
                <header className={`flex justify-between items-center mb-8 transition-all duration-300 ${isCollapsed ? 'pl-12' : ''}`}>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Agent Fleet</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and heal your autonomous swarm.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                         System Normal
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input 
                            className="bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-64" 
                            placeholder="Search unit ID..." 
                        />
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <kbd className="hidden sm:inline-block border border-slate-700 bg-slate-800 text-slate-500 text-[10px] rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
                        </div>
                    </div>
                </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {agents.map(agent => (
                    <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onToggle={toggleAgentStatus} 
                    onHeal={healAgent} 
                    />
                ))}
                
                {/* Add New Agent Placeholder */}
                <div className="border border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-slate-600 hover:border-slate-700 hover:bg-slate-900/30 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:bg-slate-800 transition-colors">
                        <Zap size={20} />
                    </div>
                    <span className="text-sm font-medium">Deploy New Agent</span>
                </div>
                </div>
            </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-transparent hover:bg-indigo-500/50 transition-colors cursor-col-resize active:bg-indigo-500" />

        {/* 3. Real-time Terminal Panel */}
        <Panel defaultSize={25} minSize={20} className="bg-[#000000] flex flex-col border-l border-slate-800">
            <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-2 text-[10px] font-bold font-mono text-slate-500 mb-4 border-b border-slate-900 pb-3 uppercase tracking-widest">
                <Terminal className="w-3 h-3 text-indigo-500" /> Neural Stream
                </div>
                <div className="flex-1 font-mono text-[10px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                {logs.map((log, i) => (
                    <div key={i} className={`flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300 ${log.includes('ALERT') ? 'text-red-400' : log.includes('COMMAND') ? 'text-amber-400' : 'text-emerald-400'}`}>
                    <span className="opacity-30 select-none text-slate-500">{new Date().toLocaleTimeString([], {hour12: false, hour:'2-digit', minute:'2-digit', second:'2-digit'})}</span>
                    <span className="opacity-80">{log}</span>
                    </div>
                ))}
                <div className="animate-pulse inline-block w-1.5 h-3 bg-indigo-500/50 ml-1" />
                </div>
            </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

// ----------------------------------------------------------------------
// PREVIEW FRAME WRAPPER
// ----------------------------------------------------------------------
export const PreviewFrame: React.FC<Props> = ({ status, onTriggerError }) => {
  const isReady = status === AgentPhase.READY;
  const isPatching = status === AgentPhase.PATCHING;

  if (!isReady && !isPatching) {
    return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center text-gray-500 gap-4 border border-border rounded-lg bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="w-16 h-16 border-2 border-border border-t-primary rounded-full animate-spin"></div>
        <p className="animate-pulse">Building Application...</p>
        <div className="text-xs max-w-xs text-center text-gray-600">
            Waiting for: Planner, Designer, Architect, Coder, and Patcher to complete cycles.
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
        {/* Interactive Simulation Controls */}
        <div className="h-8 bg-black/20 flex items-center justify-end px-2 gap-2 border-b border-white/5 shrink-0">
             <button 
                onClick={onTriggerError}
                disabled={isPatching}
                className="text-[10px] flex items-center gap-1.5 px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
                <Bug size={10} />
                Simulate Bug
             </button>
        </div>

        <div className="flex-1 relative overflow-hidden">
            <AgenticDashboard />

            {/* Self-Healing Overlay */}
            {isPatching && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                         <Stethoscope size={40} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Patcher Agent Active</h3>
                    <p className="text-gray-400 max-w-md mb-6">
                        Runtime error detected. Reading stderr stream and applying hotfix...
                    </p>
                    <div className="w-full max-w-sm bg-black/50 rounded-lg p-3 border border-red-900/50 font-mono text-xs text-left text-red-300 mb-4 shadow-2xl">
                        &gt; Uncaught TypeError: Cannot read properties of undefined (reading 'map')<br/>
                        &gt; at AgentCard (src/components/AgentCard.tsx:45)<br/>
                        <span className="text-blue-400 animate-pulse mt-2 block">&gt; Analysis: "agent" prop is missing from parent list.</span>
                        <span className="text-green-400 mt-1 block">&gt; Action: Re-syncing agent store.</span>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};