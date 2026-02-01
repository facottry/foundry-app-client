import React from 'react';

const CategoryTopProducts = ({ products = [], selectionMode = 'LATEST_3_TEMP' }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-3 overflow-hidden">
            {products.slice(0, 3).map((product) => (
                <span
                    key={product.id}
                    className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-full text-xs border border-transparent font-normal whitespace-nowrap"
                    title={product.name}
                    style={{ cursor: 'default' }}
                >
                    {product.name}
                </span>
            ))}

            {/* Future proofing debugger (hidden in prod usually, but useful now if requested) */}
            {/* <span className="hidden text-[0.6rem] text-gray-300">{selectionMode}</span> */}
        </div>
    );
};

export default CategoryTopProducts;
