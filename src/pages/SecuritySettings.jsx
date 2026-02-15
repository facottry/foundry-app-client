import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingState from '../components/common/LoadingState';

const SecuritySettings = () => {
    const { user } = useAuth(); // Need to ensure user object is available
    const [identities, setIdentities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Auth header helper - assuming AuthContext provides token or we get it from storage
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token'); // Simplification
        return { headers: { 'x-auth-token': token } };
    };

    const fetchIdentities = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/auth/sso/identities`, getAuthHeaders());
            setIdentities(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIdentities();
    }, []);

    const handleDisconnect = async (id) => {
        if (!window.confirm('Are you sure you want to disconnect this login method?')) return;
        try {
            await axios.delete(`${apiUrl}/api/auth/sso/identities/${id}`, getAuthHeaders());
            fetchIdentities();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to disconnect');
        }
    };

    const handleConnect = (provider) => {
        // Mock connection flow
        alert(`Connecting ${provider} (Mock)`);
        // In real app: Popup OAuth, then call attach endpoint
        // For now, assume success
    };

    const isConnected = (provider) => {
        return identities.some(i => i.provider === provider);
    };

    if (loading) return <LoadingState message="Verifying security settings..." />;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Security & Connected Accounts</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Login Methods</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage how you sign in to your account.</p>
                </div>
                <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {['google', 'github', 'linkedin'].map(provider => {
                            const connected = isConnected(provider);
                            const identity = identities.find(i => i.provider === provider);
                            return (
                                <li key={provider} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="capitalize font-medium text-gray-900">{provider}</span>
                                        {connected && <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Connected</span>}
                                    </div>
                                    <div>
                                        {connected ? (
                                            <button
                                                onClick={() => handleDisconnect(identity._id)}
                                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                                            >
                                                Disconnect
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleConnect(provider)}
                                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                            >
                                                Connect
                                            </button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                        <li className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="font-medium text-gray-900">Email & Password</span>
                            </div>
                            <div>
                                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                    Change Password
                                </button>
                            </div>
                        </li>
                        <li className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div>
                                    <span className="font-medium text-gray-900">Staffium Integration</span>
                                    {user?.staffiumExpiresAt && new Date(user.staffiumExpiresAt) > new Date() ? (
                                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            Inactive
                                        </span>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        {user?.staffiumExpiresAt && new Date(user.staffiumExpiresAt) > new Date()
                                            ? `Subscription expires on ${new Date(user.staffiumExpiresAt).toLocaleDateString()}`
                                            : 'Enable Staffium from the dashboard to access.'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                {user?.staffiumExpiresAt && new Date(user.staffiumExpiresAt) > new Date() ? (
                                    <button
                                        onClick={async () => {
                                            if (!window.confirm('Disable Staffium integration? Your subscription will remain active until expiration.')) return;
                                            // Optional: allow disabling the flag even if active? 
                                            // For now, let's just use the flag to disable specific access if user wants to "turn it off" without cancelling sub?
                                            // The backend logic respects flag IF set to false explicitly, but auto-enables on purchase.
                                            // Let's support the toggle for "Pausing" access if they want.

                                            const newStatus = !user?.staffiumEnabled;
                                            try {
                                                await axios.put(`${apiUrl}/api/profile/me`, { staffiumEnabled: newStatus }, getAuthHeaders());
                                                window.location.reload();
                                            } catch (err) {
                                                alert('Failed to update setting');
                                            }
                                        }}
                                        className={`${user?.staffiumEnabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${user?.staffiumEnabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                        />
                                    </button>
                                ) : (
                                    <a href="/dashboard/staffium" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                        Activate in Dashboard
                                    </a>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
