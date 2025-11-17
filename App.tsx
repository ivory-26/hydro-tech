
import React, { useState, useEffect, useRef, useCallback } from 'react';
import IntroScreen from './components/IntroScreen';
import ProgressBar from './components/ProgressBar';
import HeroTextSection from './components/HeroTextSection';
import MarqueeSection from './components/MarqueeSection';
import ServicesGrid from './components/ServicesGrid';
import CompanyValues from './components/CompanyValues';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

type BlobPosition = { x: number; y: number };

const App: React.FC = () => {
    const [introStyle, setIntroStyle] = useState<React.CSSProperties>({ opacity: 1 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [blobPosition, setBlobPosition] = useState<BlobPosition>({ x: 0, y: 0 });
    const [isBlobVisible, setIsBlobVisible] = useState(false);

    const mainContentRef = useRef<HTMLDivElement>(null);
    const sectionRefs = [
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
    ];

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Intro screen fade
        const opacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.7)));
        if (scrollY > windowHeight) {
            setIntroStyle({ opacity, pointerEvents: 'none', visibility: 'hidden' });
        } else {
            setIntroStyle({ opacity, pointerEvents: 'auto', visibility: 'visible' });
        }

        // Progress bar active section
        if (opacity < 0.5) {
            let currentSectionIndex = 0;
            let minDistance = Infinity;

            sectionRefs.forEach((ref, index) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    const distance = Math.abs(rect.top - (window.innerHeight / 4));
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSectionIndex = index;
                    }
                }
            });
            setActiveIndex(currentSectionIndex);
        }
    }, [sectionRefs]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="bg-black text-white font-['Inter']">
            <div
                id="mouse-blob-visual"
                style={{
                    left: `${blobPosition.x}px`,
                    top: `${blobPosition.y}px`,
                    transform: `translate(-50%, -50%) scale(${isBlobVisible ? 1 : 0})`,
                    opacity: isBlobVisible ? 1 : 0,
                }}
            />

            <IntroScreen style={introStyle} />
            <ProgressBar activeIndex={activeIndex} />

            <main ref={mainContentRef} id="main-content" className="relative z-20 mt-[100vh] bg-black">
                <HeroTextSection
                    ref={sectionRefs[0]}
                    setBlobPosition={setBlobPosition}
                    setBlobVisible={setIsBlobVisible}
                />
                <MarqueeSection ref={sectionRefs[1]} />
                <ServicesGrid ref={sectionRefs[2]} />
                <CompanyValues ref={sectionRefs[3]} />
                <ContactForm ref={sectionRefs[4]} />
                <Footer />
            </main>
        </div>
    );
};

export default App;
