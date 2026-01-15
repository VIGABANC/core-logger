import { Monitor, FileText, Server, ArrowRight, Clock, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const SlideHistory = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-[#0B1220] rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative text-white">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#A8FF60]/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-[80px]" />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 z-10"
            >
                <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-md">
                    <Clock className="h-4 w-4 text-[#00E5FF]" />
                    <span className="text-sm font-semibold text-[#00E5FF] tracking-widest uppercase">Evolution Timeline</span>
                </div>

                <h2 className="text-5xl font-bold mb-3 tracking-tight">
                    The Evolution of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A8FF60]">Syslog</span>
                </h2>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                    From simple UNIX logging to a <span className="font-semibold text-white">standardized protocol</span> powering modern infrastructure
                </p>

                <div className="h-1 w-24 bg-gradient-to-r from-[#00E5FF] to-[#A8FF60] mx-auto mt-4 rounded-full shadow-[0_0_10px_#00E5FF44]" />
            </motion.div>

            {/* Timeline Section */}
            <div className="relative w-full max-w-5xl z-10">
                {/* Gradient Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#00E5FF]/20 via-[#00E5FF]/40 to-[#A8FF60]/40 -translate-y-1/2 hidden md:block rounded-full" />

                {/* Progress Dots */}
                <div className="absolute top-1/2 left-0 w-full hidden md:flex justify-between -translate-y-1/2 px-4 pointer-events-none">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + (i * 0.2) }}
                            className={`w-4 h-4 rounded-full z-20 ${i === 2 ? 'bg-[#A8FF60] shadow-[0_0_15px_#A8FF60]' : 'bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]'}`}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
                    {/* 1980s: BSD Syslog */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        <div className="relative mb-6">
                            {/* Icon Container */}
                            <div className="w-24 h-24 rounded-2xl bg-[#0B1220] border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-[#00E5FF]/50 transition-all duration-300 relative overflow-hidden backdrop-blur-xl">
                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                                <Monitor className="h-12 w-12 text-gray-400 group-hover:text-[#00E5FF] transition-colors duration-300 z-10" />

                                {/* Corner Accent */}
                                <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-white/10 to-transparent rounded-br-xl" />
                            </div>

                            {/* Arrow Connector */}
                            <div className="absolute top-1/2 -right-3 -translate-y-1/2 hidden md:block opacity-30">
                                <ArrowRight className="h-6 w-6 text-[#00E5FF]" />
                            </div>
                        </div>

                        {/* Era Badge */}
                        <div className="relative mb-4">
                            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-mono font-bold shadow-md">
                                1980s
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
                            BSD Syslog
                        </h3>

                        <div className="px-4">
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                Created by <span className="text-gray-200 font-medium">Eric Allman</span>. The foundation for heterogeneous system logging using UDP.
                            </p>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                                <Cpu className="h-3 w-3 text-[#00E5FF]" />
                                <span className="text-[10px] font-mono font-medium text-[#00E5FF] uppercase">Simple UDP Protocol</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2001: RFC 3164 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-[#0B1220] border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-[#00E5FF]/50 transition-all duration-300 relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                                <FileText className="h-12 w-12 text-gray-400 group-hover:text-[#00E5FF] transition-colors duration-300 z-10" />
                                <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-[#00E5FF]/30 to-transparent rounded-br-xl" />
                            </div>

                            <div className="absolute top-1/2 -right-3 -translate-y-1/2 hidden md:block opacity-30">
                                <ArrowRight className="h-6 w-6 text-[#A8FF60]" />
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <div className="px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-sm font-mono font-bold shadow-[0_0_15px_#00E5FF22]">
                                2001
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
                            RFC 3164
                        </h3>

                        <div className="px-4">
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                The <span className="text-gray-200 font-medium">"BSD Syslog Format"</span> standardization—widely adopted but lacking structure.
                            </p>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-500/10 border border-white/10">
                                <Zap className="h-3 w-3 text-white/40" />
                                <span className="text-[10px] font-mono font-medium text-white/50 uppercase">Industry Standardization</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2009: RFC 5424 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-[#0B1220] border border-[#A8FF60]/30 flex items-center justify-center shadow-[0_0_30px_#A8FF6022] group-hover:border-[#A8FF60]/60 transition-all duration-300 relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                                <Server className="h-12 w-12 text-gray-400 group-hover:text-[#A8FF60] transition-colors duration-300 z-10" />
                                <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-[#A8FF60]/30 to-transparent rounded-br-xl" />
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <div className="px-4 py-1.5 rounded-full bg-[#A8FF60]/10 border border-[#A8FF60]/30 text-[#A8FF60] text-sm font-mono font-bold shadow-[0_0_15px_#A8FF6022]">
                                2009
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A8FF60] transition-colors">
                            RFC 5424
                        </h3>

                        <div className="px-4">
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                Modern standard with <span className="text-[#A8FF60] font-medium">structured data</span>, reliable transport, and millisecond timestamps.
                            </p>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#A8FF60]/10 border border-[#A8FF60]/20">
                                <Server className="h-3 w-3 text-[#A8FF60]" />
                                <span className="text-[10px] font-mono font-medium text-[#A8FF60] uppercase">Structured & Reliable</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Evolution Summary */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-12 p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/10 shadow-xl max-w-4xl w-full z-10"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                            <Zap className="h-6 w-6 text-[#00E5FF]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white tracking-wide">Key Technical Evolution</h4>
                            <p className="text-sm text-gray-500">The journey to modern observability standards</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 text-[10px] font-mono font-bold rounded-md bg-white/5 text-gray-300 border border-white/10 uppercase tracking-tighter">UDP → TCP/TLS</span>
                        <span className="px-3 py-1.5 text-[10px] font-mono font-bold rounded-md bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 uppercase tracking-tighter">Legacy → Structured</span>
                        <span className="px-3 py-1.5 text-[10px] font-mono font-bold rounded-md bg-[#A8FF60]/10 text-[#A8FF60] border border-[#A8FF60]/20 uppercase tracking-tighter">Local → Networked</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};