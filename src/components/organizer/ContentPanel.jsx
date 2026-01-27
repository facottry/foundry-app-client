import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteEditor from '../common/NoteEditor';
import api from '../../utils/api';

const ContentPanel = ({ activeFolder, products, onUnsave, refreshNotesTrigger }) => {
    // If activeFolder is null, we show ALL saved products (root view)
    // If activeFolder is set, we show folder note + folder specific products (if we link them)
    // The current data model links SavedProduct -> folder_id.

    const [note, setNote] = useState('');
    const [loadingNote, setLoadingNote] = useState(false);

    useEffect(() => {
        if (!activeFolder) {
            setNote('');
            return;
        }

        const fetchNote = async () => {
            setLoadingNote(true);
            try {
                const res = await api.get(`/notes/folder/${activeFolder._id}`);
                setNote(res.data.note.content);
            } catch (err) {
                console.error(err);
                setNote('');
            } finally {
                setLoadingNote(false);
            }
        };
        fetchNote();
    }, [activeFolder, refreshNotesTrigger]);

    const handleSaveNote = async (text) => {
        if (!activeFolder) return;
        try {
            await api.put(`/notes/folder/${activeFolder._id}`, { content: text });
        } catch (err) {
            console.error(err);
        }
    };

    const displayProducts = activeFolder
        ? products.filter(p => p.folder_id === activeFolder._id)
        : products; // Or show only root? Usually "All Items" shows flat list or root items. 
    // Let's show ALL items in "All Saved Items" for easy search, 
    // and filtered items in specific folders.

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '24px' }}>
            {/* Header */}
            <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                    {activeFolder ? activeFolder.name : 'All Saved Items'}
                </h2>
                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {displayProducts.length} items
                </div>
            </div>

            {/* Folder Note (Only if specific folder selected) */}
            {activeFolder && (
                <div style={{ height: '200px', flexShrink: 0 }}>
                    {loadingNote ? <div>Loading note...</div> : (
                        <NoteEditor
                            initialContent={note}
                            onSave={handleSaveNote}
                            placeholder={`Notes for ${activeFolder.name}...`}
                        />
                    )}
                </div>
            )}

            {/* Product List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>Products</h3>

                {displayProducts.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>No products here.</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', paddingTop: '16px' }}>
                        {displayProducts.map(saved => (
                            <div key={saved._id} className="card" style={{ padding: '16px', position: 'relative' }}>
                                <button
                                    onClick={(e) => { e.preventDefault(); if (window.confirm('Remove from saved?')) onUnsave(saved.product_id._id); }}
                                    style={{ position: 'absolute', top: '8px', right: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9ca3af' }}
                                    title="Remove"
                                >
                                    ✕
                                </button>
                                <Link to={`/product/${saved.product_id._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ height: '40px', width: '40px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '12px' }}>
                                        {saved.product_id.logo_url && <img src={saved.product_id.logo_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />}
                                    </div>
                                    <div style={{ fontWeight: '600', marginBottom: '4px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{saved.product_id.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', height: '3em', overflow: 'hidden' }}>{saved.product_id.tagline}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentPanel;
