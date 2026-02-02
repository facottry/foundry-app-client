import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';

const FollowButton = ({ targetId, type = 'product', label = 'Follow' }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check local user state initially
        if (user && user.follows) {
            const list = type === 'product' ? user.follows.productIds : user.follows.categoryIds;
            if (list && list.includes(targetId)) {
                setIsFollowing(true);
            }
        }
    }, [user, targetId, type]);

    const handleFollow = async () => {
        if (!user) {
            // Check auth
            alert('Please login to follow items.');
            // distinct visual cue or redirect could be better
            return;
        }

        try {
            setLoading(true);
            // API call to toggle follow
            const endpoint = `/follows/${type}/${targetId}`;
            const res = await api.post(endpoint);

            setIsFollowing(res.data.isFollowing);

            // Optimistic update of local storage user or context could happen here
            // but for thin implementations, local state is fine.
            // Ideally we should update AuthContext user object to reflect new follows
            // to keep it in sync across components. 
            if (res.data.success) {
                // We'd need a method in AuthContext to update user state without full reload
                // For now, let's just rely on local state.
            }

        } catch (err) {
            console.error('Follow error:', err);
            // Revert state if we did optimistic update (we didn't here)
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
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: isFollowing ? '1px solid #e5e5e5' : '1px solid #1a1a1a',
                background: isFollowing ? '#fff' : '#1a1a1a',
                color: isFollowing ? '#666' : '#fff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            <span>{isFollowing ? '✓' : '+'}</span>
            {isFollowing ? 'Following' : label}
        </button>
    );
};

export default FollowButton;
