import { Settings, FileCode } from 'lucide-react';

export const SlideConfiguration = () => {
  const examples = [
    {
      rule: '*.info;mail.none     /var/log/messages',
      explanation: 'All info+ messages except mail → write to /var/log/messages',
    },
    {
      rule: 'auth.*     @central-log-host',
      explanation: 'All auth messages → forward via UDP to central-log-host',
    },
    {
      rule: 'kern.crit     /dev/console',
      explanation: 'Critical kernel errors → display on console',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        <span className="text-secondary">Configuration</span> — How Rules Work
      </h2>
      <p className="text-muted-foreground mb-6">Defining where logs go</p>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* Left: Config file explanation */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Configuration File</h3>
            </div>
            <div className="terminal-bg rounded-lg p-3 code-highlight text-primary mb-3">
              /etc/rsyslog.conf
            </div>
            <p className="text-sm text-muted-foreground">
              The main configuration file where you define rules for routing log messages.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-secondary" />
              <h3 className="text-lg font-semibold">Rule Syntax</h3>
            </div>
            <div className="terminal-bg rounded-lg p-4 mb-4">
              <div className="code-highlight text-lg">
                <span className="text-accent">facility</span>
                <span className="text-muted-foreground">.</span>
                <span className="text-secondary">severity</span>
                <span className="text-muted-foreground px-4">⇥</span>
                <span className="text-green-400">action</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-accent">●</span>
                <span><span className="text-accent font-medium">facility</span> — source of the message (kern, auth, mail...)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">●</span>
                <span><span className="text-secondary font-medium">severity</span> — minimum level to match (info, err, crit...)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span><span className="text-green-400 font-medium">action</span> — destination (file, @host, console)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Examples */}
        <div className="p-5 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold mb-4">Practical Examples</h3>
          <div className="space-y-4">
            {examples.map((ex, index) => (
              <div key={index} className="space-y-2">
                <div className="terminal-bg rounded-lg p-3">
                  <code className="code-highlight text-sm text-foreground">
                    {ex.rule}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground pl-2">
                  ↳ {ex.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
            <h4 className="text-sm font-semibold text-primary mb-2">🔑 Key Symbols</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><code className="text-primary">*</code> = all facilities/severities</div>
              <div><code className="text-primary">.none</code> = exclude this</div>
              <div><code className="text-primary">@host</code> = UDP to host</div>
              <div><code className="text-primary">@@host</code> = TCP to host</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
