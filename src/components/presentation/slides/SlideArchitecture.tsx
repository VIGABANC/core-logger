import { Server, ArrowRight, Database, BarChart3 } from 'lucide-react';

const components = [
  {
    id: 'originator',
    icon: Server,
    title: 'Originator',
    description: 'Generates syslog messages',
    examples: 'Routers, servers, applications',
    color: 'border-primary',
    iconColor: 'text-primary',
    bgGlow: 'shadow-[0_0_30px_rgba(0,200,255,0.15)]',
  },
  {
    id: 'relay',
    icon: ArrowRight,
    title: 'Relay',
    description: 'Forwards messages',
    examples: 'Intermediate log servers',
    color: 'border-secondary',
    iconColor: 'text-secondary',
    bgGlow: 'shadow-[0_0_30px_rgba(255,150,50,0.15)]',
  },
  {
    id: 'collector',
    icon: Database,
    title: 'Collector',
    description: 'Receives and stores logs',
    examples: 'rsyslogd, syslog-ng',
    color: 'border-accent',
    iconColor: 'text-accent',
    bgGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
  },
  {
    id: 'analyzer',
    icon: BarChart3,
    title: 'Analyzer',
    description: 'Parses logs and alerts',
    examples: 'SIEM tools, Splunk, ELK',
    color: 'border-green-400',
    iconColor: 'text-green-400',
    bgGlow: 'shadow-[0_0_30px_rgba(74,222,128,0.15)]',
  },
];

export const SlideArchitecture = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        Syslog <span className="text-accent">Architecture</span>
      </h2>
      <p className="text-muted-foreground mb-8">The 4 Key Components</p>

      <div className="flex-1 flex flex-col justify-center">
        {/* Main Flow Diagram */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {components.map((comp, index) => (
            <div key={comp.id} className="relative flex flex-col items-center">
              {/* Component Card */}
              <div 
                className={`w-full p-5 rounded-xl bg-card border-2 ${comp.color} ${comp.bgGlow} text-center`}
              >
                <div className={`w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3`}>
                  <comp.icon className={`h-7 w-7 ${comp.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold mb-1">{comp.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{comp.description}</p>
                <p className="text-xs text-muted-foreground/70 italic">{comp.examples}</p>
              </div>
              
              {/* Arrow */}
              {index < components.length - 1 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Flow Example */}
        <div className="terminal-bg rounded-xl p-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Example Flow:</h4>
          <div className="flex items-center gap-3 text-sm flex-wrap">
            <span className="px-3 py-2 rounded-lg bg-primary/20 text-primary font-medium">
              🖥️ Web Server
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="px-3 py-2 rounded-lg bg-secondary/20 text-secondary font-medium">
              📡 Relay
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="px-3 py-2 rounded-lg bg-accent/20 text-accent font-medium">
              💾 Central Collector
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="px-3 py-2 rounded-lg bg-green-400/20 text-green-400 font-medium">
              📊 SIEM Dashboard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
