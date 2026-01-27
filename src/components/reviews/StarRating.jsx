import React from 'react';

const StarRating = ({ rating, size = 16, interactive = false, onChange }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div style={{ display: 'flex', gap: '2px' }}>
            {stars.map((star) => (
                <svg
                    key={star}
                    onClick={() => interactive && onChange && onChange(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill={star <= rating ? '#fbbf24' : 'none'} // Amber-400 for filled (orange theme)
                    stroke={star <= rating ? '#fbbf24' : '#d1d5db'} // Gray-300 for empty
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.2s' }}
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
