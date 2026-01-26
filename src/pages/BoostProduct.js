import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const BoostProduct = () => {
    const { productId } = useParams();
    const [formData, setFormData] = useState({ budget: 100, duration_days: 7 });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await api.post('/boost/create', { product_id: productId, ...formData });
            setSuccess('Campaign created successfully! Redirecting...');
            setTimeout(() => navigate('/dashboard/founder'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating campaign'); // More robust error handling
        }
    };

    // Placeholder for ErrorState component - assuming it's defined elsewhere or will be added
    const ErrorState = ({ error }) => (
        <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            padding: '16px',
            color: '#EF4444'
        }}>
            <strong>Error!</strong> {error}
        </div>
    );

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Boost Your Product</h1>

            {success && (
                <div style={{
                    backgroundColor: '#E6F4EA',
                    border: '1px solid #A8D5BA',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    color: '#1E6F3E'
                }}>
                    <strong>Success!</strong> {success}
                </div>
            )}

            {error && <div style={{ marginBottom: '20px' }}><ErrorState error={error} /></div>}

            <p>Pay for 1000s of new visitors.</p>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Daily Budget (Credits)</label>
                    <input type="number" name="daily_budget" value={formData.daily_budget} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Max Cost Per Click (Credits)</label>
                    <input type="number" step="0.1" name="max_cpc" value={formData.max_cpc} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Launch Campaign</button>
            </form>
        </div>
    );
};

export default BoostProduct;
