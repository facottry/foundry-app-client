import React from 'react';
import { Link } from 'react-router-dom';
import CategoryTopProducts from './CategoryTopProducts';

const CategoryDiscoveryCard = ({ category }) => {
    // category: { name, slug, tagline, icon, subtags, productCount, isTrending, topProducts, selectionMode }

    return (
        <Link
            to={`/category/${category.slug}`}
            className="group relative block h-full bg-white rounded-xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 overflow-hidden"
            style={{ textDecoration: 'none' }}
        >
            {/* Subtle Warm Tint Overlay on Hover */}
            <div className="absolute inset-0 bg-orange-50/0 group-hover:bg-orange-50/[0.03] transition-colors" />

            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-orange-500/20 transition-colors" />

            <div className="relative p-5 flex flex-col h-full">
                {/* Header: Icon + Count */}
                <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-50/80 flex items-center justify-center text-lg text-orange-600/90 shadow-sm border border-orange-100/50 group-hover:bg-orange-100/80 transition-colors">
                        {category.icon}
                    </div>
                    {/* Tiny Count Badge */}
                    <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                        {category.productCount}
                    </span>
                </div>

                {/* Text Content */}
                <div className="mb-4">
                    <h3 className="text-[0.95rem] font-semibold text-gray-900 mb-1 group-hover:text-orange-700 transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 pr-2">
                        {category.tagline}
                    </p>
                </div>

                {/* Top Tools (Chips) - Pushed to bottom */}
                <div className="mt-auto pt-3 border-t border-gray-50/50 flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {category.topProducts && category.topProducts.slice(0, 3).map((prod, i) => (
                        <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100/80">
                            {prod.name}
                        </span>
                    ))}
                    {(category.topProducts?.length || 0) > 3 && (
                        <span className="text-[10px] text-gray-300 px-1">+{(category.topProducts?.length || 0) - 3}</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default CategoryDiscoveryCard;
