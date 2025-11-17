
import React, { useState, useRef } from 'react';
import { useHoverStaggerAnimation } from './useHoverStaggerAnimation';

const ContactForm = React.forwardRef<HTMLElement>((props, ref) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useHoverStaggerAnimation(buttonRef);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.reset();
            }
            setShowSuccess(false);
        }, 3000);
    };

    return (
        <section ref={ref} id="contact" className="max-w-7xl mx-auto p-8 lg:p-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                        Get in <span className="text-lime-400 font-value-display">Touch</span>
                    </h2>
                    <p className="mt-6 text-xl text-neutral-300 max-w-lg">
                        Let's discuss your industrial water purification needs. Fill out the form for a free consultation and quote.
                    </p>
                </div>
                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 lg:mt-0 space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm font-bold uppercase text-neutral-400">Full Name</label>
                        <input type="text" id="name" name="name" required className="form-input w-full p-3 mt-2 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="company" className="text-sm font-bold uppercase text-neutral-400">Company Name</label>
                        <input type="text" id="company" name="company" required className="form-input w-full p-3 mt-2 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-bold uppercase text-neutral-400">Email</label>
                            <input type="email" id="email" name="email" required className="form-input w-full p-3 mt-2 rounded-lg" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-sm font-bold uppercase text-neutral-400">Phone</label>
                            <input type="tel" id="phone" name="phone" className="form-input w-full p-3 mt-2 rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm font-bold uppercase text-neutral-400">Your Message</label>
                        <textarea id="message" name="message" rows={5} required className="form-input w-full p-3 mt-2 rounded-lg"></textarea>
                    </div>
                    <div>
                        <button ref={buttonRef} type="submit" className="btn-primary w-full md:w-auto font-value-display">
                           <span className="stagger-text" aria-label="Send Enquiry">
                                {"Send Enquiry".split('').map((letter, index) => (
                                    <span key={index} className="stagger-letter">
                                        {letter === ' ' ? '\u00A0' : letter}
                                    </span>
                                ))}
                           </span>
                        </button>
                    </div>
                    {showSuccess && (
                        <p id="form-success" className="text-lime-400 font-bold">
                            Thank you! Your message has been sent.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
});

export default ContactForm;