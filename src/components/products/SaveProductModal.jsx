import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const SaveProductModal = ({ productId, onClose, onShowToast }) => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(''); // Empty = root
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const res = await api.get('/saved/folders');
                setFolders(res.data.folders);
            } catch (err) {
                console.error('Failed to load folders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFolders();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.post('/saved/products', {
                product_id: productId,
                folder_id: selectedFolder || null
            });
            onShowToast('Product saved successfully!', 'success');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to save product');
        } finally {
            setSaving(false);
        }
    };

    const handleUnsave = async () => {
        if (!window.confirm('Remove this product from your saved items?')) return;
        setSaving(true);
        try {
            await api.delete(`/saved/products/${productId}`);
            onShowToast('Product removed from saved items.', 'error');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to remove product');
        } finally {
            setSaving(false);
        }
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        try {
            const res = await api.post('/saved/folders', { name: newFolderName });
            setFolders([...folders, res.data.folder]);
            setSelectedFolder(res.data.folder._id); // Auto select new folder
            setNewFolderName('');
        } catch (err) {
            alert('Failed to create folder');
        }
    };

    // Flatten folders for select (simple indentation) - simple list for modal
    const renderFolderOptions = (parentId = null, depth = 0) => {
        const children = folders.filter(f => f.parent_folder_id === parentId);
        return children.map(folder => (
            <React.Fragment key={folder._id}>
                <option value={folder._id}>
                    {'\u00A0'.repeat(depth * 3)}📁 {folder.name}
                </option>
                {renderFolderOptions(folder._id, depth + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="card" style={{ width: '400px', padding: '24px', background: 'white' }}>
                <h3 style={{ marginTop: 0 }}>Save to Folder</h3>

                {loading ? <div>Loading folders...</div> : (
                    <>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Select Folder</label>
                            <select
                                value={selectedFolder}
                                onChange={(e) => setSelectedFolder(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                            >
                                <option value="">📂 All Saved Items (Root)</option>
                                {renderFolderOptions(null)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
                            <input
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="Or create new folder..."
                                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                            />
                            <button onClick={handleCreateFolder} className="btn" style={{ padding: '8px 12px' }}>+</button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button onClick={handleUnsave} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', textDecoration: 'underline' }}>
                                Remove from Saved
                            </button>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>Cancel</button>
                                <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Product'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SaveProductModal;
