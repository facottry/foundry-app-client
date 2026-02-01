import React from 'react';
import BRAND from '../config/brand';

const Terms = () => {
    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '32px' }}>Terms of Service</h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '48px' }}>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Acceptance of Terms</h2>
                    <p style={{ marginBottom: '20px' }}>
                        By accessing and using {BRAND.publicName}, you accept and agree to be bound by the terms and provisions of this agreement.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Use of Service</h2>
                    <p style={{ marginBottom: '20px' }}>
                        You agree to use {BRAND.publicName} only for lawful purposes and in accordance with these Terms.
                        You agree not to use the service in any way that could damage, disable, or impair the service.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Product Listings</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Founders are responsible for the accuracy and legality of their product listings.
                        We reserve the right to remove any listing that violates our policies or applicable laws.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Payment Terms</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Credits are purchased on a pay-as-you-go basis. One credit equals one qualified outbound click.
                        Credits do not expire and are non-refundable.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Termination</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We may terminate or suspend your account and access to the service immediately,
                        without prior notice, for conduct that we believe violates these Terms.
                    </p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Contact</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Questions about the Terms of Service should be sent to us through our contact page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
