import { MessageCircle, Server, ArrowRight, Database, BarChart3 } from 'lucide-react';

export const SlideQA = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      {/* Big Question Mark */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto glow-cyan">
          <MessageCircle className="h-12 w-12 text-primary" />
        </div>
      </div>

      <h2 className="text-5xl font-bold mb-4 text-gradient">
        Questions?
      </h2>
      <p className="text-xl text-muted-foreground mb-12">
        Let's discuss what you've learned
      </p>

      {/* Mini Architecture Recap */}
      <div className="w-full max-w-2xl terminal-bg rounded-xl p-6 mb-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Syslog Flow Recap</h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Originator</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
              <ArrowRight className="h-6 w-6 text-secondary" />
            </div>
            <span className="text-xs text-muted-foreground">Relay</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-2">
              <Database className="h-6 w-6 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground">Collector</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-lg bg-green-400/20 flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-xs text-muted-foreground">Analyzer</span>
          </div>
        </div>
      </div>

      {/* Key Topics */}
      <div className="flex flex-wrap justify-center gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium">PRI = 8×Facility + Severity</span>
        <span className="px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium">Rsyslog</span>
        <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">RFC 3164 & 5424</span>
        <span className="px-4 py-2 rounded-full bg-green-400/20 text-green-400 text-sm font-medium">TCP/TLS</span>
      </div>

      {/* Thank You */}
      <div className="mt-12 text-muted-foreground">
        <p className="text-lg">Thank you for your attention!</p>
      </div>
    </div>
  );
};
