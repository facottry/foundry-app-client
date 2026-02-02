import React from 'react';
import { Link } from 'react-router-dom';

const WhyUs = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '20px', lineHeight: '1.2' }}>
                    Why Clicktory?
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                    We built a simple place for software. No noise. No social games. Just problems and solutions.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                {/* For Founders */}
                <div style={{
                    background: '#fff',
                    padding: '40px',
                    borderRadius: '16px',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: '#e3f2fd',
                        color: '#0d47a1',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '24px'
                    }}>
                        For Founders
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>
                        Stop chasing likes. Get real users.
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <BenefitItem
                            icon="🎯"
                            title="Users with Intent"
                            desc="People come here looking for tools to solve problems, not to scroll a feed."
                        />
                        <BenefitItem
                            icon="💰"
                            title="Pay for Results Only"
                            desc="You only pay when a verified user actually clicks to visit your website. No 'impressions' billing."
                        />
                        <BenefitItem
                            icon="🚀"
                            title="Fair Launch"
                            desc="New products get a fair shot. You don't need 10,000 followers to be seen."
                        />
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <Link to="/auth/signup?role=founder" style={{
                            display: 'block',
                            background: '#1a1a1a',
                            color: '#fff',
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'transform 0.2s'
                        }}>
                            List Your Product
                        </Link>
                    </div>
                </div>

                {/* For Customers */}
                <div style={{
                    background: '#fff',
                    padding: '40px',
                    borderRadius: '16px',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: '#e8f5e9',
                        color: '#1b5e20',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '24px'
                    }}>
                        For Everyone Else
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>
                        Find tools that actually work.
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <BenefitItem
                            icon="🔍"
                            title="Solve Your Problem"
                            desc="Search by what you need to do (e.g., 'edit PDF', 'manage tasks'). Find the tool that does it."
                        />
                        <BenefitItem
                            icon="🛡️"
                            title="No Sponsored Junk"
                            desc="We mark promoted tools clearly. Organic results are ranked by usefulness, not budget."
                        />
                        <BenefitItem
                            icon="⭐"
                            title="Discover Hidden Gems"
                            desc="Find great tools from indie makers, not just the big corporations."
                        />
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <Link to="/category/all" style={{
                            display: 'block',
                            background: '#fff',
                            color: '#1a1a1a',
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            fontWeight: '600',
                            border: '2px solid #1a1a1a',
                            textDecoration: 'none'
                        }}>
                            Browse Tools
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Statement */}
            <div style={{ marginTop: '80px', textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Our Promise</h3>
                <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    We are building infrastructure for software discovery.
                    Simple, transparent, and respectful of your attention.
                </p>
            </div>
        </div>
    );
};

const BenefitItem = ({ icon, title, desc }) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '1.5rem', lineHeight: '1' }}>{icon}</div>
        <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px', color: '#333' }}>{title}</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.5', margin: 0 }}>{desc}</p>
        </div>
    </div>
);

export default WhyUs;
