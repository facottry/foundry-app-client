import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const debounceTimer = useRef(null);
    const wrapperRef = useRef(null);

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

        // Debounce type-ahead API call
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            fetchTypeahead(value);
        }, 300);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            setShowDropdown(false);
            navigate(`/search?q=${encodeURIComponent(query)}`);
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
                    onKeyPress={handleKeyPress}
                    placeholder="Search products..."
                    style={{
                        width: '100%',
                        padding: '10px 40px 10px 16px',
                        borderRadius: '8px',
                        border: '1px solid #E5E5E5',
                        fontSize: '0.95rem'
                    }}
                />
                <span style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem',
                    color: '#666'
                }}>
                    🔍
                </span>
            </div>

            {/* Type-ahead Dropdown */}
            {showDropdown && suggestions.length > 0 && (
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
