import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Pause, Play, RotateCcw, Monitor, FileText, Layout,
  AlertTriangle, Shield, CheckCircle, HelpCircle, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Slide Imports
import { SlideTitle } from './slides/SlideTitle'; // 1
import { SlideWhatIsSyslog } from './slides/SlideWhatIsSyslog'; // 2
import { SlideCoreProblems } from './slides/SlideCoreProblems'; // 3
import { SlideHistory } from './slides/SlideHistory'; // 4
import { SlideArchitecture } from './slides/SlideArchitecture'; // 5
import { SlideAnimatedInfographic } from './slides/SlideAnimatedInfographic'; // 6
import { SlideMessageAnatomy } from './slides/SlideMessageAnatomy'; // 7
import { SlidePRI } from './slides/SlidePRI'; // 8
import { SlideConfiguration } from './slides/SlideConfiguration'; // 9
import { SlideTransports } from './slides/SlideTransports'; // 10
import { SlideRsyslog } from './slides/SlideRsyslog'; // 11
import { SlideSecurityScenario } from './slides/SlideSecurityScenario'; // 12
import { SlideBestPractices } from './slides/SlideBestPractices'; // 13
import { SlideConclusion } from './slides/SlideConclusion'; // 14
import { SlideThankYou } from './slides/SlideThankYou'; // 15

const slides = [
  SlideTitle,
  SlideWhatIsSyslog,
  SlideCoreProblems,
  SlideHistory,
  SlideArchitecture,
  SlideAnimatedInfographic,
  SlideMessageAnatomy,
  SlidePRI,
  SlideConfiguration,
  SlideTransports,
  SlideRsyslog,
  SlideSecurityScenario,
  SlideBestPractices,
  SlideConclusion,
  SlideThankYou
];

const getSlidePart = (index: number) => {
  if (index < 4) return { id: 1, label: "Part 1: Foundation", color: "#00E5FF" };
  if (index < 11) return { id: 2, label: "Part 2: Technical", color: "#A8FF60" };
  return { id: 3, label: "Part 3: Application", color: "#FFB000" };
};

const getSlideDuration = (index: number) => {
  if (index < 4) return 90;
  if (index === 5) return 25; // Slide 6: Wait for animation
  if (index < 11) return 150;
  if (index === 11) return 123; // Slide 12: 120s + 3s dramatic pause
  if (index === 14) return 0; // Slide 15: No auto-advance
  return 120;
};

export const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [overlay, setOverlay] = useState<'none' | 'black' | 'white'>('none');
  const [timeLeft, setTimeLeft] = useState(getSlideDuration(0));

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- TRANSITION LOGIC ---
  const getVariants = (index: number) => {
    // Group 1: 1-4
    if (index === 0) return fadeVariants; // 1->2 is fade
    if (index === 1) return slideUpVariants; // 2->3 is slide up
    if (index === 2) return cubeVariants; // 3->4 is cube

    // Group 2: 5-11
    if (index === 3) return morphVariants; // 4->5
    if (index === 4) return zoomBlurVariants; // 5->6
    if (index === 5) return typewriterVariants; // 6->7
    if (index === 6) return pulseVariants; // 7->8
    if (index === 7) return revealRightVariants; // 8->9
    if (index === 8) return pushUpVariants; // 9->10
    if (index === 9) return glitchVariants; // 10->11

    // Group 3: 12-15
    if (index === 10) return flashZoomVariants; // 11->12
    if (index === 11) return checklistVariants; // 12->13
    if (index === 12) return fadeWhiteVariants; // 13->14
    if (index === 13) return fadeVariants; // 14->15

    return fadeVariants;
  };

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
      setTimeLeft(getSlideDuration(currentSlide + 1));
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
      setTimeLeft(getSlideDuration(currentSlide - 1));
    }
  }, [currentSlide]);

  // --- AUTO-ADVANCE TIMER ---
  useEffect(() => {
    if (!isPaused && timeLeft > 0 && currentSlide < slides.length - 1) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && !isPaused && currentSlide < slides.length - 1) {
      nextSlide();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isPaused, currentSlide, nextSlide]);

  // --- KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowright':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'arrowleft':
          e.preventDefault();
          prevSlide();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'b':
          setOverlay(prev => prev === 'black' ? 'none' : 'black');
          break;
        case 'w':
          setOverlay(prev => prev === 'white' ? 'none' : 'white');
          break;
        case 'p':
          setIsPaused(prev => !prev);
          break;
        case 'r':
          if (currentSlide === 5) {
            setTimeLeft(25);
            setIsPaused(false);
            // Trigger re-mount
            setCurrentSlide(-1);
            setTimeout(() => setCurrentSlide(5), 10);
          }
          break;
        case 'escape':
          setOverlay('none');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const CurrentSlideComponent = slides[currentSlide] || slides[0];
  const part = getSlidePart(currentSlide);
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="relative w-full h-screen bg-[#0B1220] overflow-hidden select-none font-sans text-white">

      {/* --- CUE / BADGE (Corner) --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={part.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-8 left-8 z-50 flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: part.color }} />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: part.color }}>
            {part.label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* --- OVERLAYS --- */}
      <AnimatePresence>
        {overlay !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] ${overlay === 'black' ? 'bg-black' : 'bg-white'}`}
          />
        )}
      </AnimatePresence>

      {/* --- MAIN SLIDE STAGE --- */}
      <div className="w-full h-full flex items-center justify-center p-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={getVariants(currentPhaseIdx(currentSlide, direction))}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: getTransitionDuration(currentSlide), ease: "easeInOut" }}
            className="w-full max-w-7xl h-full flex items-center justify-center relative shadow-2xl rounded-3xl overflow-hidden border border-white/5"
          >
            {currentSlide !== -1 && <CurrentSlideComponent />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- HUD / NAVIGATION --- */}
      <div className="absolute bottom-10 left-0 right-0 px-12 flex items-center justify-between z-50">

        {/* Progress & Time */}
        <div className="flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 p-2 pl-4 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Next Advance</span>
            <span className={`text-xs font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-[#00E5FF]'}`}>
              {isPaused ? "PAUSED" : `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
            </span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 hover:bg-white/5 rounded-xl disabled:opacity-20"><ChevronLeft className="w-5 h-5" /></button>
            <div className="text-sm font-black flex items-center gap-1.5 min-w-[60px] justify-center">
              <span>{currentSlide + 1}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/40">{slides.length}</span>
            </div>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-2 hover:bg-white/5 rounded-xl disabled:opacity-20"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl">
          <button onClick={() => setIsPaused(!isPaused)} className="p-2 hover:bg-white/5 rounded-xl text-white/60">
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          </button>
          <button onClick={toggleFullscreen} className="p-2 hover:bg-white/5 rounded-xl text-white/60">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* --- PROGRESS BAR --- */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#A8FF60] shadow-[0_0_10px_#00E5FF]"
          style={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>

    </div>
  );
};

// --- TRANSITION VARIANTS ---

const currentPhaseIdx = (slide: number, dir: number) => slide - (dir === 1 ? 1 : 0);

const getTransitionDuration = (slide: number) => {
  if (slide <= 4) return 1.2;
  if (slide <= 11) return 1.0;
  return 1.5;
}

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideUpVariants = {
  enter: { y: "100%", opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 }
};

const cubeVariants = {
  enter: { rotateY: 90, opacity: 0, x: "50%" },
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit: { rotateY: -90, opacity: 0, x: "-50%" }
};

const morphVariants = {
  enter: { scale: 0.5, opacity: 0, filter: "blur(10px)" },
  center: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 1.5, opacity: 0, filter: "blur(20px)" }
};

const zoomBlurVariants = {
  enter: { scale: 2, opacity: 0, filter: "blur(20px)" },
  center: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 0.5, opacity: 0, filter: "blur(10px)" }
};

const typewriterVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 }
};

const pulseVariants = {
  enter: { scale: 0.9, opacity: 0 },
  center: { scale: [0.9, 1.05, 1], opacity: 1 },
  exit: { scale: 1.1, opacity: 0 }
};

const revealRightVariants = {
  enter: { x: "100%" },
  center: { x: 0 },
  exit: { x: "-100%" }
};

const pushUpVariants = {
  enter: { y: "100%" },
  center: { y: 0 },
  exit: { y: "-100%" }
};

const glitchVariants = {
  enter: { x: 20, opacity: 0, skew: 10 },
  center: { x: 0, opacity: 1, skew: 0 },
  exit: { x: -20, opacity: 0, skew: -10 }
};

const flashZoomVariants = {
  enter: { scale: 0, opacity: 0, backgroundColor: "#fff" },
  center: { scale: 1, opacity: 1, backgroundColor: "transparent" },
  exit: { scale: 2, opacity: 0 }
};

const checklistVariants = {
  enter: { opacity: 0, y: 50 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

const fadeWhiteVariants = {
  enter: { opacity: 0, backgroundColor: "#fff" },
  center: { opacity: 1, backgroundColor: "transparent" },
  exit: { opacity: 0, backgroundColor: "#fff" }
};
