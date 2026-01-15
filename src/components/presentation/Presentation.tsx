import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideTitle } from './slides/SlideTitle';
import { SlideWhatIsSyslog } from './slides/SlideWhatIsSyslog';
import { SlideCoreProblems } from './slides/SlideCoreProblems';
import { SlideArchitecture } from './slides/SlideArchitecture';
import { SlideMessageAnatomy } from './slides/SlideMessageAnatomy';
import { SlidePRI } from './slides/SlidePRI';
import { SlideConfiguration } from './slides/SlideConfiguration';
import { SlideRsyslog } from './slides/SlideRsyslog';
import { SlideTransports } from './slides/SlideTransports';
import { SlideSecurityScenario } from './slides/SlideSecurityScenario';
import { SlideBestPractices } from './slides/SlideBestPractices';
import { SlideQA } from './slides/SlideQA';

const slides = [
  SlideTitle,
  SlideWhatIsSyslog,
  SlideCoreProblems,
  SlideArchitecture,
  SlideMessageAnatomy,
  SlidePRI,
  SlideConfiguration,
  SlideRsyslog,
  SlideTransports,
  SlideSecurityScenario,
  SlideBestPractices,
  SlideQA,
];

export const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number, dir: 'next' | 'prev') => {
    if (isAnimating || index < 0 || index >= totalSlides) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, 'next');
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, 'prev');
    }
  }, [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          prevSlide();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          }
          break;
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen]);

  const CurrentSlideComponent = slides[currentSlide];
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="relative w-full h-screen bg-gradient-tech overflow-hidden select-none">
      {/* Slide Content */}
      <div 
        className={`w-full h-full flex items-center justify-center p-8 transition-all duration-300 ${
          isAnimating 
            ? direction === 'next' 
              ? 'opacity-0 translate-x-8' 
              : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
        }`}
      >
        <div className="w-full max-w-6xl h-full max-h-[800px]">
          <CurrentSlideComponent />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="h-12 w-12 rounded-full bg-muted/50 hover:bg-muted disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
          <span className="text-sm font-medium text-foreground/80">
            {currentSlide + 1}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">{totalSlides}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="h-12 w-12 rounded-full bg-muted/50 hover:bg-muted disabled:opacity-30 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Fullscreen Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 h-10 w-10 rounded-lg bg-muted/50 hover:bg-muted transition-all"
      >
        {isFullscreen ? (
          <Minimize2 className="h-5 w-5" />
        ) : (
          <Maximize2 className="h-5 w-5" />
        )}
      </Button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-muted/30">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-8 right-6 text-xs text-muted-foreground/50 hidden lg:block">
        <span>← → Navigate</span>
        <span className="mx-2">•</span>
        <span>F Fullscreen</span>
      </div>
    </div>
  );
};
