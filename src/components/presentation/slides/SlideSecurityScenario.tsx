import { User, Server, Database, Bell, ArrowRight, XCircle } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Attack Attempt',
    description: 'Hacker tries to login via SSH with wrong password',
    color: 'text-destructive',
    bgColor: 'bg-destructive/20',
  },
  {
    icon: Server,
    title: 'Event Generated',
    description: 'sshd creates syslog message (Facility: authpriv, Severity: err)',
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
  },
  {
    icon: Database,
    title: 'Collected',
    description: 'Rsyslog receives and processes the message',
    color: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  {
    icon: ArrowRight,
    title: 'Rule Matches',
    description: 'authpriv.* rule forwards to security analyzer',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    icon: Bell,
    title: 'Alert Triggered',
    description: 'Admin receives notification about failed login',
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
  },
];

export const SlideSecurityScenario = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        Real-World Example: <span className="text-destructive">Security Alert</span>
      </h2>
      <p className="text-muted-foreground mb-6">From attack to alert in 5 steps</p>

      <div className="flex-1">
        {/* The Attack Message */}
        <div className="terminal-bg rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <span className="text-sm text-muted-foreground">Failed SSH Login Attempt</span>
          </div>
          <code className="code-highlight text-sm block">
            <span className="text-primary">&lt;83&gt;</span>
            <span className="text-yellow-400">Jan 15 14:32:01</span>{' '}
            <span className="text-green-400">webserver01</span>{' '}
            <span className="text-accent">sshd[4521]:</span>{' '}
            <span className="text-destructive">Failed password for root from 203.0.113.50 port 22 ssh2</span>
          </code>
        </div>

        {/* Flow Steps */}
        <div className="grid grid-cols-5 gap-2">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className={`p-4 rounded-xl bg-card border border-border h-full flex flex-col`}>
                <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center mb-3 mx-auto`}>
                  <step.icon className={`h-5 w-5 ${step.color}`} />
                </div>
                <div className="text-center flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Step {index + 1}</div>
                  <h4 className={`font-semibold text-sm mb-1 ${step.color}`}>{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Config Example */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="text-sm font-semibold text-accent mb-2">📝 The Rule (rsyslog.conf)</h4>
            <div className="terminal-bg rounded-lg p-3">
              <code className="code-highlight text-sm">
                authpriv.*    @@security-siem:514
              </code>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="text-sm font-semibold text-green-400 mb-2">✅ The Result</h4>
            <p className="text-sm text-muted-foreground">
              Security team gets real-time alerts for all authentication events, enabling rapid incident response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
