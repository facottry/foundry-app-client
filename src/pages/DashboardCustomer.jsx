import React from 'react';
import SEO from '../components/SEO';

const DashboardCustomer = () => {
    return (
        <div>
            <SEO title="Dashboard" noindex={true} />
            <h1>My Profile</h1>
            <div className="card">
                <p>Saved products feature coming soon.</p>
            </div>
        </div>
    );
};

export default DashboardCustomer;
