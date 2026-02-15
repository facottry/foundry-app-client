import React from 'react';
import { Link } from 'react-router-dom';

const StaffiumMarquee = () => {
    return (
        <div className="bg-indigo-600 text-white overflow-hidden py-2 relative z-50">
            <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
                {/* Repeated content for smooth loop */}
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-4 flex items-center gap-2">
                        <span className="bg-white text-indigo-700 text-xs font-bold px-2 py-0.5 rounded uppercase">New</span>
                        <Link to="/staffium" className="hover:underline font-medium text-sm">
                            Introducing <strong>Staffium</strong>: Hire AI Agents for your business. Click to learn more. &rarr;
                        </Link>
                    </span>
                ))}
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    width: max-content;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default StaffiumMarquee;
