export const SlideMessageAnatomy = () => {
  const messageParts = [
    { part: '<34>', label: 'PRI', color: 'text-primary', bg: 'bg-primary/20', desc: 'Priority (Facility × 8 + Severity)' },
    { part: 'Oct 28 10:15:01', label: 'Timestamp', color: 'text-yellow-400', bg: 'bg-yellow-400/20', desc: 'When the event occurred' },
    { part: 'webserver01', label: 'Hostname', color: 'text-green-400', bg: 'bg-green-400/20', desc: 'Source machine name' },
    { part: 'sshd[1234]:', label: 'Tag/App', color: 'text-accent', bg: 'bg-accent/20', desc: 'Application name & PID' },
    { part: 'Failed password for root...', label: 'Message', color: 'text-secondary', bg: 'bg-secondary/20', desc: 'The actual log content' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        Decoding a <span className="text-primary">Syslog Message</span>
      </h2>
      <p className="text-muted-foreground mb-6">RFC 3164 Format (BSD Syslog)</p>

      <div className="flex-1 flex flex-col justify-center">
        {/* Full Message Display */}
        <div className="terminal-bg rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-muted-foreground ml-2">syslog message</span>
          </div>
          
          <div className="code-highlight text-lg leading-relaxed">
            <span className="text-primary">&lt;34&gt;</span>
            <span className="text-yellow-400">Oct 28 10:15:01</span>{' '}
            <span className="text-green-400">webserver01</span>{' '}
            <span className="text-accent">sshd[1234]:</span>{' '}
            <span className="text-secondary">Failed password for root from 192.168.1.100</span>
          </div>
        </div>

        {/* Part Breakdown */}
        <div className="grid grid-cols-5 gap-3">
          {messageParts.map((item) => (
            <div 
              key={item.label}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className={`${item.bg} rounded-lg px-3 py-2 mb-3 text-center`}>
                <span className={`code-highlight text-sm font-bold ${item.color}`}>
                  {item.part}
                </span>
              </div>
              <h4 className={`font-semibold text-sm mb-1 ${item.color}`}>{item.label}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">💡 Note:</span> RFC 5424 (modern format) adds 
            structured data, millisecond timestamps, and more fields. The basic concept remains the same.
          </p>
        </div>
      </div>
    </div>
  );
};
