import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '', tagline: '', description: '', website_url: '', logo_url: '', category: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
            navigate('/dashboard/founder');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Launch Your Product</h1>
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
                <div style={{ marginBottom: '15px' }}>
                    <label>Logo URL (Optional)</label>
                    <input name="logo_url" onChange={onChange} style={{ width: '100%', padding: '8px' }} />
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
