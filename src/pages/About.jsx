import React from 'react';
import SEO from '../components/SEO';
import BRAND from '../config/brand';

const About = () => {
    return (
        <div style={{ paddingBottom: '80px', paddingTop: '40px' }}>
            <SEO
                title={`About ${BRAND.publicName} - Our Mission & Standards`}
                description={`${BRAND.publicName} is the curated decision layer for startup tools. Learn about our editorial standards, neutrality commitment, and the team behind the platform.`}
                canonical="/about"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '24px' }}>
                    The Decision Layer for Builders.
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '48px' }}>
                    {BRAND.publicName} is a curated discovery and comparison platform for software tools, helping founders, developers, and startups make better tool decisions without the noise.
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }} />

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Why We Built This</h2>
                    <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>
                        Software discovery is broken. G2 is pay-to-play. ProductHunt is a popularity contest.
                        Founders need clarity, not hype.
                    </p>
                    <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>
                        We built {BRAND.publicName} to be the <strong>neutral ground</strong> where independent tools can shine based on merit, utility, and user intent.
                    </p>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Editorial Standards & Neutrality</h2>
                    <div style={{ background: '#F9FAFB', padding: '32px', borderRadius: '12px' }}>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><strong>✅ Merit First:</strong> Tools are ranked by engagement (clicks, views) and verified utility, not ad spend.</li>
                            <li><strong>✅ No Pay-to-Rank:</strong> You cannot buy organic ranking positions. Promoted spots are strictly labeled as "Promoted".</li>
                            <li><strong>✅ Transparency:</strong> We verify founder identities and tool functionality before approval.</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Monetization Disclosure</h2>
                    <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                        {BRAND.publicName} is a sustainable business. We make money through:
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '12px', lineHeight: '1.6' }}>
                        <li><strong>Performance Marketing:</strong> Founders pay only when a verified user clicks to visit their site.</li>
                        <li><strong>Promoted Visibility:</strong> Clearly marked sponsored placements that do not affect organic search results.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '32px' }}>Meet the Core Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

                        {/* Arun Gupta */}
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🚀</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Arun Gupta</h3>
                            <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Founder & CEO</p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                A visionary leader with a deep passion for building scalable technology ecosystems. Arun drives the strategic direction of {BRAND.publicName}, focusing on democratizing software discovery and empowering the next generation of builders.
                            </p>
                            <a href="https://www.linkedin.com/in/arun-gupta-tech/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#0077b5', textDecoration: 'none', fontWeight: '500' }}>
                                Connect on LinkedIn &rarr;
                            </a>
                        </div>

                        {/* Vinod Gaur */}
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚙️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Vinod Gaur</h3>
                            <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Chief Technology Officer (CTO)</p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                A veteran technologist specializing in high-performance architecture and AI integration. Vinod ensures the platform's infrastructure is enterprise-grade, secure, and ready for massive scale.
                            </p>
                            <a href="https://www.linkedin.com/in/vinodiiitm/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#0077b5', textDecoration: 'none', fontWeight: '500' }}>
                                Connect on LinkedIn &rarr;
                            </a>
                        </div>

                        {/* Vivek Kumar Shankhdhar */}
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🛡️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Vivek Kumar Shankhdhar</h3>
                            <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Co-Founder & Head of Quality</p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Adobe Commerce (Magento) Certified & QA Lead with deep experience in E-commerce automation and performance testing. Vivek ensures every interaction on {BRAND.publicName} meets the highest standards of reliability and trust.
                            </p>
                            <a href="https://www.linkedin.com/in/vivek-kumar-shankhdhar-398a5980/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#0077b5', textDecoration: 'none', fontWeight: '500' }}>
                                Connect on LinkedIn &rarr;
                            </a>
                        </div>

                        {/* Manish Jaiswal */}
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💡</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Manish Jaiswal</h3>
                            <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Head of Product</p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Orchestrating the user experience and product lifecycle. Manish bridges the gap between complex user needs and intuitive design, ensuring {BRAND.publicName} delivers tangible value to every visitor.
                            </p>
                            <a href="https://www.linkedin.com/in/manish-jaiswal-49701b4a/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#0077b5', textDecoration: 'none', fontWeight: '500' }}>
                                Connect on LinkedIn &rarr;
                            </a>
                        </div>

                        {/* Shobhit Jaiswal */}
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💻</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Shobhit Jaiswal</h3>
                            <p style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>Tech Lead</p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Full-stack engineering expert focused on code quality, performance optimization, and robust development standards. Shobhit leads the engineering efforts to deliver a seamless, bug-free experience.
                            </p>
                            <a href="https://www.linkedin.com/in/shobhit-jaiswal-962995145/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#0077b5', textDecoration: 'none', fontWeight: '500' }}>
                                Connect on LinkedIn &rarr;
                            </a>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};

export default About;
