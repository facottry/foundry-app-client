import React, { useState } from 'react';

const FolderTree = ({ folders, activeFolder, onSelect, onCreate, onRename, onDelete, onDrop }) => {
    const [expanded, setExpanded] = useState({});
    const [newFolderName, setNewFolderName] = useState('');
    const [creatingIn, setCreatingIn] = useState(null); // folderId or 'root'

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCreate = async (parentId) => {
        if (!newFolderName.trim()) {
            setCreatingIn(null);
            return;
        }
        await onCreate(newFolderName, parentId);
        setNewFolderName('');
        setCreatingIn(null);
    };

    const renderTree = (parentId = null, depth = 0) => {
        const children = folders.filter(f => f.parent_folder_id === parentId);

        return (
            <div style={{ marginLeft: depth * 12 }}>
                {children.map(folder => {
                    const isExpanded = expanded[folder._id];
                    const isActive = activeFolder?._id === folder._id;
                    const hasChildren = folders.some(f => f.parent_folder_id === folder._id);

                    return (
                        <div key={folder._id}>
                            <div
                                onClick={() => onSelect(folder)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px',
                                    borderRadius: '6px', cursor: 'pointer',
                                    background: isActive ? '#e0f2fe' : 'transparent',
                                    color: isActive ? '#0369a1' : '#374151',
                                    border: '2px solid transparent' // Placeholder for drag highlight
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                    e.currentTarget.style.background = '#eff6ff';
                                }}
                                onDragLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'transparent';
                                    e.currentTarget.style.background = isActive ? '#e0f2fe' : 'transparent';
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.style.borderColor = 'transparent';
                                    e.currentTarget.style.background = isActive ? '#e0f2fe' : 'transparent';
                                    const productId = e.dataTransfer.getData('productId');
                                    if (productId) onDrop(productId, folder._id);
                                }}
                            >
                                <span
                                    onClick={(e) => { e.stopPropagation(); toggleExpand(folder._id); }}
                                    style={{ width: '16px', textAlign: 'center', cursor: 'pointer', visibility: hasChildren ? 'visible' : 'hidden' }}
                                >
                                    {isExpanded ? '▼' : '▶'}
                                </span>
                                <span style={{ fontSize: '1.2rem' }}>{isActive ? '📂' : '📁'}</span>
                                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{folder.name}</span>

                                {isActive && (
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button title="New Subfolder" onClick={(e) => { e.stopPropagation(); setCreatingIn(folder._id); setExpanded(prev => ({ ...prev, [folder._id]: true })); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>➕</button>
                                        <button title="Delete" onClick={(e) => { e.stopPropagation(); if (window.confirm('Delete folder?')) onDelete(folder._id); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}>🗑️</button>
                                    </div>
                                )}
                            </div>

                            {isExpanded && (
                                <div>
                                    {renderTree(folder._id, depth + 1)}
                                    {creatingIn === folder._id && (
                                        <div style={{ marginLeft: (depth + 1) * 12 + 24, padding: '4px' }}>
                                            <input
                                                autoFocus
                                                value={newFolderName}
                                                onChange={(e) => setNewFolderName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleCreate(folder._id)}
                                                onBlur={() => handleCreate(folder._id)}
                                                placeholder="Folder Name"
                                                style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600' }}>Folders</span>
                <button onClick={() => setCreatingIn('root')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }} title="New Root Folder">➕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                <div
                    onClick={() => onSelect(null)} // Select Root
                    style={{
                        padding: '8px', borderRadius: '6px', cursor: 'pointer', marginBottom: '8px',
                        background: !activeFolder ? '#e0f2fe' : 'transparent',
                        fontWeight: !activeFolder ? '600' : 'normal',
                        color: !activeFolder ? '#0369a1' : '#374151',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        border: '2px solid transparent'
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#3b82f6';
                    }}
                    onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = 'transparent';
                        const productId = e.dataTransfer.getData('productId');
                        if (productId) onDrop(productId, null); // Null for root
                    }}
                >
                    <span>🏠</span> All Saved Items
                </div>

                {creatingIn === 'root' && (
                    <div style={{ padding: '4px 8px', marginBottom: '8px' }}>
                        <input
                            autoFocus
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreate(null)}
                            onBlur={() => handleCreate(null)}
                            placeholder="Folder Name"
                            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                )}

                {renderTree(null)}
            </div>
        </div>
    );
};

export default FolderTree;
