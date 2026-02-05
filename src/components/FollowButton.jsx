import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { emitEvent } from '../analytics';

const FollowButton = ({ targetId, type = 'product', label = 'Follow', onToggle }) => {
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
                        : `/follows/${type}/${targetId}/state`; // Fallback if other types added later

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
            // Check auth
            // Use window.location as strict unauthorized fallback or use a modal if context allowed
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

    if (authLoading) return null; // Or skeleton

    return (
        <button
            onClick={handleFollow}
            disabled={loading}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: isFollowing ? '1px solid #e5e5e5' : '1px solid #1a1a1a',
                background: isFollowing ? '#fff' : '#1a1a1a',
                color: isFollowing ? '#666' : '#fff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1,
                minWidth: '120px'
            }}
        >
            <span>{isFollowing ? '✓' : '+'}</span>
            {isFollowing ? 'Following' : label}
        </button>
    );
};

export default FollowButton;
