
import React, { useState, useEffect } from 'react';

interface IntroScreenProps {
    style: React.CSSProperties;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ style }) => {
    const [logoStyle, setLogoStyle] = useState<React.CSSProperties>({
        opacity: 0,
        transform: 'scale(0.9)',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoStyle({
                opacity: 1,
                transform: 'scale(1)',
            });
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="intro-screen" className="fixed inset-0 h-screen w-screen z-30" style={style}>
            <img 
                id="hero-image" 
                src="../assets/intro-image.png"
                alt="Industrial water purification system" 
                className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h1 id="intro-logo" className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transition-all duration-1000 ease-out" style={logoStyle}>
                    HYDRO-TECH
                </h1>
                <p className="text-xl md:text-2xl text-lime-400 font-bold uppercase tracking-widest mt-2">
                    Industrial Solutions
                </p>
            </div>
            <div id="scroll-indicator" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white uppercase font-bold text-sm tracking-widest">
                Scroll
            </div>
        </div>
    );
};

export default IntroScreen;
