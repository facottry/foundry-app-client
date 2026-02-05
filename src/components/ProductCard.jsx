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
            className="group block outline-none h-full"
        >
            <div className={`
                relative flex flex-col h-full rounded-xl border transition-all duration-200 ease-out
                p-3 md:p-4 bg-white
                ${promoted ? 'border-orange-200 shadow-orange-100/20' : 'border-gray-100'}
                hover:-translate-y-1 hover:shadow-lg hover:border-orange-200/50
            `}>
                {/* Header: Icon + Title Tight Row */}
                <div className="flex items-start gap-3 mb-2">
                    {/* Compact Icon */}
                    <div className="flex-shrink-0">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={`${product.name} logo`}
                                className="w-10 h-10 rounded-lg object-cover border border-gray-50 bg-gray-50"
                            />
                        ) : (
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${initialColorClass}`}>
                                {(product.name || '?').charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Title + Promoted Status */}
                    <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm md:text-base font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors leading-tight">
                                {product.name}
                            </h3>
                            {promoted && (
                                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0">
                                    Ad
                                </span>
                            )}
                        </div>
                        <div className="text-[11px] md:text-xs text-xs font-medium text-gray-500 truncate mt-0.5">
                            {category}
                        </div>
                    </div>
                </div>

                {/* Description: Max 2 lines dense */}
                <p className="text-gray-500 text-xs leading-5 line-clamp-2 mb-3 min-h-[2.5rem]">
                    {product.tagline}
                </p>

                {/* Footer: Metadata or Action - Very minimal */}
                <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                    {/* Can add stars or '1.2k views' here if data exists */}
                    <span>{product.views ? `${product.views} views` : 'New'}</span>

                    <span className="group-hover:text-orange-500 group-hover:font-semibold transition-colors flex items-center gap-1">
                        View
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
