import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const ReviewsAnalytics = ({ data }) => {
    // Transform review data
    const reviews = data?.reviews || [];
    const averageRating = data?.summary?.rating || 0;
    const totalReviews = data?.summary?.reviews || 0;

    // Calculate rating distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
        const rating = Math.round(r.rating);
        if (distribution[rating] !== undefined) distribution[rating]++;
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Col: Sentiment & Ratings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Review Sentiment</h3>
                </div>

                <div className="flex items-center gap-6 mb-8">
                    <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                    <div>
                        <div className="font-semibold text-gray-700">Average Rating</div>
                        <div className="text-sm text-gray-500">{totalReviews} total reviews</div>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-4 text-sm">
                            <span className="w-3 font-semibold text-gray-500">{star}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${totalReviews > 0 ? (distribution[star] / totalReviews) * 100 : 0}%` }}
                                ></div>
                            </div>
                            <span className="w-6 text-right text-gray-600 font-semibold">{distribution[star]}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">AI Sentiment Analysis</h4>
                    <div className="flex gap-8">
                        <div className="text-center">
                            <div className="text-xl font-bold text-green-600">{distribution[5] + distribution[4]}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">🙂 Positive</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-gray-600">{distribution[3]}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">😐 Neutral</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-red-600">{distribution[2] + distribution[1]}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">☹️ Negative</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: AI Tags & Recent Feedback */}
            <div className="space-y-6">
                {/* AI Tags - Mocked for now */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900">AI Insight Tags</h3>
                        <p className="text-sm text-gray-500">Frequently mentioned topics and sentiment drivers.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['highly-rated', 'reliable', 'ai-powered', 'fast-support', 'good-value'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                #{tag} <span className="text-gray-400 ml-1">1</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Recent Feedback List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Recent Feedback</h3>
                    </div>

                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.slice(0, 3).map((review, i) => (
                                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {review.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</div>
                                                <div className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                                            {review.rating} <Star size={12} fill="currentColor" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {review.comment}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        <span className="text-xs text-blue-600">#highly-rated</span>
                                        <span className="text-xs text-blue-600">#reliable</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-gray-400 italic">No reviews yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsAnalytics;
