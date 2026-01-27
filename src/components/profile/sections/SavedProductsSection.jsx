import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import FolderTree from '../../organizer/FolderTree';
import ContentPanel from '../../organizer/ContentPanel';

const SavedProductsSection = () => {
    const [folders, setFolders] = useState([]);
    const [savedProducts, setSavedProducts] = useState([]);
    const [activeFolder, setActiveFolder] = useState(null);
    const [loading, setLoading] = useState(true);

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
    }, []);

    const handleCreateFolder = async (name, parentId) => {
        try {
            const res = await api.post('/saved/folders', { name, parent_folder_id: parentId });
            setFolders([...folders, res.data.folder]);
        } catch (err) {
            alert('Failed to create folder');
        }
    };

    const handleDeleteFolder = async (id) => {
        try {
            await api.delete(`/saved/folders/${id}`);
            setFolders(folders.filter(f => f._id !== id)); // Simple local update (doesn't handle cascade child removal from UI perfectly, refresh recommended or sophisticated recursion)
            // For robust UI, reload data
            fetchData();
            if (activeFolder && activeFolder._id === id) setActiveFolder(null); // Reset selection
        } catch (err) {
            alert('Failed to delete folder');
        }
    };

    const handleUnsaveProduct = async (productId) => {
        try {
            await api.delete(`/saved/products/${productId}`);
            setSavedProducts(savedProducts.filter(p => p.product_id._id !== productId));
        } catch (err) {
            alert('Failed to unsave product');
        }
    };

    if (loading) return <div>Loading organizer...</div>;

    return (
        <div style={{ height: '700px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
            {/* Left Sidebar */}
            <div style={{ width: '280px', borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <FolderTree
                    folders={folders}
                    activeFolder={activeFolder}
                    onSelect={setActiveFolder}
                    onCreate={handleCreateFolder}
                    onDelete={handleDeleteFolder}
                />
            </div>

            {/* Right Content */}
            <div style={{ flex: 1, padding: '32px', overflow: 'hidden' }}>
                <ContentPanel
                    activeFolder={activeFolder}
                    products={savedProducts}
                    onUnsave={handleUnsaveProduct}
                />
            </div>
        </div>
    );
};

export default SavedProductsSection;
