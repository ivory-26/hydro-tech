
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="max-w-7xl mx-auto p-8 lg:p-16 border-t border-neutral-800 mt-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-2xl font-black uppercase">
                    HYDRO-TECH
                </div>
                <nav className="flex flex-wrap justify-center gap-6 font-bold uppercase text-sm">
                    <a href="#services-grid" className="hover:text-lime-400 transition-colors">Services</a>
                    <a href="#marquee-section" className="hover:text-lime-400 transition-colors">Products</a>
                    <a href="#contact" className="hover:text-lime-400 transition-colors">Contact</a>
                    <a href="#" className="hover:text-lime-400 transition-colors">Privacy Policy</a>
                </nav>
                <div className="text-neutral-500 text-sm">
                    &copy; 2025 Hydro-Tech Solutions.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
