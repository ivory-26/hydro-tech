import { useEffect, useRef } from 'react';

export function useHoverStaggerAnimation(ref: React.RefObject<HTMLElement>) {
    const isInitialized = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const letters = Array.from(element.querySelectorAll('.stagger-letter')) as HTMLElement[];
        if (letters.length === 0) return;

        // On mount, set the initial state of letters to visible.
        if (!isInitialized.current) {
            letters.forEach(letter => {
                letter.style.transition = 'none';
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            });
            // Force a reflow to apply the initial styles immediately
            void element.offsetHeight;
            letters.forEach(letter => {
                letter.style.transition = ''; 
            });
            isInitialized.current = true;
        }

        const handleMouseEnter = () => {
            // Upflow Animation: from bottom to center
            // 1. Instantly move letters down and hide them
            letters.forEach(letter => {
                letter.style.transition = 'none';
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(100%)';
            });

            // 2. Force a reflow to ensure the browser applies the styles above
            // before applying the animation styles.
            void element.offsetHeight;

            // 3. Apply the "animate-in" styles
            letters.forEach((letter, index) => {
                letter.style.transition = ''; // Re-enable transitions from CSS
                letter.style.transitionDelay = `${index * 40}ms`;
                letter.style.transform = 'translateY(0)';
                letter.style.opacity = '1';
            });
        };

        const handleMouseLeave = () => {
            // Downflow Animation: from top to center
            // 1. Instantly move letters up and hide them
            letters.forEach(letter => {
                letter.style.transition = 'none';
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(-100%)';
            });

            // 2. Force a reflow
            void element.offsetHeight;

            // 3. Apply the "animate-in" styles
            letters.forEach((letter, index) => {
                letter.style.transition = ''; // Re-enable transitions from CSS
                letter.style.transitionDelay = `${index * 40}ms`;
                letter.style.transform = 'translateY(0)';
                letter.style.opacity = '1';
            });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref]);
}
