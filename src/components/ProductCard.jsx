import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/getImageUrl';

// Helper to generate consistent pastel background colors from string
const getColorFromHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Pastel palette for premium feel (Slate, Orange, Blue, Emerald, Violet, Rose, Amber, Cyan)
    const colors = [
        'bg-slate-100 text-slate-600',
        'bg-orange-100 text-orange-600',
        'bg-blue-100 text-blue-600',
        'bg-emerald-100 text-emerald-600',
        'bg-violet-100 text-violet-600',
        'bg-rose-100 text-rose-600',
        'bg-amber-100 text-amber-600',
        'bg-cyan-100 text-cyan-600'
    ];
    return colors[Math.abs(hash) % colors.length];
};

// Helper for very subtle card backgrounds
const getCardGradient = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const gradients = [
        'bg-gradient-to-br from-white via-slate-100/50 group-hover:via-slate-200/60 to-white',
        'bg-gradient-to-br from-white via-orange-100/40 group-hover:via-orange-200/50 to-white',
        'bg-gradient-to-br from-white via-blue-100/40 group-hover:via-blue-200/50 to-white',
        'bg-gradient-to-br from-white via-emerald-100/40 group-hover:via-emerald-200/50 to-white',
        'bg-gradient-to-br from-white via-violet-100/40 group-hover:via-violet-200/50 to-white',
        'bg-gradient-to-br from-white via-rose-100/40 group-hover:via-rose-200/50 to-white',
        'bg-gradient-to-br from-white via-amber-100/40 group-hover:via-amber-200/50 to-white',
        'bg-gradient-to-br from-white via-cyan-100/40 group-hover:via-cyan-200/50 to-white'
    ];
    return gradients[Math.abs(hash) % gradients.length];
};

const ProductCard = ({ product, promoted, aspectRatio }) => {
    const logoUrl = product.logoUrl || getImageUrl(product.logoKey || product.logo_url);
    const initialColorClass = getColorFromHash(product.name || '?');
    const cardGradientClass = getCardGradient(product.name || '?');

    // Category mapping (similar to backend metadata if needed, or just use string)
    const category = (product.categories && product.categories[0]) || 'Tool';

    // Adjust padding/layout for different aspect ratios
    const isCompact = aspectRatio === '4/3';

    return (
        <Link
            to={`/product/${product.slug || product._id}`}
            style={{ textDecoration: 'none' }}
            className="group block h-full outline-none"
        >
            <div className={`
                relative flex flex-col h-full rounded-2xl border transition-all duration-200 ease-out
                ${isCompact ? 'p-5' : 'p-6'} 
                ${cardGradientClass} animate-gradient-slow
                ${promoted ? 'border-orange-200 shadow-orange-100/20' : 'border-gray-100'}
                hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 hover:border-orange-200/50
                focus-within:ring-2 focus-within:ring-orange-500/20
            `}>

                {/* Promoted Badge */}
                {promoted && (
                    <div className="absolute -top-3 left-6 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[0.65rem] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider z-10">
                        <span>🚀</span> Promoted
                    </div>
                )}

                {/* 1. Visual Anchor */}
                <div className="mb-5 transform transition-transform duration-200 group-hover:scale-105 origin-top-left">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt={`${product.name} logo`}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-50"
                        />
                    ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm ${initialColorClass}`}>
                            {(product.name || '?').charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* 2. Text Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-orange-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-1">
                        {product.tagline}
                    </p>
                </div>

                {/* 3. Footer / CTA */}
                <div className="mt-8 flex items-end justify-between border-t border-gray-50 pt-4">
                    {/* Category Pill */}
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-500 text-xs font-medium border border-gray-100 group-hover:border-orange-100 group-hover:bg-orange-50 transition-colors">
                        {category}
                    </span>

                    {/* View Action */}
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-400 group-hover:text-orange-600 transition-colors">
                        <span>View</span>
                        <span className="transform transition-transform duration-200 group-hover:translate-x-1 group-hover:text-orange-500">
                            →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
