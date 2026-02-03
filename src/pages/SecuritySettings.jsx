import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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

    if (loading) return <div>Loading...</div>;

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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
