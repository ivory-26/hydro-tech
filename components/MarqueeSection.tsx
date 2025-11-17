
import React from 'react';

const MarqueeSection = React.forwardRef<HTMLElement>((props, ref) => {
    const items = [
        "Industrial RO Systems",
        "UV Sterilizers",
        "Maintenance Contracts",
        "24/7 Repair Service",
        "Water Softeners"
    ];

    const MarqueeItems = () => (
        <>
            {items.map((item, index) => (
                <span key={index} className={`mx-4 whitespace-nowrap font-value-display ${index % 2 !== 0 ? 'text-lime-400' : ''}`}>
                    {item}
                </span>
            ))}
        </>
    );

    return (
        <section ref={ref} id="marquee-section" className="py-20 bg-black overflow-hidden">
            <div className="relative flex overflow-x-hidden no-scrollbar text-5xl md:text-7xl font-black uppercase">
                <div className="flex animate-marquee">
                    <div className="marquee-content-inner">
                        <MarqueeItems />
                    </div>
                    <div className="marquee-content-inner" aria-hidden="true">
                        <MarqueeItems />
                    </div>
                </div>
            </div>
        </section>
    );
});

export default MarqueeSection;
