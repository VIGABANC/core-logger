export const SlidePRI = () => {
  const facilities = [
    { code: 0, name: 'kern', desc: 'Kernel messages' },
    { code: 1, name: 'user', desc: 'User-level messages' },
    { code: 4, name: 'auth', desc: 'Security/auth messages' },
    { code: 10, name: 'authpriv', desc: 'Private auth messages' },
    { code: 16, name: 'local0', desc: 'Local use 0' },
  ];

  const severities = [
    { code: 0, name: 'Emergency', desc: 'System is unusable. Highest alert.', hex: '#DC2626' },
    { code: 1, name: 'Alert', desc: 'Immediate action required.', hex: '#EF4444' },
    { code: 2, name: 'Critical', desc: 'Critical conditions.', hex: '#F97316' },
    { code: 3, name: 'Error', desc: 'Error events that need attention.', hex: '#F59E0B' },
    { code: 4, name: 'Warning', desc: 'Warning conditions.', hex: '#EAB308' },
    { code: 5, name: 'Notice', desc: 'Normal but significant events.', hex: '#60A5FA' },
    { code: 6, name: 'Informational', desc: 'Informational messages.', hex: '#3B82F6' },
    { code: 7, name: 'Debug', desc: 'Debug-level messages.', hex: '#9CA3AF' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold mb-2 text-foreground">
        The <span className="text-primary">PRI</span> Number
      </h2>
      <p className="text-muted-foreground mb-6">Facility & Severity Combined</p>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* Formula */}
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-card border-2 border-primary glow-cyan">
            <h3 className="text-lg font-semibold mb-4">The Formula</h3>
            <div className="code-highlight text-2xl text-center py-4 bg-muted/50 rounded-lg">
              <span className="text-muted-foreground">PRI</span>{' '}
              <span className="text-foreground">=</span>{' '}
              <span className="text-primary">(8 × Facility)</span>{' '}
              <span className="text-foreground">+</span>{' '}
              <span className="text-secondary">Severity</span>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted/30 text-sm">
              <span className="text-muted-foreground">Example: </span>
              <span className="text-primary">auth (4)</span> × 8 + <span className="text-secondary">err (3)</span> = <span className="text-foreground font-bold">&lt;35&gt;</span>
            </div>
          </div>

          {/* Facility Table */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-3 text-accent">Common Facilities</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-2">Code</th>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((f) => (
                  <tr key={f.code} className="border-b border-border/50">
                    <td className="py-2 text-accent font-mono">{f.code}</td>
                    <td className="py-2 font-medium">{f.name}</td>
                    <td className="py-2 text-muted-foreground">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Severity Table */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <h4 className="font-semibold mb-3 text-secondary">Severity Levels (0-7)</h4>
          <div className="space-y-2">
            {severities.map((s) => (
              <div
                key={s.code}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm shadow-sm"
                  style={{ backgroundColor: s.hex }}
                >
                  {s.code}
                </div>
                <div className="flex-1">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">— {s.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Lower number = Higher importance
          </p>
        </div>
      </div>
    </div>
  );
};
