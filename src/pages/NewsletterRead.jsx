import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';

const NewsletterRead = () => {
    const { slug } = useParams();
    const [newsletter, setNewsletter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsletter = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/newsletters/${slug}`);

                if (!response.ok) {
                    throw new Error('Newsletter not found');
                }

                const data = await response.json();
                setNewsletter(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchNewsletter();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !newsletter) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="text-4xl mb-4">😕</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Newsletter Not Found</h1>
                <p className="text-gray-500 mb-6">This issue might have been removed or the link is incorrect.</p>
                <Link to="/newsletter" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                    Back into the loop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-8 text-center">
                    <Link to="/newsletter" className="inline-block text-sm text-gray-500 hover:text-blue-600 mb-6 transition">
                        ← Back to Archives
                    </Link>
                    <span className="block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                        {new Date(newsletter.scheduled_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {newsletter.title}
                    </h1>
                </div>

                {/* Content */}
                <article className="prose prose-lg prose-blue mx-auto">
                    <div dangerouslySetInnerHTML={{ __html: newsletter.html_content }} />
                </article>

                {/* Footer / UPSell */}
                <div className="mt-16 pt-12 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-8 text-center ring-1 ring-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Don't miss the next one.</h3>
                        <p className="text-gray-600 mb-6">Join 10,000+ founders getting these insights directly in their inbox.</p>
                        <div className="max-w-md mx-auto">
                            <NewsletterSignup />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewsletterRead;
