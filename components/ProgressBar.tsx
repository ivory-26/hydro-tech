import React, { useState, useEffect, useRef } from 'react';

interface ProgressBarProps {
    activeIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ activeIndex }) => {
    const [visualActiveIndex, setVisualActiveIndex] = useState(activeIndex);
    const dotsRef = useRef<(HTMLLIElement | null)[]>([]);
    const waterDropRef = useRef<SVGSVGElement>(null);
    const lastIndexRef = useRef(-1);
    const animationInProgressRef = useRef(false);

    useEffect(() => {
        const fromIndex = lastIndexRef.current;
        const toIndex = activeIndex;

        if (fromIndex !== toIndex && fromIndex !== -1 && !animationInProgressRef.current) {
            const fromDot = dotsRef.current[fromIndex];
            const toDot = dotsRef.current[toIndex];
            const waterDrop = waterDropRef.current;

            if (fromDot && toDot && waterDrop) {
                animationInProgressRef.current = true;
                const startY = fromDot.offsetTop + (fromDot.offsetHeight / 2);
                const endY = toDot.offsetTop + (toDot.offsetHeight / 2);
                const waterDropHeight = waterDrop.getBoundingClientRect().height;

                waterDrop.style.transition = 'none';
                waterDrop.style.top = `${startY - (waterDropHeight / 2)}px`;
                waterDrop.style.transform = 'scale(0.8)';
                waterDrop.style.opacity = '1';

                setTimeout(() => {
                    waterDrop.style.transition = 'transform 0.7s cubic-bezier(0.6, -0.28, 0.74, 0.05), top 0.7s cubic-bezier(0.6, -0.28, 0.74, 0.05), opacity 0.7s linear';
                    waterDrop.style.transform = 'scale(1.2)';
                    waterDrop.style.top = `${endY - (waterDropHeight / 2)}px`;
                }, 20);

                setTimeout(() => {
                    waterDrop.style.transition = 'opacity 0.3s ease-out';
                    waterDrop.style.opacity = '0';
                    waterDrop.style.transform = 'scale(0)';
                    
                    // Highlight the dot AFTER the animation finishes
                    setVisualActiveIndex(toIndex);
                    animationInProgressRef.current = false;
                }, 700);
            }
        } else if (!animationInProgressRef.current) {
            // Sync immediately if no animation is running
            setVisualActiveIndex(toIndex);
        }
        
        lastIndexRef.current = activeIndex;
    }, [activeIndex]);


    return (
        <nav id="progress-nav">
            <div id="progress-track"></div>
            <svg ref={waterDropRef} id="water-drop" viewBox="0 0 20 20" className="w-5 h-5" fill="#a3e635" style={{ opacity: 0, transform: 'scale(0)' }}>
                <path d="M10 0C10 0 3 5.818 3 12.182 3 16.036 6.136 20 10 20s7-3.964 7-7.818C17 5.818 10 0 10 0Z" />
            </svg>
            <ul id="progress-dots">
                {[...Array(5)].map((_, index) => (
                    <li
                        key={index}
                        ref={el => { if(dotsRef.current) dotsRef.current[index] = el }}
                        className={`progress-dot ${visualActiveIndex === index ? 'active' : ''}`}
                    ></li>
                ))}
            </ul>
        </nav>
    );
};

export default ProgressBar;