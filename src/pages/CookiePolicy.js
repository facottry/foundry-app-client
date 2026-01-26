import React from 'react';

const CookiePolicy = () => {
    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '32px' }}>Cookie Policy</h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '48px' }}>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>What Are Cookies</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Cookies are small text files that are placed on your device when you visit our website.
                        They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>How We Use Cookies</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We use cookies for the following purposes:
                    </p>
                    <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
                        <li style={{ marginBottom: '12px' }}>
                            <strong>Essential Cookies:</strong> Required for the platform to function properly, including authentication and session management
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                            <strong>Analytics Cookies:</strong> Help us understand how users interact with Foundry to improve the experience
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                            <strong>Preference Cookies:</strong> Remember your settings and preferences
                        </li>
                    </ul>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Managing Cookies</h2>
                    <p style={{ marginBottom: '20px' }}>
                        You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may not function properly.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Third-Party Cookies</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We may use third-party services that set their own cookies. These services include analytics providers and payment processors. We do not control these cookies.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Updates to This Policy</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Contact</h2>
                    <p style={{ marginBottom: '20px' }}>
                        If you have questions about our use of cookies, please contact us through our <a href="/contact" style={{ color: 'var(--accent-primary)' }}>contact page</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
