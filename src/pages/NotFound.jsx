import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🛸</div>
            <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#111827' }}>Lost in Space?</h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '40px' }}>
                We couldn't coordinate the trajectory for that URL. It seems to have drifted into a black hole.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link
                    to="/"
                    className="btn btn-primary"
                    style={{ padding: '12px 30px', fontSize: '1.1rem' }}
                >
                    Return to Earth (Home)
                </Link>
                <Link
                    to="/search"
                    style={{
                        padding: '12px 30px',
                        fontSize: '1.1rem',
                        background: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}
                >
                    Search Instead
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
