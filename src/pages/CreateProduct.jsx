import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import ImageUploader from '../components/common/ImageUploader';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '', tagline: '', description: '', website_url: '', logo_url: '', category: ''
    });
    const [error, setError] = useState(null);
    const [pendingProducts, setPendingProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch user's pending products on mount
    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await api.get('/founder/products');
                const pending = (res.data || []).filter(p => p.status === 'pending');
                setPendingProducts(pending);
            } catch (err) {
                console.error('Failed to fetch products', err);
            }
        };
        fetchPending();
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle Image Upload
    const handleLogoUpload = (result) => {
        // Support both old (string) and new (object) format for backward compat if needed, 
        // but we know we just changed ImageUploader.
        const url = result.url || result;
        const key = result.key;
        setFormData(prev => ({
            ...prev,
            logo_url: url,
            logoKey: key
        }));
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            const payload = {
                ...formData,
                categories: [formData.category],
                screenshots: []
            };
            await api.post('/products', payload);
            navigate('/founder/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Launch Your Product</h1>

            {/* Pending Products Warning */}
            {pendingProducts.length > 0 && (
                <div style={{
                    background: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px'
                }}>
                    <div style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                        ⏳ You have {pendingProducts.length} product(s) pending approval
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#78350f', marginBottom: '12px' }}>
                        Please wait for your existing submissions to be reviewed before resubmitting.
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#92400e' }}>
                        {pendingProducts.map(p => (
                            <li key={p._id}>{p.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error.message}</div>}
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Product Name</label>
                    <input name="name" onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Tagline (Short pitch)</label>
                    <input name="tagline" onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <textarea name="description" onChange={onChange} required style={{ width: '100%', padding: '8px', minHeight: '100px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Website URL</label>
                    <input name="website_url" type="url" onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>

                {/* Image Upload Integration */}
                <div style={{ marginBottom: '15px' }}>
                    <ImageUploader
                        label="Product Logo"
                        type="product_logo"
                        onUpload={handleLogoUpload}
                        currentUrl={formData.logo_url}
                    />
                </div>

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
                                        const newKeys = [...(formData.screenshotKeys || [])];
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
                                    onUpload={(result) => {
                                        const url = result.url || result;
                                        const key = result.key;
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
                    <select name="category" onChange={onChange} required style={{ width: '100%', padding: '8px' }}>
                        <option value="">Select Category</option>
                        <option value="SaaS">SaaS</option>
                        <option value="DevTools">DevTools</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Marketing">Marketing</option>
                        <option value="AI">AI</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit for Review</button>
            </form>
        </div>
    );
};

export default CreateProduct;
