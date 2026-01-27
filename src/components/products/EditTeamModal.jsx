import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const EditTeamModal = ({ product, onClose, onSave }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product && product.team_members) {
            setMembers(product.team_members);
        }
    }, [product]);

    const handleAddMember = () => {
        setMembers([...members, { name: '', title: '', role_type: 'member', avatar_url: '', linkedin_url: '' }]);
    };

    const handleRemoveMember = (index) => {
        const newMembers = [...members];
        newMembers.splice(index, 1);
        setMembers(newMembers);
    };

    const handleChange = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await api.put(`/products/${product._id}`, { team_members: members });
            onSave(res.data);
            onClose();
        } catch (err) {
            alert('Failed to save team');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Edit Team: {product.name}</h2>

                <div style={{ marginBottom: '24px' }}>
                    {members.map((member, index) => (
                        <div key={index} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', background: member.role_type === 'founder' ? '#eff6ff' : 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#6b7280' }}>
                                    {member.role_type === 'founder' ? '👑 FOUNDER' : `MEMBER #${index + 1}`}
                                </span>
                                {member.role_type !== 'founder' && (
                                    <button onClick={() => handleRemoveMember(index)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#374151', marginBottom: '4px' }}>Name</label>
                                    <input
                                        type="text"
                                        value={member.name || ''}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        disabled={member.role_type === 'founder' && member.user_id} // Lock founder name if mapped to user? Optional.
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#374151', marginBottom: '4px' }}>Title</label>
                                    <input
                                        type="text"
                                        value={member.title || ''}
                                        onChange={(e) => handleChange(index, 'title', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#374151', marginBottom: '4px' }}>Avatar URL</label>
                                    <input
                                        type="text"
                                        value={member.avatar_url || ''}
                                        onChange={(e) => handleChange(index, 'avatar_url', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#374151', marginBottom: '4px' }}>LinkedIn URL</label>
                                    <input
                                        type="text"
                                        value={member.linkedin_url || ''}
                                        onChange={(e) => handleChange(index, 'linkedin_url', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={handleAddMember} className="btn" style={{ width: '100%', border: '1px dashed #d1d5db', background: '#f9fafb', color: '#6b7280' }}>
                        + Add Team Member
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                    <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTeamModal;
