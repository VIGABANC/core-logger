import { FileText, Globe, Filter, Send } from 'lucide-react';

export const SlideWhatIsSyslog = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        What is <span className="text-primary">Syslog</span>?
      </h2>
      <p className="text-muted-foreground mb-8">Introduction</p>

      <div className="flex-1 grid md:grid-cols-2 gap-8 items-center">
        {/* Definition */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <FileText className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">A Comprehensive Logging System</h3>
            <p className="text-muted-foreground leading-relaxed">
              Syslog is a <span className="text-primary font-medium">standard protocol and system</span> used 
              to manage and route log messages from the kernel and system utilities.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <Globe className="h-8 w-8 text-secondary mb-4" />
            <h3 className="text-xl font-semibold mb-3">A Universal Language</h3>
            <p className="text-muted-foreground leading-relaxed">
              It provides a <span className="text-secondary font-medium">common format</span> that 
              allows different systems, devices, and applications to communicate their status.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Key Capabilities</h3>
          
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <Filter className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Sort & Filter</h4>
              <p className="text-sm text-muted-foreground">
                Organize messages by source (facility) and importance (severity)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <Send className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground">Route Anywhere</h4>
              <p className="text-sm text-muted-foreground">
                Send logs to files, terminals, databases, or remote machines
              </p>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="mt-6 p-4 terminal-bg rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mb-2 mx-auto">
                  <span className="text-2xl">🖥️</span>
                </div>
                <span className="text-muted-foreground">Source</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-0.5 w-full bg-primary/50 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary border-y-4 border-y-transparent" />
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-secondary/20 flex items-center justify-center mb-2 mx-auto">
                  <span className="text-2xl">📋</span>
                </div>
                <span className="text-muted-foreground">Syslog</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-0.5 w-full bg-secondary/50 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-secondary border-y-4 border-y-transparent" />
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center mb-2 mx-auto">
                  <span className="text-2xl">📁</span>
                </div>
                <span className="text-muted-foreground">Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
