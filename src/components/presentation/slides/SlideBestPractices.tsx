import { Shield, Server, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const practices = [
  {
    icon: Shield,
    title: 'Use TCP/TLS for Important Logs',
    description: 'Ensure critical logs like authentication and security events are transported reliably and securely.',
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
  },
  {
    icon: Server,
    title: 'Centralize Logs for Analysis',
    description: 'Aggregate logs from all systems to a central collector for unified monitoring and correlation.',
    color: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  {
    icon: RefreshCw,
    title: 'Implement Log Rotation',
    description: 'Configure logrotate to manage file sizes and prevent disk space exhaustion.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
  },
  {
    icon: AlertTriangle,
    title: 'Apply Appropriate Severity Levels',
    description: 'Use consistent severity levels across applications to enable effective filtering and alerting.',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
];

export const SlideBestPractices = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        <span className="text-green-400">Best Practices</span> Summary
      </h2>
      <p className="text-muted-foreground mb-8">Key Takeaways for Effective Logging</p>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {practices.map((practice, index) => (
          <div 
            key={practice.title}
            className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${practice.bgColor} flex items-center justify-center flex-shrink-0`}>
                <practice.icon className={`h-6 w-6 ${practice.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                  <h3 className={`font-semibold ${practice.color}`}>{practice.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {practice.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Checklist */}
      <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          Quick Checklist Before Production
        </h4>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-muted-foreground">TLS enabled for sensitive logs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-muted-foreground">Central log server configured</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-muted-foreground">Log rotation policies in place</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-muted-foreground">Alerting rules for critical events</span>
          </div>
        </div>
      </div>
    </div>
  );
};
