import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState([]);
    const navigate = useNavigate();
    const debounceTimer = useRef(null);
    const wrapperRef = useRef(null);

    // Fetch trending on mount
    useEffect(() => {
        const loadTrending = async () => {
            try {
                const res = await api.get('/search/trending');
                if (res.data.success) {
                    setTrending(res.data.data);
                }
            } catch (e) {
                // Silent fail
            }
        };
        loadTrending();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchTypeahead = async (searchQuery) => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        setLoading(true);
        try {
            const res = await api.get(`/search/typeahead?q=${encodeURIComponent(searchQuery)}`);
            setSuggestions(res.data || []);
            setShowDropdown(true);
        } catch (error) {
            console.error('Type-ahead error:', error);
            setSuggestions([]);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (value.length < 2) {
            setSuggestions([]);
            // Show trending if empty
            if (value.length === 0) {
                setShowDropdown(true);
            } else {
                setShowDropdown(false);
            }
            return;
        }

        debounceTimer.current = setTimeout(() => {
            fetchTypeahead(value);
        }, 300);
    };

    const handleFocus = () => {
        if (!query && trending.length > 0) {
            setShowDropdown(true);
        }
    };

    const handleSearch = () => {
        if (query.trim()) {
            setShowDropdown(false);
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSuggestionClick = (productId) => {
        setShowDropdown(false);
        setQuery('');
        navigate(`/product/${productId}`);
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onKeyPress={handleKeyPress}
                    onClick={() => navigate('/search')}
                    placeholder="Search products..."
                    style={{
                        width: '100%',
                        padding: '12px 48px 12px 24px', // More padding for pill shape
                        borderRadius: '24px', // Pill shape
                        border: '1px solid transparent', // Cleaner look, shadow does the validation
                        backgroundColor: '#F1F3F4', // Google grey bg
                        fontSize: '1rem',
                        cursor: 'text',
                        transition: 'all 0.2s ease',
                        boxShadow: 'none'
                    }}
                    onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 1px 6px rgba(32,33,36,0.28)';
                        handleFocus();
                    }}
                    onBlur={(e) => {
                        e.target.style.backgroundColor = '#F1F3F4';
                        e.target.style.boxShadow = 'none';
                    }}
                />
                <span
                    onClick={handleSearch}
                    style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        color: '#5F6368', // Google grey icon
                        cursor: 'pointer'
                    }}
                    role="button"
                    aria-label="Search"
                >
                    🔍
                </span>
            </div>

            {/* Type-ahead Dropdown */}
            {showDropdown && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #E5E5E5',
                    borderRadius: '8px',
                    marginTop: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    {/* Trending Section (Only if no query) */}
                    {!query && trending.length > 0 && (
                        <div>
                            <div style={{ padding: '8px 16px', fontSize: '0.75rem', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Trending Now
                            </div>
                            {trending.map((term, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setQuery(term);
                                        setShowDropdown(false);
                                        navigate(`/search?q=${encodeURIComponent(term)}`);
                                    }}
                                    style={{
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        borderBottom: '1px solid #f9f9f9',
                                        fontSize: '0.9rem'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    <span style={{ fontSize: '1rem' }}>🔥</span>
                                    <span>{term}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Product Suggestions */}
                    {suggestions.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => handleSuggestionClick(product._id)}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f0f0f0',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            {product.logo_url && (
                                <img
                                    src={product.logo_url}
                                    alt={product.name}
                                    style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
                                />
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{product.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{product.tagline}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {loading && showDropdown && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #E5E5E5',
                    borderRadius: '8px',
                    marginTop: '4px',
                    padding: '16px',
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '0.9rem'
                }}>
                    Searching...
                </div>
            )}
        </div>
    );
};

export default SearchBox;
