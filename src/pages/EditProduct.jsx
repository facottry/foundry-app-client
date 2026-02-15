import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import ImageUploader from '../components/common/ImageUploader';
import { getImageUrl } from '../utils/getImageUrl';
import LoadingState from '../components/common/LoadingState';
import Breadcrumb from '../components/common/Breadcrumb';
import FormSection from '../components/product/FormSection';
import HeroHeader from '../components/product/HeroHeader';
import LivePreviewCard from '../components/product/LivePreviewCard';
import GoogleSEOPreview from '../components/product/GoogleSEOPreview';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        description: '',
        website_url: '',
        logo_url: '',
        logoKey: '',
        category: '',
        screenshots: [],
        screenshotKeys: []
    });
    const [isUploading, setIsUploading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                const p = res.data;
                setProduct(p);
                setFormData({
                    name: p.name || '',
                    tagline: p.tagline || '',
                    description: p.description || '',
                    website_url: p.website_url || '',
                    logo_url: p.logoUrl || p.logo_url || getImageUrl(p.logoKey) || '',
                    logoKey: p.logoKey || '',
                    category: (p.categories && p.categories[0]) || '',
                    screenshots: (p.screenshotUrls && p.screenshotUrls.length > 0)
                        ? p.screenshotUrls
                        : (p.screenshotKeys || p.screenshots || []).map(k => getImageUrl(k)),
                    screenshotKeys: p.screenshotKeys || []
                });
                setLastUpdated(p.updatedAt || new Date());
            } catch (err) {
                console.error('Failed to load product', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadEnd = () => setIsUploading(false);

    const handleLogoUpload = (result) => {
        const url = result.url || result;
        const key = result.key || '';
        setFormData(prev => ({
            ...prev,
            logo_url: url,
            logoKey: key
        }));
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (isUploading) return;

        setError(null);
        try {
            const payload = {
                ...formData,
                categories: formData.category ? [formData.category] : [],
                screenshotKeys: (formData.screenshotKeys || []).filter(k => k && k.trim() !== ''),
                screenshots: (formData.screenshots || []).filter(s => s && s.trim() !== '')
            };
            await api.put(`/founder/products/${id}`, payload);
            navigate('/founder/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to update product');
        }
    };

    if (loading) return <LoadingState />;
    if (error && !product) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/founder/dashboard' },
        { label: 'Products', href: '/founder/products' },
        { label: product?.name || 'Untitled', href: `/product/${id}` },
        { label: 'Edit' }
    ];

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px'
        }}>
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Header */}
            <HeroHeader product={product} lastUpdated={lastUpdated} />

            <form onSubmit={onSubmit}>
                {/* Two-Column Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                }}>
                    {/* Left Column - Form Studio */}
                    <div>
                        {/* Basics Section */}
                        <FormSection title="Basics" icon="📝" defaultExpanded={true} required={true}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}>
                                        Product Name
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={onChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            fontSize: '15px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3b82f6';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#d1d5db';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <div style={{
                                        marginTop: '4px',
                                        fontSize: '12px',
                                        color: '#6b7280'
                                    }}>
                                        {formData.name.length}/60 characters
                                    </div>
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}>
                                        Tagline
                                    </label>
                                    <input
                                        name="tagline"
                                        value={formData.tagline}
                                        onChange={onChange}
                                        required
                                        placeholder="One-line pitch for your product"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            fontSize: '15px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3b82f6';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#d1d5db';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <div style={{
                                        marginTop: '4px',
                                        fontSize: '12px',
                                        color: '#6b7280'
                                    }}>
                                        {formData.tagline.length}/80 characters
                                    </div>
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}>
                                        Website URL
                                    </label>
                                    <input
                                        name="website_url"
                                        type="url"
                                        value={formData.website_url}
                                        onChange={onChange}
                                        required
                                        placeholder="https://example.com"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            fontSize: '15px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3b82f6';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#d1d5db';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}>
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={onChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            fontSize: '15px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            background: '#ffffff',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="SaaS">SaaS</option>
                                        <option value="DevTools">DevTools</option>
                                        <option value="Productivity">Productivity</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="AI">AI</option>
                                    </select>
                                </div>
                            </div>
                        </FormSection>

                        {/* Description Section */}
                        <FormSection title="Description" icon="📄" defaultExpanded={true} required={true}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151'
                                }}>
                                    Product Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={onChange}
                                    required
                                    placeholder="Describe your product in detail..."
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        fontSize: '15px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        minHeight: '150px',
                                        fontFamily: 'inherit',
                                        lineHeight: '1.6',
                                        resize: 'vertical',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#3b82f6';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#d1d5db';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <div style={{
                                    marginTop: '6px',
                                    fontSize: '12px',
                                    color: formData.description.length < 100 ? '#ef4444' : formData.description.length > 500 ? '#f59e0b' : '#10b981'
                                }}>
                                    {formData.description.length} characters
                                    {formData.description.length < 100 && ' (Minimum 100 recommended)'}
                                    {formData.description.length > 500 && ' (Consider keeping under 500)'}
                                </div>
                            </div>
                        </FormSection>

                        {/* Media Section */}
                        <FormSection title="Media" icon="📷" defaultExpanded={false}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* Logo */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}>
                                        Product Logo
                                    </label>
                                    <ImageUploader
                                        label="Product Logo"
                                        type="product_logo"
                                        onUpload={handleLogoUpload}
                                        onUploadStart={handleUploadStart}
                                        onUploadEnd={handleUploadEnd}
                                        currentUrl={formData.logo_url}
                                    />
                                </div>

                                {/* Screenshots */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}>
                                        Screenshots (Max 5)
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                        {formData.screenshots && formData.screenshots.map((url, idx) => (
                                            <div key={idx} style={{
                                                position: 'relative',
                                                width: '120px',
                                                height: '80px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '2px solid #e5e7eb'
                                            }}>
                                                <img
                                                    src={url}
                                                    alt={`Screenshot ${idx + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newScreenshots = [...formData.screenshots];
                                                        const newKeys = [...formData.screenshotKeys];
                                                        newScreenshots.splice(idx, 1);
                                                        if (newKeys.length > idx) newKeys.splice(idx, 1);
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            screenshots: newScreenshots,
                                                            screenshotKeys: newKeys
                                                        }));
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 4,
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        borderRadius: '50%',
                                                        width: '24px',
                                                        height: '24px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: '700',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}

                                        {(!formData.screenshots || formData.screenshots.length < 5) && (
                                            <div style={{ width: '120px' }}>
                                                <ImageUploader
                                                    label=""
                                                    type="screenshot"
                                                    currentUrl=""
                                                    onUploadStart={handleUploadStart}
                                                    onUploadEnd={handleUploadEnd}
                                                    onUpload={(result) => {
                                                        let url = result;
                                                        let key = '';

                                                        if (typeof result === 'object' && result !== null) {
                                                            url = result.url || '';
                                                            key = result.key || '';
                                                        }

                                                        if (!url) return;

                                                        setFormData(prev => ({
                                                            ...prev,
                                                            screenshots: [...(prev.screenshots || []), url],
                                                            screenshotKeys: [...(prev.screenshotKeys || []), key]
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                    </div>

                    {/* Right Column - Live Preview */}
                    <div style={{
                        position: 'sticky',
                        top: '20px',
                        alignSelf: 'start'
                    }}>
                        <LivePreviewCard formData={formData} />
                        <GoogleSEOPreview formData={formData} />
                    </div>
                </div>

                {/* Save Actions */}
                <div style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    marginBottom: '40px'
                }}>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {error && <span style={{ color: '#ef4444' }}>⚠ {error}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/founder/dashboard')}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                background: '#f3f4f6',
                                color: '#374151',
                                border: '1px solid #e5e7eb',
                                fontWeight: '600',
                                fontSize: '15px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '12px 32px',
                                borderRadius: '8px',
                                background: isUploading
                                    ? '#9ca3af'
                                    : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                color: '#ffffff',
                                border: 'none',
                                fontWeight: '600',
                                fontSize: '15px',
                                cursor: isUploading ? 'not-allowed' : 'pointer',
                                opacity: isUploading ? 0.7 : 1,
                                transition: 'all 0.2s ease',
                                boxShadow: isUploading ? 'none' : '0 2px 8px rgba(59, 130, 246, 0.3)'
                            }}
                            disabled={isUploading}
                        >
                            {isUploading ? '⏳ Uploading...' : '✓ Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
