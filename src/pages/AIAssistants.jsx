import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AIAssistants.css';
import LoadingState from '../components/common/LoadingState';

const AIAssistants = ({ isEmbedded = false }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStatus = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/founder/botvas/status');
            setStatus(res.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load status');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    const handleEnable = async () => {
        try {
            setActionLoading(true);
            await api.post('/founder/botvas/enable');
            await fetchStatus();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to enable');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDisable = async () => {
        if (!window.confirm('Disable AI Assistant? This will stop the subscription. Already deducted credits are not refunded.')) {
            return;
        }
        try {
            setActionLoading(true);
            await api.post('/founder/botvas/disable');
            await fetchStatus();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to disable');
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="ai-assistants-page">
                <LoadingState message="Connecting to AI services..." />
            </div>
        );
    }

    return (
        <div className="ai-assistants-page" style={isEmbedded ? { padding: 0 } : {}}>
            {!isEmbedded && (
                <div className="page-header">
                    <h1>AI Assistants</h1>
                    <p className="page-desc">Manage your Founder AI Bot subscription</p>
                </div>
            )}

            {error && (
                <div className="error-banner">{error}</div>
            )}

            <div className="vas-card">
                <div className="vas-header">
                    <div className="vas-icon">🤖</div>
                    <div className="vas-title">
                        <h2>AIRA + REX</h2>
                        <p>Archive & Intelligence + Reality & Execution</p>
                    </div>
                    <div className={`vas-status-badge ${status?.status}`}>
                        {status?.status === 'active' ? 'Active' :
                            status?.status === 'insufficient_credits' ? 'Insufficient Credits' :
                                'Disabled'}
                    </div>
                </div>

                <div className="vas-details">
                    <div className="detail-row">
                        <span className="label">Monthly Cost</span>
                        <span className="value">{status?.monthlyCost || 30} Credits</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Your Credits</span>
                        <span className={`value ${status?.credits < 30 ? 'low' : ''}`}>
                            {status?.credits || 0} Credits
                        </span>
                    </div>
                    {status?.enabled && status?.nextDeduction && (
                        <div className="detail-row">
                            <span className="label">Next Deduction</span>
                            <span className="value">{formatDate(status.nextDeduction)}</span>
                        </div>
                    )}
                    {status?.lastDeduction && (
                        <div className="detail-row">
                            <span className="label">Last Deduction</span>
                            <span className="value">{formatDate(status.lastDeduction)}</span>
                        </div>
                    )}
                </div>

                <div className="vas-features">
                    <h3>Included Features</h3>
                    <ul>
                        <li>📋 <strong>AIRA</strong> - Records, Memory, Truth Validation</li>
                        <li>⚡ <strong>REX</strong> - Decisions, Actions, Execution Guidance</li>
                        <li>🔄 Unlimited queries per month</li>
                        <li>🔒 Private founder-only access</li>
                    </ul>
                </div>

                <div className="vas-actions">
                    {!status?.enabled ? (
                        <>
                            {status?.canEnable ? (
                                <button
                                    className="btn-enable"
                                    onClick={handleEnable}
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? 'Enabling...' : 'Enable AI Assistant (30 Credits/Month)'}
                                </button>
                            ) : (
                                <div className="insufficient-credits-cta">
                                    <p>Insufficient credits to enable AI Assistant.</p>
                                    <button
                                        className="btn-buy-credits"
                                        onClick={() => navigate('/wallet')}
                                    >
                                        Buy Credits
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            className="btn-disable"
                            onClick={handleDisable}
                            disabled={actionLoading}
                        >
                            {actionLoading ? 'Disabling...' : 'Disable AI Assistant'}
                        </button>
                    )}
                </div>

                {status?.disableReason === 'low_credits' && (
                    <div className="warning-banner">
                        ⚠️ AI Assistant was automatically disabled due to insufficient credits.
                    </div>
                )}
            </div>

            <div className="info-card">
                <h3>How it works</h3>
                <ol>
                    <li>Enable the AI Assistant to start your subscription</li>
                    <li>30 credits are deducted immediately</li>
                    <li>Every 30 days, 30 credits are automatically deducted</li>
                    <li>If your balance drops below 30, the bot is disabled</li>
                    <li>You can disable anytime - no refunds for unused time</li>
                </ol>
            </div>
        </div>
    );
};

export default AIAssistants;
