import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await signup(name, email, password, role);
            if (user.role === 'FOUNDER') navigate('/dashboard/founder');
            else navigate('/dashboard/customer');
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    if (loading) return <LoadingState />;

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Sign Up</h2>
            {error && (
                <div style={{ marginBottom: '15px' }}>
                    <ErrorState error={error} />
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>I am a:</label>
                    <select name="role" value={role} onChange={onChange} style={{ width: '100%', padding: '8px' }}>
                        <option value="CUSTOMER">Customer (I want to discover tools)</option>
                        <option value="FOUNDER">Founder (I want to list a product)</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
