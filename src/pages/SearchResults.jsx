import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import AuthContext from '../context/AuthContext';
import BRAND from '../config/brand';

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const query = searchParams.get('q') || '';

    // State
    const [results, setResults] = useState({ pages: [], categories: [], products: [], founders: [] });
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [activeFilter, setActiveFilter] = useState('ALL'); // ALL, PAGE, CATEGORY, PRODUCT, FOUNDER
    const [inputValue, setInputValue] = useState(query);
    const [trendingSearches, setTrendingSearches] = useState([]);

    const inputRef = useRef(null);

    // Animated Gradient Style
    const gradientStyle = {
        background: 'linear-gradient(-45deg, #FFEFBA, #FFFFFF, #E6F4EA, #F3F4F6)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite'
    };

    // Initial Load & History
    useEffect(() => {
        const stored = localStorage.getItem('search_history');
        if (stored) {
            try { setHistory(JSON.parse(stored)); } catch (e) { }
        }
        if (inputRef.current) inputRef.current.focus();

        // Inject keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Sync input with query and Fetch Trending
    useEffect(() => {
        setInputValue(query);

        const fetchTrending = async () => {
            const defaults = ['AI Tools', 'SaaS', 'Productivity', 'Marketing', 'No-Code', 'Design', 'Remote Work', 'Startup'];
            try {
                const res = await api.get('/search/trending');
                if (res.data.success && res.data.data.length > 0) {
                    setTrendingSearches(res.data.data);
                } else {
                    setTrendingSearches(defaults);
                }
            } catch (e) {
                console.error("Failed to load trending searches", e);
                setTrendingSearches(defaults);
            }
        };
        fetchTrending();
    }, [query]);

    // Fetch Results
    useEffect(() => {
        if (!query || query.length < 2) {
            setResults({ pages: [], categories: [], products: [], founders: [] });
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                addToHistory(query); // Changed from initialQuery to query

                const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
                const responseData = res.data;

                if (responseData.results) {
                    setResults(responseData.results);
                } else if (responseData.success) {
                    const data = responseData.data;
                    if (Array.isArray(data)) {
                        setResults({ pages: [], categories: [], products: data, founders: [] });
                    } else {
                        setResults(data.results || { pages: [], categories: [], products: [], founders: [] });
                    }
                } else if (Array.isArray(responseData)) {
                    // Legacy fallback
                    setResults({ pages: [], categories: [], products: responseData, founders: [] });
                }
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setLoading(false);
            }
        };

        // No debounce needed here as this useEffect runs when the URL query param changes,
        // which typically happens on form submission or history click.
        fetchResults();

    }, [query]);

    // Helpers
    const addToHistory = (q) => {
        if (!q) return;
        setHistory(prev => {
            const newHistory = [q, ...prev.filter(item => item !== q)].slice(0, 5);
            localStorage.setItem('search_history', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        localStorage.removeItem('search_history');
        setHistory([]);
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const hasResults = results && (
        results.pages?.length > 0 ||
        results.categories?.length > 0 ||
        results.products?.length > 0 ||
        results.founders?.length > 0
    );

    // Filter Logic
    const showPages = (activeFilter === 'ALL' || activeFilter === 'PAGE') && results?.pages?.length > 0;
    const showCategories = (activeFilter === 'ALL' || activeFilter === 'CATEGORY') && results?.categories?.length > 0;
    const showFounders = (activeFilter === 'ALL' || activeFilter === 'FOUNDER') && results?.founders?.length > 0;
    const showProducts = (activeFilter === 'ALL' || activeFilter === 'PRODUCT') && results?.products?.length > 0;

    // --- Components ---

    const FilterBadge = ({ label, type, count }) => (
        <button
            onClick={() => setActiveFilter(type)}
            style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: activeFilter === type ? '1px solid var(--text-primary)' : '1px solid var(--border-subtle)',
                background: activeFilter === type ? 'var(--text-primary)' : 'transparent',
                color: activeFilter === type ? 'var(--bg-main)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.95rem',
                marginRight: '12px',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            {label} {count > 0 && <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{count}</span>}
        </button>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
            <SEOHead title={query ? `${query} - Search` : 'Search Clicktory'} />

            {/* Premium Header (Sticky) */}
            <div className="search-header">
                <div className="search-header-content">

                    {/* 1. Logo (Extreme Left) */}
                    <div className="search-logo-container">
                        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)', whiteSpace: 'nowrap', textDecoration: 'none' }}>
                            {BRAND.publicName}
                        </Link>
                        {/* Mobile: Show Login/Profile here if desired, or simplified */}
                    </div>

                    {/* 2. Hero Search Bar (Centered / Shifted Right) */}
                    <div style={{ flex: 1, width: '100%', maxWidth: '800px', position: 'relative' }}>
                        <div style={{
                            position: 'relative',
                            background: 'rgba(255,255,255,0.6)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03), 0 0 0 1px rgba(255,255,255,0.5) inset',
                            transition: 'all 0.2s ease'
                        }} className="search-bar-container">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={query || "Search for products, founders, or categories..."}
                                style={{
                                    width: '100%',
                                    padding: '16px 60px 16px 24px',
                                    fontSize: '1.1rem',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500'
                                }}
                            />
                            {/* Search Icon / Submit Button */}
                            <button
                                onClick={handleSearch}
                                style={{
                                    position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                                    cursor: 'pointer', opacity: 0.6, transition: 'opacity 0.2s',
                                    background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}
                                aria-label="Search"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>

                            {/* Clear Button */}
                            {inputValue && (
                                <div
                                    onClick={() => { setInputValue(''); navigate('/search'); }}
                                    style={{
                                        position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)',
                                        cursor: 'pointer', opacity: 0.3, fontSize: '1.2rem'
                                    }}
                                >
                                    ×
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Secondary Navigation (Right) - Hide on mobile via CSS if needed, or stack */}
                    <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '24px', whiteSpace: 'nowrap' }}>
                        <Link to="/category/all" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: '500' }}>Browse</Link>
                        {!user ? (
                            <>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: '500' }}>Log in</Link>
                                <Link to="/signup" style={{
                                    textDecoration: 'none', color: '#fff', background: '#000', padding: '10px 20px',
                                    borderRadius: '100px', fontWeight: '600', fontSize: '0.9rem'
                                }}>Sign Up</Link>
                            </>
                        ) : (
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: '500' }}>My Profile</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '120px' }}>

                {/* Loading State */}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.6 }}>
                        <div className="loader"></div>
                    </div>
                )}

                {/* Main Trending / History Area (Visible when no query) */}
                {!query && !loading && (
                    <div style={{
                        marginTop: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '40px',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        {/* History Section */}
                        {history.length > 0 && (
                            <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontWeight: '600' }}>Recent Searches</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                                    {history.map((h, i) => (
                                        <button
                                            key={i}
                                            onClick={() => navigate(`/search?q=${encodeURIComponent(h)}`)}
                                            style={{
                                                background: '#fff', border: '1px solid var(--border-subtle)',
                                                padding: '10px 24px', borderRadius: '100px', fontSize: '1rem', color: 'var(--text-secondary)',
                                                cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                        >
                                            {h}
                                        </button>
                                    ))}
                                    <button onClick={clearHistory} style={{ background: 'none', border: 'none', fontSize: '0.9rem', color: 'var(--text-tertiary)', cursor: 'pointer', textDecoration: 'underline', marginLeft: '12px' }}>Clear</button>
                                </div>
                            </div>
                        )}

                        {/* Trending Section */}
                        {trendingSearches.length > 0 && (
                            <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: '600' }}>Trending Now</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                                    {trendingSearches.map((t, i) => (
                                        <button
                                            key={i}
                                            onClick={() => navigate(`/search?q=${encodeURIComponent(t)}`)}
                                            style={{
                                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                                border: '1px solid rgba(0,0,0,0.05)',
                                                padding: '12px 28px', borderRadius: '12px', fontSize: '1.05rem', color: '#1f2937', fontWeight: '600',
                                                cursor: 'pointer', transition: 'all 0.2s ease',
                                                display: 'flex', alignItems: 'center', gap: '8px'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)'; e.currentTarget.style.background = '#fff'; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'; }}
                                        >
                                            <span style={{ fontSize: '1.2rem' }}>🔥</span> {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Filters (Left Aligned) - Hidden if only 1 category exists */}
                {/* Chrome-style Tabs */}
                <div className="flex border-b border-gray-200 mb-6 mx-4 md:mx-0 overflow-x-auto scrollbar-hide">
                    <button
                        onClick={() => setActiveFilter('ALL')}
                        className={`flex-shrink-0 px-5 py-2.5 text-sm font-bold rounded-t-lg mr-1 transition-all ${activeFilter === 'ALL' ? 'bg-white text-gray-900 border-t-[3px] border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                    >
                        All Results
                    </button>
                    {results.pages.length > 0 && (
                        <button
                            onClick={() => setActiveFilter('PAGE')}
                            className={`flex-shrink-0 px-5 py-2.5 text-sm font-bold rounded-t-lg mr-1 transition-all ${activeFilter === 'PAGE' ? 'bg-white text-gray-900 border-t-[3px] border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            Collections <span className="ml-1 opacity-60 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{results.pages.length}</span>
                        </button>
                    )}
                    {results.categories.length > 0 && (
                        <button
                            onClick={() => setActiveFilter('CATEGORY')}
                            className={`flex-shrink-0 px-5 py-2.5 text-sm font-bold rounded-t-lg mr-1 transition-all ${activeFilter === 'CATEGORY' ? 'bg-white text-gray-900 border-t-[3px] border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            Categories <span className="ml-1 opacity-60 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{results.categories.length}</span>
                        </button>
                    )}
                    {results.products.length > 0 && (
                        <button
                            onClick={() => setActiveFilter('PRODUCT')}
                            className={`flex-shrink-0 px-5 py-2.5 text-sm font-bold rounded-t-lg mr-1 transition-all ${activeFilter === 'PRODUCT' ? 'bg-white text-gray-900 border-t-[3px] border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            Products <span className="ml-1 opacity-60 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{results.products.length}</span>
                        </button>
                    )}
                </div>

                {/* Content Area - Dense Grid */}
                <div className="bg-white rounded-b-xl min-h-[400px]">
                    {showPages && (
                        <section className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.pages.map((p, i) => (
                                    <Link to={p.url} key={i} className="block group">
                                        <div className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50 h-full">
                                            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-orange-600">{p.name}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* B. Categories - DENSE GRID */}
                    {showCategories && (
                        <section className="mb-6 px-4 md:px-6">
                            <h4 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 pl-1">Categories</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {results.categories.map((cat) => (
                                    <Link to={`/category/${cat.slug}`} key={cat.slug} className="block group">
                                        <div className="p-3 border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-sm bg-gray-50 flex items-center gap-3 transition-all h-full">
                                            <span className="text-xl md:text-2xl">{cat.icon || '📂'}</span>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-bold text-sm text-gray-900 group-hover:text-orange-600 truncate">{cat.name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium">View Collection</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* C. Founders - DENSE GRID */}
                    {showFounders && (
                        <section className="mb-6 px-4 md:px-6">
                            <h4 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 pl-1">Founders</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {results.founders.map(founder => (
                                    <Link to={`/founder/${founder.slug || founder._id}`} key={founder._id} className="block group">
                                        <div className="p-3 border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-sm bg-white flex items-center gap-3 transition-all">
                                            <div className="relative w-10 h-10 flex-shrink-0">
                                                <img
                                                    src={founder.avatar_url || 'https://via.placeholder.com/80'}
                                                    alt={founder.name}
                                                    className="w-full h-full rounded-full object-cover border border-gray-100 bg-gray-50"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="hidden w-full h-full rounded-full items-center justify-center text-sm font-bold bg-gradient-to-br from-orange-100 to-amber-50 text-orange-800 border border-orange-100 absolute top-0 left-0">
                                                    {founder.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="font-bold text-sm text-gray-900 group-hover:text-orange-600 truncate">{founder.name}</div>
                                                <div className="text-[11px] text-gray-400 truncate">{founder.company_name || 'Founder'}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* D. Products - ULTRA DENSE GRID */}
                    {showProducts && (
                        <section className="px-4 md:px-6 pb-8">
                            <h4 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 pl-1">Products</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {results.products.map(product => (
                                    <div key={product._id} className="h-full">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div >
        </div >
    );
};

export default SearchResults;
