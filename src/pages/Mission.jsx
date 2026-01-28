import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Mission = () => {
    return (
        <div style={{ paddingBottom: '80px', paddingTop: '40px' }}>
            <SEO
                title="Our Mission - Why We Built AppFoundry"
                description="We are building the most honest place to find software. No fake reviews, no paid rankings. Just good tools."
                canonical="/mission"
            />

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <span style={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'var(--primary-color)',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    fontSize: '0.9rem',
                    marginBottom: '16px',
                    textTransform: 'uppercase'
                }}>
                    Our Mission
                </span>

                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    textAlign: 'center',
                    marginBottom: '32px',
                    lineHeight: '1.3'
                }}>
                    Helping every builder <br /> find the right tools.
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.8',
                    color: '#374151',
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    We believe that everyone—whether you are a student in a college dorm or a founder in a big city—should have access to the best software to build their dreams.
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }} />

                <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#4b5563' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111827', marginBottom: '20px', marginTop: '40px' }}>Why did we start this?</h2>
                    <p style={{ marginBottom: '24px' }}>
                        A few years ago, when I was trying to find tools for my own project, I got lost.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        I went to Google, and I saw ads. I went to review sites, and I saw "sponsored" lists. I went to social media, and I saw people shouting about tools just because they were paid to do so.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        I couldn't tell which tool was actually good and which one just had a big marketing budget.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        That made me sad. It felt unfair. Good products were getting lost in the noise.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111827', marginBottom: '20px', marginTop: '40px' }}>So, we decided to change it.</h2>
                    <p style={{ marginBottom: '24px' }}>
                        We built AppFoundry with one simple rule: <strong>Honesty.</strong>
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        Here, you cannot buy a ranking. You cannot pay us to say your product is "the best" if it isn't.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        If a tool is on top of the list, it is there because people like you are using it, clicking on it, and saving it. Not because the founder wrote us a cheque.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111827', marginBottom: '20px', marginTop: '40px' }}>Our Promise to You</h2>
                    <p style={{ marginBottom: '24px' }}>
                        We promise to keep this platform clean. We promise to fight against fake reviews and fake numbers.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        We want to build a place where you can come, search for a problem, and find a solution in 5 minutes. No nonsense.
                    </p>
                    <p style={{ marginBottom: '40px' }}>
                        This is just the beginning. We are building this for you, the builders of India and the world.
                    </p>

                    <div style={{ background: '#f3f4f6', padding: '32px', borderRadius: '12px', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#111827' }}>
                            Ready to find your next favorite tool?
                        </p>
                        <Link to="/" style={{
                            display: 'inline-block',
                            marginTop: '16px',
                            background: '#000',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}>
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mission;
