import { Terminal, Server, Network } from 'lucide-react';

export const SlideTitle = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      {/* Decorative Icons */}
      <div className="flex items-center gap-6 mb-8 opacity-60">
        <Terminal className="h-8 w-8 text-primary" />
        <Server className="h-10 w-10 text-secondary" />
        <Network className="h-8 w-8 text-accent" />
      </div>

      {/* Main Title */}
      <h1 className="text-6xl md:text-7xl font-bold mb-4 text-gradient">
        Syslog
      </h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90 mb-6">
        The System Event Logger
      </h2>

      {/* Subtitle */}
      <p className="text-xl text-muted-foreground mb-12">
        A Student's Guide to System Logging
      </p>

      {/* Terminal Decoration */}
      <div className="terminal-bg rounded-lg p-4 max-w-lg w-full mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="code-highlight text-sm text-left text-muted-foreground">
          <span className="text-primary">$</span>{' '}
          <span className="text-foreground">tail -f /var/log/syslog</span>
          <div className="mt-2 text-green-400/80">
            ► Streaming system events...
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="text-muted-foreground">
        <p className="text-lg font-medium">Your Name</p>
        <p className="text-sm">Introduction to System Administration</p>
      </div>
    </div>
  );
};
