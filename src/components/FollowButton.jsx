import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { emitEvent } from '../analytics';

const FollowButton = ({ targetId, type = 'product', label = 'Follow', onToggle, className = '' }) => {
    // ... context and state ... (keep as is, only showing render part if possible, but replace tool needs context)
    // Re-declaring component body to ensure props are captured
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If logged in, fetch authoritative state from API
        const fetchState = async () => {
            if (user && targetId) {
                try {
                    const endpoint = type === 'product'
                        ? `/products/${targetId}/follow-state`
                        : `/follows/${type}/${targetId}/state`;

                    const res = await api.get(endpoint);
                    setIsFollowing(res.data.isFollowing);
                } catch (err) {
                    console.error('Failed to fetch follow state:', err);
                }
            }
        };

        fetchState();
    }, [user, targetId, type]);

    const handleFollow = async () => {
        if (!user) {
            window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
            return;
        }

        try {
            setLoading(true);
            const action = isFollowing ? 'unfollow' : 'follow';
            const endpoint = `/products/${targetId}/${action}`;

            const res = await api.post(endpoint);

            if (res.data) {
                const newState = res.data.isFollowing;
                setIsFollowing(newState);
                if (onToggle) onToggle(newState);

                if (newState) {
                    emitEvent({
                        name: 'product_followed',
                        category: 'engagement',
                        actor: { type: 'user', id: user.id },
                        object: { type: 'product', id: targetId },
                        properties: { location: window.location.pathname }
                    });
                }
            }
        } catch (err) {
            console.error('Follow error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <button
            onClick={handleFollow}
            disabled={loading}
            className={`
                flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-sm font-semibold transition-all disabled:opacity-70 border
                ${isFollowing
                    ? 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'}
                ${className}
            `}
        >
            <span>{isFollowing ? '✓' : '+'}</span>
            <span className="whitespace-nowrap">{isFollowing ? 'Following' : label}</span>
        </button>
    );
};

export default FollowButton;
