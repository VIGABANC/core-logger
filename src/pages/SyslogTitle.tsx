import { Terminal, Shield, Cpu, Lock } from "lucide-react";

const SyslogTitle = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans text-white overflow-hidden bg-[#0B1220]">
      {/* Left Column - Content */}
      <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center relative z-10">

        {/* Header decoration */}
        <div className="w-20 h-1 bg-[#00E5FF] mb-8 shadow-[0_0_10px_#00E5FF]" />

        {/* Main Title */}
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
          Syslog <span className="text-[#a8a8a8] font-light">—</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A8FF60]">
            Centralized Logging
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex items-center gap-4 text-xl lg:text-2xl text-gray-300 mb-12 font-medium">
          <span>What it is</span>
          <span className="text-[#00E5FF]">•</span>
          <span>Why it matters</span>
          <span className="text-[#A8FF60]">•</span>
          <span>How it works</span>
        </div>

        {/* Presenter Info */}
        <div className="space-y-2 mb-12 border-l-4 border-[#A8FF60] pl-6 py-2 bg-white/5 backdrop-blur-sm rounded-r-lg max-w-lg">
          <p className="text-lg text-gray-200">
            <span className="text-[#00E5FF] font-mono text-sm uppercase tracking-wider block mb-1">Presenter</span>
            Oussama Zahid
          </p>
          <p className="text-lg text-gray-200">
            <span className="text-[#A8FF60] font-mono text-sm uppercase tracking-wider block mb-1">Class</span>
            SIEM et Analyse des Logs
          </p>
        </div>

        {/* Objective */}
        <div className="flex items-center gap-4 text-gray-400 bg-[#0B1220]/50 p-4 rounded-lg border border-white/10 max-w-xl">
          <Terminal className="w-6 h-6 text-[#00E5FF]" />
          <span className="font-mono text-sm leading-relaxed">
            "Explain syslog format, transport, and basic hands-on demo"
          </span>
        </div>

      </div>

      {/* Right Column - Visual */}
      <div className="flex-1 relative flex items-center justify-center bg-[#0B1220] p-12">
        {/* Background Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#A8FF60]/5 rounded-full blur-2xl pointer-events-none translate-x-20 translate-y-20" />

        {/* Generated Diagram */}
        <div className="relative z-10 w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF] to-[#A8FF60] rounded-xl blur opacity-20" />
          <img
            src={`${import.meta.env.BASE_URL}syslog_architecture_diagram.png`}
            alt="Syslog Architecture"
            className="relative w-full h-auto rounded-xl shadow-2xl border border-white/10"
          />

          {/* Overlay Tags - Decorative */}
          <div className="absolute -top-4 -right-4 bg-[#0B1220] border border-[#00E5FF]/30 px-3 py-1 rounded text-[#00E5FF] text-xs font-mono shadow-lg flex items-center gap-2">
            <Shield className="w-3 h-3" /> SECURITY
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#0B1220] border border-[#A8FF60]/30 px-3 py-1 rounded text-[#A8FF60] text-xs font-mono shadow-lg flex items-center gap-2">
            <Cpu className="w-3 h-3" /> PERFORMANCE
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center text-xs lg:text-sm font-mono text-gray-500 border-t border-white/5 bg-[#0B1220]/95 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-[#00E5FF]">01</span>
          <span className="w-px h-3 bg-gray-700 mx-2" />
          <span>SYSLOG ESSENTIALS</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3" />
          <span className="uppercase tracking-widest text-gray-400">Logs = truth. Collect them.</span>
        </div>
      </div>
    </div>
  );
};

export default SyslogTitle;
