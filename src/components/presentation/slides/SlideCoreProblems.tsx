import { Eye, Wrench, Shield, Activity } from 'lucide-react';

const benefits = [
  {
    icon: Eye,
    title: 'Centralized Visibility',
    description: 'Single pane of glass to view logs from all your systems in one place',
    color: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  {
    icon: Wrench,
    title: 'Troubleshooting',
    description: 'Quickly identify and diagnose issues by tracing events across systems',
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Maintain an audit trail for security incidents and regulatory requirements',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    icon: Activity,
    title: 'Proactive Monitoring',
    description: 'Detect anomalies and potential issues before they become critical',
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
  },
];

export const SlideCoreProblems = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        The Core <span className="text-secondary">Problem</span> & Importance
      </h2>
      <p className="text-muted-foreground mb-8">Why Syslog Matters</p>

      {/* Problem Statement */}
      <div className="p-6 rounded-xl bg-card border border-border mb-8">
        <h3 className="text-xl font-semibold mb-3">
          The Challenge: <span className="text-primary">Heterogeneity</span>
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Modern IT environments consist of dozens or hundreds of different systems—each generating 
          its own logs in different formats. Without a standard, it's chaos.
        </p>
        <div className="flex items-center gap-3 mt-4 text-sm">
          <span className="px-3 py-1 rounded-full bg-muted text-foreground/80">Linux Servers</span>
          <span className="px-3 py-1 rounded-full bg-muted text-foreground/80">Routers</span>
          <span className="px-3 py-1 rounded-full bg-muted text-foreground/80">Firewalls</span>
          <span className="px-3 py-1 rounded-full bg-muted text-foreground/80">Applications</span>
          <span className="text-muted-foreground">→ All speaking different languages!</span>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className={`w-12 h-12 rounded-lg ${benefit.bgColor} flex items-center justify-center mb-4`}>
              <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
            </div>
            <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
