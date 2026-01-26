import React from 'react';

const Privacy = () => {
    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '32px' }}>Privacy Policy</h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '48px' }}>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Information We Collect</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We collect information you provide directly to us when you create an account, list a product,
                        or use our services. This includes your name, email address, and payment information.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>How We Use Your Information</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We use the information we collect to provide, maintain, and improve our services,
                        process transactions, send you technical notices and support messages, and respond to your requests.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Data Security</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We take reasonable measures to help protect your personal information from loss, theft,
                        misuse, unauthorized access, disclosure, alteration, and destruction.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Contact Us</h2>
                    <p style={{ marginBottom: '20px' }}>
                        If you have any questions about this Privacy Policy, please contact us through our contact page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
