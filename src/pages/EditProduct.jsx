import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import ImageUploader from '../components/common/ImageUploader';
import { getImageUrl } from '../utils/getImageUrl';
import LoadingState from '../components/common/LoadingState';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                const p = res.data;
                setFormData({
                    name: p.name || '',
                    tagline: p.tagline || '',
                    description: p.description || '',
                    website_url: p.website_url || '',
                    // Use server-provided URL first, fallback to constructing from key
                    logo_url: p.logoUrl || p.logo_url || getImageUrl(p.logoKey) || '',
                    logoKey: p.logoKey || '',
                    category: (p.categories && p.categories[0]) || '',
                    // Use server-provided screenshot URLs
                    screenshots: (p.screenshotUrls && p.screenshotUrls.length > 0)
                        ? p.screenshotUrls
                        : (p.screenshotKeys || p.screenshots || []).map(k => getImageUrl(k)),
                    screenshotKeys: p.screenshotKeys || []
                });
            } catch (err) {
                console.error('Failed to load product', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadEnd = () => setIsUploading(false);

    const handleLogoUpload = (result) => {
        const url = result.url || result; // Handle both object and string for backward compat
        const key = result.key || '';
        setFormData(prev => ({
            ...prev,
            logo_url: url,
            logoKey: key
        }));
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (isUploading) return; // double check

        setError(null);
        try {
            // ... (rest of submit logic)
            const payload = {
                ...formData,
                categories: formData.category ? [formData.category] : [],
                // Filter out any empty strings from screenshotKeys to strictly satisfy validation
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
    if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '40px auto' }}>
            <h1>Edit Product</h1>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Product Name</label>
                    <input name="name" value={formData.name} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Tagline</label>
                    <input name="tagline" value={formData.tagline} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={onChange} required style={{ width: '100%', padding: '8px', minHeight: '100px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Website URL</label>
                    <input name="website_url" type="url" value={formData.website_url} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>

                {/* Logo Upload */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Product Logo</label>
                    <ImageUploader
                        label="Product Logo"
                        type="product_logo"
                        onUpload={handleLogoUpload}
                        onUploadStart={handleUploadStart}
                        onUploadEnd={handleUploadEnd}
                        currentUrl={formData.logo_url}
                    />
                </div>

                {/* Screenshots Upload */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Screenshots (Max 5)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {formData.screenshots && formData.screenshots.map((url, idx) => (
                            <div key={idx} style={{ position: 'relative', width: '100px', height: '60px' }}>
                                <img src={url} alt={`Screenshot ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newScreenshots = [...formData.screenshots];
                                        const newKeys = [...formData.screenshotKeys];
                                        newScreenshots.splice(idx, 1);
                                        if (newKeys.length > idx) newKeys.splice(idx, 1);
                                        setFormData(prev => ({ ...prev, screenshots: newScreenshots, screenshotKeys: newKeys }));
                                    }}
                                    style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                                >
                                    x
                                </button>
                            </div>
                        ))}

                        {(!formData.screenshots || formData.screenshots.length < 5) && (
                            <div style={{ width: '100px' }}>
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

                <div style={{ marginBottom: '15px' }}>
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={onChange} required style={{ width: '100%', padding: '8px' }}>
                        <option value="">Select Category</option>
                        <option value="SaaS">SaaS</option>
                        <option value="DevTools">DevTools</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Marketing">Marketing</option>
                        <option value="AI">AI</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => navigate('/founder/products')} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1, opacity: isUploading ? 0.7 : 1, cursor: isUploading ? 'not-allowed' : 'pointer' }}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading Images...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
