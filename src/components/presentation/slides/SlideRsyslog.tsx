import { Zap, Shield, Database, FileJson, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Reliable TCP/TLS Transport',
    description: 'Secure, encrypted connections replace unreliable UDP',
    color: 'text-green-400',
  },
  {
    icon: Zap,
    title: 'Advanced Filtering',
    description: 'Property-based filters, regex, and complex expressions',
    color: 'text-primary',
  },
  {
    icon: Database,
    title: 'Database & Kafka Output',
    description: 'Write directly to MySQL, PostgreSQL, Elasticsearch, Kafka',
    color: 'text-accent',
  },
  {
    icon: FileJson,
    title: 'RFC 5424 Support',
    description: 'Modern structured data format with enhanced metadata',
    color: 'text-secondary',
  },
];

export const SlideRsyslog = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        Modern Evolution: <span className="text-primary">Rsyslog</span>
      </h2>
      <p className="text-muted-foreground mb-6">The High-Performance Standard</p>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* Left: What is Rsyslog */}
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-card border-2 border-primary glow-cyan">
            <h3 className="text-2xl font-bold mb-3">What is Rsyslog?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="text-primary font-medium">Rsyslog</span> is the modern, high-performance 
              syslog daemon that is the <span className="text-foreground font-medium">default on most Linux distributions</span>.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-muted-foreground">Used by: Ubuntu, RHEL, Debian, CentOS, and more</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-3">Why the Upgrade?</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground">Old:</span>
                <div>
                  <span className="text-destructive">syslogd</span>
                  <span className="text-muted-foreground"> — UDP only, basic filtering, no encryption</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground">New:</span>
                <div>
                  <span className="text-primary">rsyslogd</span>
                  <span className="text-muted-foreground"> — TCP/TLS, plugins, high throughput, databases</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-2">Key Advanced Features</h3>
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <div>
                <h4 className={`font-semibold ${feature.color}`}>{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-4 p-3 rounded-lg bg-muted/30 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary">💡</span> Alternative: <span className="text-foreground font-medium">syslog-ng</span> offers similar capabilities with different configuration syntax
        </p>
      </div>
    </div>
  );
};
