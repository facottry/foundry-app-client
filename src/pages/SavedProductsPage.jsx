import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import FolderTree from '../components/organizer/FolderTree';
import ContentPanel from '../components/organizer/ContentPanel';

const SavedProductsPage = () => {
    const [folders, setFolders] = useState([]);
    const [savedProducts, setSavedProducts] = useState([]);
    const [activeFolder, setActiveFolder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchData = async () => {
        try {
            const [foldersRes, productsRes] = await Promise.all([
                api.get('/saved/folders'),
                api.get('/saved/products')
            ]);
            setFolders(foldersRes.data.folders);
            setSavedProducts(productsRes.data.saved_products);
        } catch (err) {
            console.error('Failed to load organizer data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    const handleCreateFolder = async (name, parentId) => {
        try {
            await api.post('/saved/folders', { name, parent_folder_id: parentId });
            setRefreshTrigger(prev => prev + 1); // Refresh to get correct ID and structure
        } catch (err) {
            alert('Failed to create folder');
        }
    };

    const handleDeleteFolder = async (id) => {
        try {
            await api.delete(`/saved/folders/${id}`);
            if (activeFolder && activeFolder._id === id) setActiveFolder(null); // Reset selection
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            alert('Failed to delete folder');
        }
    };

    const handleUnsaveProduct = async (productId) => {
        try {
            await api.delete(`/saved/products/${productId}`);
            setSavedProducts(prev => prev.filter(p => p.product_id._id !== productId));
        } catch (err) {
            console.error('Failed to unsave', err);
        }
    };

    const handleDropProduct = async (productId, folderId) => {
        try {
            // Update on backend
            await api.post('/saved/products', { product_id: productId, folder_id: folderId });
            // Refresh to see change (simple way)
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Failed to move product', err);
        }
    };

    if (loading) return (
        <div style={{ padding: '80px', textAlign: 'center', color: '#6b7280' }}>
            Loading organizer...
        </div>
    );

    return (
        <div className="container" style={{ padding: '20px 0', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>Knowledge Organizer</h1>

            <div style={{ flex: 1, display: 'flex', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', background: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                {/* Left Sidebar */}
                <div style={{ width: '300px', borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    <FolderTree
                        folders={folders}
                        activeFolder={activeFolder}
                        onSelect={setActiveFolder}
                        onCreate={handleCreateFolder}
                        onDelete={handleDeleteFolder}
                        onDrop={handleDropProduct}
                    />
                </div>

                {/* Right Content */}
                <div style={{ flex: 1, padding: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <ContentPanel
                        activeFolder={activeFolder}
                        products={savedProducts}
                        onUnsave={handleUnsaveProduct}
                    />
                </div>
            </div>
        </div>
    );
};

export default SavedProductsPage;
