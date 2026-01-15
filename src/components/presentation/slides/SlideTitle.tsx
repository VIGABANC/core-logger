import { Terminal, Shield, Cpu, Lock } from "lucide-react";

export const SlideTitle = () => {
  return (
    <div className="h-full flex flex-col lg:flex-row font-sans text-white overflow-hidden bg-[#0B1220]">
      {/* Left Column - Content */}
      <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center relative z-10 lg:max-w-[45%]">
        {/* Header decoration */}
        <div className="w-16 h-1 bg-[#00E5FF] mb-8 shadow-[0_0_10px_#00E5FF]" />

        {/* Main Title */}
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          Syslog <span className="text-[#a8a8a8] font-light">—</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A8FF60]">
            Centralized Logging
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg lg:text-xl text-gray-300 mb-10 font-medium">
          <span>What it is</span>
          <span className="text-[#00E5FF]">•</span>
          <span>Why it matters</span>
          <span className="text-[#A8FF60]">•</span>
          <span>How it works</span>
        </div>

        {/* Presenter Info */}
        <div className="space-y-3 mb-10 border-l-4 border-[#A8FF60] pl-6 py-2 bg-white/5 backdrop-blur-sm rounded-r-lg">
          <div>
            <span className="text-[#00E5FF] font-mono text-[10px] uppercase tracking-[0.2em] block mb-1 opacity-70">Presenter</span>
            <p className="text-lg text-gray-100 font-semibold">Oussama Zahid</p>
          </div>
          <div>
            <span className="text-[#A8FF60] font-mono text-[10px] uppercase tracking-[0.2em] block mb-1 opacity-70">Class / Course</span>
            <p className="text-lg text-gray-100">SIEM et Analyse des Logs</p>
          </div>
        </div>

        {/* Objective */}
        <div className="flex items-start gap-4 text-gray-400 bg-[#0B1220]/80 p-5 rounded-xl border border-white/10 mt-auto">
          <Terminal className="w-5 h-5 text-[#00E5FF] mt-1 shrink-0" />
          <span className="font-mono text-sm leading-relaxed italic">
            "Explain syslog format, transport, and basic hands-on demo"
          </span>
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="flex-1 relative flex items-center justify-center p-8 lg:p-12 overflow-hidden bg-white/[0.02]">
        {/* Glow Backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Horizontal Infographic Container */}
        <div className="relative z-10 w-full transform hover:scale-[1.01] transition-all duration-700">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#00E5FF]/20 to-[#A8FF60]/20 rounded-[2rem] blur-2xl opacity-30" />
          <div className="relative bg-[#0B1220] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <img
              src="/syslog_infographic_v2.png"
              alt="Syslog Centralized Logging Infographic"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Technical Data Overlays (Decorative) */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-[#0B1220]/90 border border-[#00E5FF]/40 px-3 py-1 rounded-full text-[10px] font-mono text-[#00E5FF] backdrop-blur flex items-center gap-2">
              <Shield className="w-3 h-3" /> UDP/514
            </div>
          </div>
          <div className="absolute bottom-4 right-4 animate-pulse">
            <div className="bg-[#0B1220]/90 border border-[#A8FF60]/40 px-3 py-1 rounded-full text-[10px] font-mono text-[#A8FF60] backdrop-blur flex items-center gap-2">
              <Lock className="w-3 h-3" /> RFC 5424
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-5 flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-white/5 bg-[#0B1220]/95 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <span className="text-[#00E5FF] font-bold">INTRO</span>
          <div className="w-[1px] h-3 bg-white/10" />
          <span className="tracking-widest opacity-60">SYSLOG: THE TRUTH IN LOGS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#A8FF60] animate-pulse" />
            <span className="uppercase tracking-widest">Logs = truth. Collect them.</span>
          </div>
          <div className="text-gray-600">SLIDE // 01</div>
        </div>
      </div>
    </div>
  );
};
