import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
    Router, Server, Database, Cloud,
    Activity, Mail, Play, Pause, RotateCcw, SkipForward, SkipBack,
    Plane, Lock, Box, AlertCircle
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Phase {
    start: number;
    end: number;
    label: string;
}

interface PacketConfig {
    birth: number;
    death: number;
    speedMult: number;
    protocol: 'UDP' | 'TCP' | 'TLS';
}

interface ControlsProps {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    reset: () => void;
}

interface DeviceNodeProps {
    label: string;
    Icon: React.ElementType;
    color: string;
    active: boolean;
    config: string;
    facility: string;
    time: number;
}

interface TransportIconProps {
    icon: React.ElementType;
    label: string;
    color: string;
    active: boolean;
    delay: number;
}

interface LogPacketProps {
    id: number;
    time: number;
    config: PacketConfig;
    color: string;
    label: string;
    yOffset: number;
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const TOTAL_TIME = 15;
const PHASES: Phase[] = [
    { start: 0, end: 2.5, label: "Event Gen" },
    { start: 2.5, end: 5, label: "Local Proc" },
    { start: 5, end: 7.5, label: "Transport" },
    { start: 7.5, end: 10, label: "Network" },
    { start: 10, end: 12.5, label: "Collection" },
    { start: 12.5, end: 15, label: "Action" }
];

const PACKET_CONFIGS: PacketConfig[] = [
    { birth: 0.5, death: 11.0, speedMult: 1.8, protocol: 'UDP' },
    { birth: 1.0, death: 11.5, speedMult: 1.0, protocol: 'TCP' },
    { birth: 1.5, death: 12.0, speedMult: 0.7, protocol: 'TLS' }
];

const DEVICES = [
    { label: "Router", Icon: Router, color: "#FF4B4B", config: "kern.emerg   /var/log/kern", role: "Kernel Panic", facility: "kern(0)" },
    { label: "Server", Icon: Server, color: "#00E5FF", config: "auth.err     @central", role: "Failed SSH", facility: "auth(4)" },
    { label: "App Node", Icon: Database, color: "#A8FF60", config: "daemon.warn  @@central", role: "High CPU", facility: "daemon(3)" }
];

const TRANSPORT_ICONS = [
    { icon: Plane, label: "UDP/514", color: "#FF4B4B" },
    { icon: Box, label: "TCP/514", color: "#00E5FF" },
    { icon: Lock, label: "TLS/6514", color: "#A8FF60" }
];

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const calculatePacketPosition = (time: number, config: PacketConfig): { x: number; scale: number; opacity: number } => {
    let x = 0;
    let scale = 1;
    let opacity = 1;

    if (time < 2.5) {
        // Generation phase
        const progress = (time - config.birth) / (2.5 - config.birth);
        x = easeOutCubic(progress) * 60;
        opacity = Math.min(progress * 3, 1);
    } else if (time < 5) {
        // Local processing (breathing effect)
        x = 60 + Math.sin(time * 8) * 4;
        scale = 1.1 + Math.sin(time * 6) * 0.1;
    } else if (time < 7.5) {
        // Transport phase (speed differentiation)
        const progress = (time - 5) / 2.5;
        x = 60 + easeInOutQuad(progress) * 400 * config.speedMult;
    } else if (time < 10) {
        // Network cloud (jitter + drift)
        const baseX = 60 + 400 * config.speedMult;
        const driftProgress = (time - 7.5) / 2.5;
        x = baseX + easeOutCubic(driftProgress) * 60 + Math.sin(time * 15) * 3;
        scale = 1.3 + Math.sin(time * 5) * 0.1;
    } else if (time < 12.0) {
        // Collection (final sprint)
        const baseX = 60 + 400 * config.speedMult + 60;
        const progress = (time - 10) / 2.0;
        x = baseX + easeInOutQuad(progress) * 300;
        scale = 1 + (1 - progress) * 0.2;
    }

    return { x, scale, opacity };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SlideAnimatedInfographic = () => {
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const currentPhase = useMemo(
        () => PHASES.find(p => time >= p.start && time < p.end) || PHASES[5],
        [time]
    );

    // Main animation loop
    useEffect(() => {
        if (!isPlaying || time >= TOTAL_TIME) return;

        const interval = setInterval(() => {
            setTime(prev => Math.min(prev + 0.1, TOTAL_TIME));
        }, 100);

        return () => clearInterval(interval);
    }, [isPlaying, time]);

    const reset = () => {
        setTime(0);
        setIsPlaying(true);
    };

    return (
        <div className="h-full w-full bg-[#0B1220] text-white flex flex-col relative overflow-hidden font-sans select-none">

            {/* Header HUD */}
            <Header currentPhase={currentPhase} phases={PHASES} />
            <Controls time={time} setTime={setTime} isPlaying={isPlaying} setIsPlaying={setIsPlaying} reset={reset} />
            <Timeline time={time} totalTime={TOTAL_TIME} />

            {/* Main Stage */}
            <div className="flex-1 relative flex items-center justify-between px-16 pt-32">
                <BackgroundGrid />

                {/* Left: Originators */}
                <div className="flex flex-col gap-24 z-20 w-1/4">
                    {DEVICES.map((device, i) => (
                        <DeviceNode key={i} {...device} active={time >= i * 0.3} time={time} />
                    ))}
                </div>

                {/* Middle: Pipeline */}
                <Pipeline time={time} />

                {/* Right: Collector & SIEM */}
                <Collector time={time} />

                {/* Animated Packets */}
                <AnimatePresence>
                    {PACKET_CONFIGS.map((config, i) => (
                        <LogPacket
                            key={i}
                            id={i}
                            time={time}
                            config={config}
                            color={DEVICES[i].color}
                            label={['<0>', '<27>', '<36>'][i]}
                            yOffset={[100, 260, 420][i]}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Footer HUD */}
            <Footer time={time} />
        </div>
    );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const Header = ({ currentPhase, phases }: { currentPhase: Phase; phases: Phase[] }) => (
    <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-50">
        <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-widest flex items-center gap-2">
                <span className="text-[#00E5FF]">SYSLOG</span> JOURNEY
                <span className="text-[10px] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/20 text-[#00E5FF] font-mono">
                    MASTER_V3
                </span>
            </h2>
            <div className="text-[#A8FF60] font-mono text-[10px] mt-1 uppercase tracking-widest flex items-center gap-2">
                <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#A8FF60]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                PHASE {phases.indexOf(currentPhase) + 1}: {currentPhase.label}
            </div>
        </div>
    </div>
);

const Controls: React.FC<ControlsProps> = ({ time, setTime, isPlaying, setIsPlaying, reset }) => (
    <div className="absolute top-8 right-8 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl">
        <motion.button
            onClick={() => setTime((prev: number) => Math.max(0, prev - 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-white"
        >
            <SkipBack className="w-4 h-4" />
        </motion.button>

        <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#00E5FF] to-[#00B4D8] text-[#0B1220] rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </motion.button>

        <motion.button
            onClick={() => setTime((prev: number) => Math.min(TOTAL_TIME, prev + 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-white"
        >
            <SkipForward className="w-4 h-4" />
        </motion.button>

        <div className="w-px h-6 bg-white/10" />

        <motion.button
            onClick={reset}
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-white"
        >
            <RotateCcw className="w-4 h-4" />
        </motion.button>
    </div>
);

const Timeline = ({ time, totalTime }: { time: number; totalTime: number }) => (
    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/5 rounded-full z-40 overflow-hidden">
        <motion.div
            className="h-full bg-gradient-to-r from-[#00E5FF] via-[#A8FF60] to-[#00E5FF]"
            initial={{ width: '0%' }}
            animate={{ width: `${(time / totalTime) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
    </div>
);

const BackgroundGrid = () => (
    <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03)_0%,transparent_70%)]" />
        <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}
        />
    </>
);

const DeviceNode: React.FC<DeviceNodeProps> = ({ label, Icon, color, active, config, facility, time }) => (
    <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="relative flex items-center gap-4 h-24"
    >
        <motion.div
            className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-xl backdrop-blur-md relative overflow-hidden"
            whileHover={{ scale: 1.05, borderColor: color }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <Icon className="w-8 h-8 z-10" style={{ color }} />
        </motion.div>

        <div className="flex flex-col">
            <span className="text-white text-xs font-black tracking-tight uppercase">{label}</span>
            <span className="text-[9px] font-mono font-bold" style={{ color: '#A8FF60' }}>{facility}</span>

            <AnimatePresence>
                {active && time >= 2.5 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 text-[8px] font-mono text-white/30 truncate w-32 border-l-2 border-[#A8FF60]/20 pl-2"
                    >
                        {config}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.div>
);

const Pipeline = ({ time }: { time: number }) => (
    <div className="flex-1 h-full relative mx-12 flex items-center justify-center">
        {/* Glow Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.path
                d="M 0 100 L 350 160"
                stroke="#FF4B4B"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 5"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
                d="M 0 260 L 350 260"
                stroke="#00E5FF"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5 5"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
                d="M 0 420 L 350 360"
                stroke="#A8FF60"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 5"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
        </svg>

        {/* Transport Icons */}
        <div className="absolute left-0 h-full flex flex-col justify-between py-24">
            {TRANSPORT_ICONS.map((transport, i) => (
                <TransportIcon key={i} {...transport} active={time >= 5} delay={i * 0.1} />
            ))}
        </div>

        {/* Cloud */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={time >= 7.5 ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10"
        >
            <div className="w-56 h-56 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center backdrop-blur-3xl shadow-[inset_0_0_60px_rgba(255,255,255,0.02)]">
                <Cloud className="w-20 h-20 text-white/5" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-dashed border-[#00E5FF]/20 rounded-full scale-110"
                />
            </div>
        </motion.div>
    </div>
);

const TransportIcon: React.FC<TransportIconProps> = ({ icon: Icon, label, color, active, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0, rotateY: 90 }}
        animate={active ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay }}
        className="flex flex-col items-center py-2 group"
    >
        <motion.div
            className="p-2 rounded-xl bg-white/5 border border-white/10 mb-1"
            whileHover={{ scale: 1.1, borderColor: color }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Icon className="w-4 h-4" style={{ color }} />
        </motion.div>
        <span className="text-[8px] font-mono text-white/30 tracking-tighter group-hover:text-white/60 transition-colors">
            {label}
        </span>
    </motion.div>
);

const LogPacket: React.FC<LogPacketProps> = ({ id, time, config, color, label, yOffset }) => {
    if (time < config.birth || time > config.death) return null;

    const { x, scale, opacity } = calculatePacketPosition(time, config);

    return (
        <motion.div
            style={{ position: 'absolute', left: 160 + x, top: yOffset, zIndex: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[10px] font-black border-2 shadow-[0_0_20px_rgba(0,0,0,0.4)] backdrop-blur-xl relative group"
                style={{
                    borderColor: color,
                    color: color,
                    backgroundColor: `${color}15`,
                    transform: `scale(${scale})`
                }}
                animate={{
                    boxShadow: [
                        `0 0 20px ${color}40`,
                        `0 0 30px ${color}60`,
                        `0 0 20px ${color}40`
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                {label}

                {/* Protocol Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 border border-white/10 whitespace-nowrap"
                    style={{ color }}
                >
                    {config.protocol}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const Collector = ({ time }: { time: number }) => (
    <div className="w-1/4 flex flex-col items-center gap-12 z-20 pt-12">
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={time >= 10 ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative group"
        >
            <motion.div
                className="absolute -inset-4 bg-[#A8FF60]/10 rounded-full blur-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative p-7 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-2xl">
                <Server className="w-16 h-16 text-[#A8FF60]" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#A8FF60] text-[#0B1220] px-3 py-0.5 rounded font-mono font-bold text-[9px] whitespace-nowrap">
                    COLLECT_PARSE
                </div>
            </div>

            <AnimatePresence>
                {time >= 11 && time < 13 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="absolute -top-40 left-1/2 -translate-x-1/2 w-64 bg-black/95 border border-[#00E5FF]/40 p-4 rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.3)] backdrop-blur-xl"
                    >
                        <div className="font-mono text-[10px] space-y-2">
                            <div className="text-[#00E5FF] font-black border-b border-[#00E5FF]/20 pb-2 mb-2 uppercase tracking-wider">
                                PRI Decoder
                            </div>
                            <div className="text-white/80">&lt;34&gt; = (Facility × 8) + Severity</div>
                            <div className="text-[#A8FF60] pl-4">└ (4 × 8) = 32 <span className="text-white/40">// auth</span></div>
                            <div className="text-[#F59E0B] pl-4">└ + 2 <span className="text-white/40">// error</span></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        <SiemDashboard active={time >= 12.5} time={time} />
    </div>
);

const SiemDashboard = ({ active, time }: { active: boolean; time: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-[280px] bg-black/70 border border-white/10 rounded-3xl p-5 backdrop-blur-3xl shadow-2xl"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF4B4B]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-white/80">SIEM Analytics</span>
            </div>
            {time >= 14 && (
                <motion.div
                    className="w-2 h-2 rounded-full bg-[#A8FF60]"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}
        </div>

        <div className="space-y-3">
            <AnimatePresence>
                {time >= 13 && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 flex items-center gap-3 group hover:bg-red-500/20 transition-colors"
                    >
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono font-bold text-red-400">SEV_0: Kernel Panic</span>
                            <span className="text-[8px] font-mono text-red-400/60">r-edge-01.local</span>
                        </div>
                    </motion.div>
                )}

                {time >= 14 && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="p-3 bg-[#00E5FF]/10 rounded-xl border border-[#00E5FF]/20 flex items-center gap-3 group hover:bg-[#00E5FF]/20 transition-colors"
                    >
                        <Mail className="w-4 h-4 text-[#00E5FF]" />
                        <span className="text-[10px] font-mono font-bold text-[#00E5FF]">Admin Notified</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.div>
);

const Footer = ({ time }: { time: number }) => (
    <div className="h-20 bg-black/70 backdrop-blur-3xl border-t border-white/10 px-12 flex items-center justify-around z-50">
        <TechStat label="STANDARD" value={time >= 10 ? "RFC-5424" : "RFC-3164"} color="#00E5FF" />
        <TechStat label="TRANSPORT" value={time < 5 ? "Local" : time < 10 ? "Network" : "Encrypted"} color="#A8FF60" />
        <TechStat label="UDP SPEED" value="↑ 80% Faster" color="#A8FF60" />
        <TechStat label="TLS OVERHEAD" value="↓ 50% Slower" color="#FF4B4B" />
    </div>
);

const TechStat = ({ label, value, color }: { label: string; value: string; color: string }) => (
    <div className="flex flex-col items-center group cursor-default">
        <span className="text-[8px] font-mono text-white/20 tracking-[0.15em] mb-1 uppercase">{label}</span>
        <motion.span
            className="text-xs font-bold tracking-tight"
            style={{ color }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {value}
        </motion.span>
    </div>
);
