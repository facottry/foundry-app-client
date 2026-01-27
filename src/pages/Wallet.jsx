import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState(50);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Use helper to allow parallel if supported or just await sequence
            // Note: api.get returns { success, data }
            const balRes = await api.get('/wallet/balance');
            setBalance(balRes.data.balance);
            const txRes = await api.get('/wallet/transactions');
            setTransactions(txRes.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onTopup = async () => {
        setError(null);
        setSuccess(null);
        try {
            await api.post('/wallet/topup', { amount });
            setSuccess('Credits added successfully!');
            fetchData(); // Reload
        } catch (err) {
            setError(err);
        }
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={fetchData} />;

    return (
        <div>
            <h1>Founder Wallet</h1>

            {success && (
                <div style={{
                    backgroundColor: '#E6F4EA',
                    border: '1px solid #A8D5BA',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    color: '#1E6F3E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <strong>Success!</strong>
                        <div>{success}</div>
                    </div>
                </div>
            )}

            {error && (
                <div style={{ marginBottom: '20px' }}>
                    <ErrorState error={error} />
                </div>
            )}

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div className="card" style={{ flex: 1, textAlign: 'center', background: '#e3f2fd' }}>
                    <h3>Current Balance</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{balance}</div>
                    <p>Credits</p>
                </div>
                <div className="card" style={{ flex: 1 }}>
                    <h3>Buy Credits</h3>
                    <p>1 Credit = 1 Qualified Visitor</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ padding: '8px' }} />
                        <button onClick={onTopup} className="btn btn-primary">Add Credits</button>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>Transaction History</h3>
                {transactions.length === 0 ? <p>No transactions yet.</p> : (
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr style={{ textAlign: 'left' }}>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{new Date(tx.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '10px' }}>{tx.reason}</td>
                                    <td style={{ padding: '10px', color: tx.amount > 0 ? 'green' : 'red' }}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Wallet;
