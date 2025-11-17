
import React, { useRef } from 'react';
import { useHoverStaggerAnimation } from './useHoverStaggerAnimation';

const StaggeredTextContent = ({ text }: { text: string }) => (
    <span className="stagger-text" aria-label={text}>
        {text.split('').map((letter, index) => (
            <span key={index} className="stagger-letter">
                {letter === ' ' ? '\u00A0' : letter}
            </span>
        ))}
    </span>
);

const ServicesGrid = React.forwardRef<HTMLElement>((props, ref) => {
    const link1Ref = useRef<HTMLAnchorElement>(null);
    const link2Ref = useRef<HTMLAnchorElement>(null);
    const link3Ref = useRef<HTMLAnchorElement>(null);

    useHoverStaggerAnimation(link1Ref);
    useHoverStaggerAnimation(link2Ref);
    useHoverStaggerAnimation(link3Ref);

    return (
        <section ref={ref} id="services-grid" className="max-w-7xl mx-auto p-8 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a ref={link1Ref} href="#contact" className="grid-link col-span-1 md:col-span-2 rounded-2xl p-8 md:p-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-value-display">
                        Proactive Maintenance
                    </h3>
                    <p className="mt-4 text-lg text-neutral-400 max-w-2xl">
                        Scheduled servicing and preventative maintenance contracts to ensure your systems run at peak efficiency, 24/7.
                    </p>
                    <span className="inline-block mt-6 text-lime-400 font-bold uppercase tracking-widest font-value-display">
                        <StaggeredTextContent text="Schedule a Checkup" />
                    </span>
                </a>
                <a ref={link2Ref} href="#contact" className="grid-link rounded-2xl p-8 md:p-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-value-display">
                        Emergency Repairs
                    </h3>
                    <p className="mt-4 text-lg text-neutral-400">
                        Rapid-response repair services for critical failures. Our technicians are on call to minimize your downtime.
                    </p>
                    <span className="inline-block mt-6 text-lime-400 font-bold uppercase tracking-widest font-value-display">
                        <StaggeredTextContent text="Request Service" />
                    </span>
                </a>
                <a ref={link3Ref} href="#contact" className="grid-link rounded-2xl p-8 md:p-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-value-display">
                        Industries We Serve
                    </h3>
                    <p className="mt-4 text-lg text-neutral-400">
                        Specialized solutions for Pharmaceutical, Manufacturing, Food & Beverage, and chemical plants.
                    </p>
                    <span className="inline-block mt-6 text-lime-400 font-bold uppercase tracking-widest font-value-display">
                        <StaggeredTextContent text="Learn More" />
                    </span>
                </a>
            </div>
        </section>
    );
});

export default ServicesGrid;