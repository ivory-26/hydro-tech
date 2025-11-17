
import React, { useEffect, useRef } from 'react';

interface AnimatedTextUpProps {
    text: string;
    className?: string;
}

const AnimatedTextUp: React.FC<AnimatedTextUpProps> = ({ text, className }) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const currentRef = textRef.current;
        if (!currentRef) return;

        // Use a flag to prevent re-populating
        if (currentRef.dataset.populated) return;
        currentRef.dataset.populated = "true";

        currentRef.innerHTML = text.split('').map(letter =>
            `<span class="stagger-letter">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const letters = currentRef.querySelectorAll('.stagger-letter');
                    letters.forEach((span, index) => {
                        setTimeout(() => {
                            (span as HTMLElement).style.transform = 'translateY(0)';
                            (span as HTMLElement).style.opacity = '1';
                        }, index * 50);
                    });
                    observer.unobserve(currentRef);
                }
            },
            { threshold: 0.8 }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [text]);

    return (
        <span ref={textRef} className={`stagger-text ${className || ''}`} aria-label={text}>
            {/* JS will populate this */}
        </span>
    );
};

export default AnimatedTextUp;
