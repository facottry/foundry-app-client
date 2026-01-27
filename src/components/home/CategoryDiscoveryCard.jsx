import React from 'react';
import { Link } from 'react-router-dom';

const CategoryDiscoveryCard = ({ category }) => {
    // category: { name, slug, tagline, icon, subtags, productCount, isTrending }

    return (
        <Link
            to={`/category/${category.slug}`}
            className="group block relative overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/50"
            style={{ textDecoration: 'none' }}
        >
            {/* Subtle Top Gradient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-300 to-amber-200"></div>

            <div className="p-6 h-full flex flex-col justify-between relative z-10">
                {/* Top Section */}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-50 text-2xl rounded-xl group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
                        {category.icon}
                    </div>
                    {category.isTrending && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[0.7rem] font-bold border border-amber-100 uppercase tracking-wide">
                            🔥 Trending
                        </div>
                    )}
                </div>

                {/* Center Content */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-display group-hover:text-orange-600 transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        {category.tagline}
                    </p>
                </div>

                {/* Subtags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {category.subtags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-gray-50 rounded-md text-xs font-medium text-gray-600 border border-gray-100 group-hover:border-orange-100 group-hover:bg-orange-50/50 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        {category.productCount} Tools
                    </span>

                    <div className="flex items-center gap-1 text-sm font-bold text-orange-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        Explore
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryDiscoveryCard;
