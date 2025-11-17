
import React from 'react';

const CompanyValues = React.forwardRef<HTMLElement>((props, ref) => {
    const values = [
        {
            title: "RELIABILITY",
            description: "Your systems need to run 24/7. We build and maintain solutions that you can depend on, ensuring uninterrupted operations."
        },
        {
            title: "LOYALTY",
            description: "We are more than a vendor; we are your long-term partner. We are loyal to your success, providing consistent service and support."
        },
        {
            title: "DETERMINATION",
            description: "Complex challenges require creative solutions. Our team is determined to solve even the toughest purification problems."
        }
    ];

    return (
        <section ref={ref} id="company-values" className="max-w-7xl mx-auto p-8 lg:p-16">
            <h2 className="text-center text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">
                Our Core <span className="text-lime-400 font-value-display">Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {values.map((value, index) => (
                    <div key={index} className="border border-neutral-800 rounded-2xl p-8 bg-neutral-900/50 text-center">
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-lime-400 font-value-display">
                            {value.title}
                        </h3>
                        <p className="mt-4 text-lg text-neutral-300">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default CompanyValues;
