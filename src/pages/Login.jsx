import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await login(email, password);
            if (user.role === 'FOUNDER') navigate('/founder/dashboard');
            else if (user.role === 'ADMIN') navigate('/dashboard/admin'); // Should not happen in public client potentially
            else navigate('/dashboard/customer');
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    if (loading) return <LoadingState />;

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Login</h2>
            {error && (
                <div style={{ marginBottom: '15px' }}>
                    <ErrorState error={error} />
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
            </form>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem' }}>
                    <Link to="/login-otp">Forgot Password? / Login with OTP</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
