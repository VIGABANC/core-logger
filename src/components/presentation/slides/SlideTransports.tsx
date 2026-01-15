import { Zap, Shield, Lock } from 'lucide-react';

const transports = [
  {
    protocol: 'UDP',
    port: '514',
    reliability: 'No guarantee',
    encryption: 'None',
    useCase: 'Network devices, high-volume, non-critical logs',
    icon: Zap,
    color: 'text-secondary',
    borderColor: 'border-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    protocol: 'TCP',
    port: '514',
    reliability: 'Guaranteed delivery',
    encryption: 'None',
    useCase: 'Critical servers, application logs',
    icon: Shield,
    color: 'text-primary',
    borderColor: 'border-primary',
    bgColor: 'bg-primary/10',
  },
  {
    protocol: 'TLS',
    port: '6514',
    reliability: 'Guaranteed delivery',
    encryption: 'Encrypted',
    useCase: 'Compliance, sensitive data, cross-network',
    icon: Lock,
    color: 'text-green-400',
    borderColor: 'border-green-400',
    bgColor: 'bg-green-400/10',
  },
];

export const SlideTransports = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        Transport <span className="text-green-400">Protocols</span>
      </h2>
      <p className="text-muted-foreground mb-6">UDP vs TCP vs TLS — Choosing the Right One</p>

      <div className="flex-1">
        {/* Comparison Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold">Protocol</th>
                <th className="text-left p-4 font-semibold">Port</th>
                <th className="text-left p-4 font-semibold">Reliability</th>
                <th className="text-left p-4 font-semibold">Encryption</th>
                <th className="text-left p-4 font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((t) => (
                <tr key={t.protocol} className={`${t.bgColor} border-t border-border`}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <t.icon className={`h-5 w-5 ${t.color}`} />
                      <span className={`font-bold ${t.color}`}>{t.protocol}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <code className="code-highlight text-foreground">{t.port}</code>
                  </td>
                  <td className="p-4 text-muted-foreground">{t.reliability}</td>
                  <td className="p-4">
                    <span className={t.protocol === 'TLS' ? 'text-green-400 font-medium' : 'text-muted-foreground'}>
                      {t.encryption}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{t.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visual Comparison */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {transports.map((t) => (
            <div key={t.protocol} className={`p-4 rounded-xl border-2 ${t.borderColor} ${t.bgColor}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <t.icon className={`h-8 w-8 ${t.color}`} />
              </div>
              <h4 className={`text-center font-bold text-lg ${t.color}`}>{t.protocol}</h4>
              <div className="mt-3 space-y-1 text-center text-sm">
                <div className="text-muted-foreground">
                  {t.protocol === 'UDP' && '⚡ Fastest'}
                  {t.protocol === 'TCP' && '✓ Reliable'}
                  {t.protocol === 'TLS' && '🔒 Secure'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Config hint */}
        <div className="mt-4 p-3 terminal-bg rounded-lg">
          <p className="text-sm text-muted-foreground code-highlight">
            <span className="text-primary">Tip:</span> In rsyslog.conf: 
            <span className="text-secondary ml-2">@host</span> = UDP, 
            <span className="text-primary ml-2">@@host</span> = TCP
          </p>
        </div>
      </div>
    </div>
  );
};
