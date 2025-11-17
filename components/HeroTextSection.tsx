
import React, { useEffect, useRef } from 'react';
import { useHoverStaggerAnimation } from './useHoverStaggerAnimation';

type BlobPosition = { x: number; y: number };

interface StaggerTextProps {
    text: string;
    className?: string;
}

const StaggerText: React.FC<StaggerTextProps> = ({ text, className }) => {
    return (
        <h2 className={`stagger-text ${className}`} data-text={text}>
            {text.split('').map((letter, index) => (
                <span key={index} className="stagger-letter">
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </h2>
    );
};


interface HeroTextSectionProps {
    setBlobPosition: React.Dispatch<React.SetStateAction<BlobPosition>>;
    setBlobVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroTextSection = React.forwardRef<HTMLElement, HeroTextSectionProps>(
    ({ setBlobPosition, setBlobVisible }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useHoverStaggerAnimation(buttonRef);

    useEffect(() => {
        const currentSection = sectionRef.current;
        if (!currentSection) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const allLetters = currentSection.querySelectorAll('.stagger-letter');
                    allLetters.forEach((span, index) => {
                        setTimeout(() => {
                            (span as HTMLElement).style.transform = 'translateY(0)';
                            (span as HTMLElement).style.opacity = '1';
                        }, index * 30);
                    });
                    observer.unobserve(currentSection);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(currentSection);

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    useEffect(() => {
        const container = sectionRef.current;
        if (!container) return;

        const handleMouseEnter = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            setBlobVisible(true);
            container.style.setProperty('--mask-size', '120px');
        };

        const handleMouseMove = (e: MouseEvent) => {
            setBlobPosition({ x: e.clientX, y: e.clientY });
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            container.style.setProperty('--mask-x', `${x}px`);
            container.style.setProperty('--mask-y', `${y}px`);
        };

        const handleMouseLeave = (e: MouseEvent) => {
            setBlobVisible(false);

            const duration = 700;
            let start: number | null = null;
            const startSize = 120;
            const rect = container.getBoundingClientRect();
            const endX = e.clientX - rect.left;
            const endY = e.clientY - rect.top;
            
            container.style.setProperty('--mask-x', `${endX}px`);
            container.style.setProperty('--mask-y', `${endY}px`);

            const animate = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                const currentSize = startSize * (1 - easedProgress);

                container.style.setProperty('--mask-size', `${currentSize}px`);
                
                if (progress < 1) {
                    animationFrameId.current = requestAnimationFrame(animate);
                }
            };

            animationFrameId.current = requestAnimationFrame(animate);
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [setBlobPosition, setBlobVisible]);

    const commonTextClasses = "text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter";

    return (
        <section ref={ref} id="hero-text-section" className="h-screen min-h-[600px] flex flex-col items-center justify-center text-center p-8">
            {/* Container for the text layers that will receive mouse events and be masked */}
            <div ref={sectionRef} className="relative">
                <div id="hero-text-reveal-layer" className="flex flex-col items-center justify-center text-center">
                    <StaggerText text="HYDRO-TECH" className={`${commonTextClasses} font-serif-reveal text-blue-500`} />
                    <StaggerText text="SOLUTIONS" className={`${commonTextClasses} font-serif-reveal text-blue-500`} />
                </div>
                
                <div id="hero-text-top-layer" className="flex flex-col items-center justify-center text-center">
                    <StaggerText text="HYDRO-TECH" className={commonTextClasses} />
                    <StaggerText text="SOLUTIONS" className={`${commonTextClasses} text-lime-400`} />
                </div>
            </div>

            {/* Button is now outside the masked container */}
            <a ref={buttonRef} href="#contact" className="btn-primary mt-12 font-value-display">
                <span className="stagger-text" aria-label="Get a Quote">
                    {"Get a Quote".split('').map((letter, index) => (
                        <span key={index} className="stagger-letter">
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    ))}
                </span>
            </a>
        </section>
    );
});

export default HeroTextSection;