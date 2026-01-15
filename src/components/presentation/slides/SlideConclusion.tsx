import { CheckCircle, Terminal } from 'lucide-react';

export const SlideConclusion = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1220] to-[#1a2332] px-16 relative overflow-hidden">

            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)]" />

            {/* Icon */}
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-[#00E5FF]/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#A8FF60]/20 border border-[#00E5FF]/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,229,255,0.3)]">
                    <CheckCircle className="w-12 h-12 text-[#00E5FF]" />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#00E5FF] to-[#A8FF60] bg-clip-text text-transparent tracking-tight">
                Conclusion
            </h2>

            {/* Conclusion Paragraph */}
            <div className="max-w-3xl text-center mb-12">
                <p className="text-xl text-white/80 leading-relaxed font-light">
                    Syslog remains the <span className="text-[#00E5FF] font-semibold">cornerstone of modern logging infrastructure</span>,
                    enabling centralized visibility across distributed systems. From understanding the PRI calculation to
                    implementing secure transport protocols, mastering syslog is essential for{' '}
                    <span className="text-[#A8FF60] font-semibold">operational excellence</span> and{' '}
                    <span className="text-[#A8FF60] font-semibold">security monitoring</span>.
                    By applying the best practices covered today, you can build a robust, scalable logging architecture
                    that serves as the foundation for incident response, compliance, and system health monitoring.
                </p>
            </div>

            {/* Key Formula Reminder */}
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                <Terminal className="w-5 h-5 text-[#00E5FF]" />
                <code className="text-sm font-mono text-white/90">
                    PRI = <span className="text-[#A8FF60]">(Facility × 8)</span> + <span className="text-[#FFB800]">Severity</span>
                </code>
            </div>

            {/* Footer Badge */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono text-white/30 uppercase tracking-[0.3em]">
                End of Presentation
            </div>
        </div>
    );
};
