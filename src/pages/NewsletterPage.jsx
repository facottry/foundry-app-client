import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';
import { useAuth } from '../context/AuthContext';

const NewsletterPage = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {
            if (!user) return;
            try {
                const token = localStorage.getItem('token');
                // Use consistent env var or just rely on relative path if proxy, but here use the standard var.
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const res = await fetch(`${apiUrl}/subscribe/status`, {
                    headers: { 'x-auth-token': token }
                });
                const data = await res.json();
                setIsSubscribed(data.subscribed);
            } catch (err) {
                console.error('Check sub error', err);
            }
        };
        checkSubscription();
    }, [user]);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex">
            {/* Left Sidebar: Archives */}
            <div className="w-1/3 min-w-[320px] bg-white border-r border-gray-200 overflow-y-auto h-[calc(100vh-64px)] sticky top-[64px] hidden md:block">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/newsletter" className="hover:opacity-75 transition">
                        <h2 className="text-xl font-bold text-gray-900">Foundry Signal</h2>
                        <p className="text-sm text-gray-500">Past Issues Archive</p>
                    </Link>
                </div>
                <NewsletterArchiveList activeSlug={slug} />
            </div>

            {/* Right Logic Pane */}
            <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
                {slug ? (
                    <NewsletterContent slug={slug} />
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-full p-12">
                        <div className="max-w-2xl w-full text-center mb-12 relative z-10">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
                                Weekly Intelligence
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Foundry</span> Signal.
                            </h1>
                            <p className="text-lg text-gray-500 leading-relaxed mb-8">
                                Join 10,000+ founders receiving curated product discovery tips, hidden gems, and market signals. No fluff, just alpha.
                            </p>

                            {isSubscribed ? (
                                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-xl border border-green-200 inline-flex items-center gap-2 font-medium">
                                    <span>✅</span> You are already subscribed.
                                </div>
                            ) : (
                                <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl ring-1 ring-gray-100">
                                    <NewsletterSignup />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const NewsletterArchiveList = ({ activeSlug }) => {
    const [newsletters, setNewsletters] = useState([]);

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${apiUrl}/newsletters`);
                const data = await response.json();
                if (Array.isArray(data)) setNewsletters(data);
            } catch (err) {
                console.error('Failed to load archives', err);
            }
        };
        fetchArchives();
    }, []);

    if (newsletters.length === 0) return <div className="p-6 text-gray-400 text-center text-sm">No archives yet.</div>;

    return (
        <div className="divide-y divide-gray-50">
            {newsletters.map(issue => (
                <Link
                    to={`/newsletter/${issue.slug}`}
                    key={issue._id}
                    className={`block p-6 hover:bg-gray-50 transition border-l-4 ${activeSlug === issue.slug ? 'bg-blue-50 border-blue-600' : 'border-transparent'}`}
                >
                    <h4 className={`text-sm font-semibold mb-1 ${activeSlug === issue.slug ? 'text-blue-900' : 'text-gray-900'}`}>{issue.title}</h4>
                    <p className="text-xs text-gray-500">
                        {issue.scheduled_at ? new Date(issue.scheduled_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Draft'}
                    </p>
                </Link>
            ))}
        </div>
    );
};

const NewsletterContent = ({ slug }) => {
    const [newsletter, setNewsletter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsletter = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${apiUrl}/newsletters/${slug}`);
                if (!response.ok) throw new Error('Not found');
                const data = await response.json();
                setNewsletter(data);
            } catch (err) {
                console.error(err);
                setNewsletter(null);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsletter();
    }, [slug]);

    if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>;
    if (!newsletter) return <div className="p-12 text-center text-gray-500">Newsletter not found.</div>;

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{newsletter.title}</h1>
            <p className="text-sm text-gray-500 mb-8 border-b pb-4">
                {newsletter.scheduled_at
                    ? new Date(newsletter.scheduled_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    : 'Unscheduled'
                }
            </p>
            <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: newsletter.html_content }} />
        </div>
    );
};

export default NewsletterPage;
