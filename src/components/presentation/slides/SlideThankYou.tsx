import { Terminal, Shield, Cpu, Lock } from "lucide-react";

export const SlideThankYou = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#0B1220] text-white">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Title */}
            <h1 className="text-7xl font-bold mb-8 tracking-tight">
                Thank <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A8FF60]">You</span>
            </h1>

            {/* Message */}
            <p className="text-2xl text-gray-300 mb-12 max-w-2xl font-light">
                Thank you for your attention! I hope this session gave you a better understanding of how centralized logging powers modern security.
            </p>

            {/* Fun Line */}
            <div className="group transition-all duration-300 transform hover:scale-105">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl shadow-2xl">
                    <p className="text-xl font-medium text-gray-100 flex items-center gap-3">
                        Any questions?
                        <span className="text-[#A8FF60]">don’t ask me — ask ChatGPT 😉</span>
                    </p>
                </div>
            </div>

            {/* Decorative Icon */}
            <div className="mt-16 opacity-20 animate-pulse">
                <Terminal className="w-12 h-12 text-[#00E5FF]" />
            </div>

            {/* Subtle Bottom Bar */}
            <div className="absolute bottom-12 flex items-center gap-4 text-xs font-mono tracking-widest text-[#00E5FF]/40 uppercase">
                <span>syslog.done</span>
                <div className="w-12 h-px bg-[#00E5FF]/20" />
                <span>ready to analyze</span>
            </div>
        </div>
    );
};
