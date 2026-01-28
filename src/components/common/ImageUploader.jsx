import React, { useState } from 'react';
import api from '../../utils/api';

const ImageUploader = ({ label, onUpload, type = 'product_logo', currentUrl = '' }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentUrl);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Frontend validation
        if (file.size > 3 * 1024 * 1024) {
            setError('File too large (Max 3MB)');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        setUploading(true);
        setError(null);

        try {
            const res = await api.post('/uploads/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const { url, key } = res.data.data;
                setPreview(url);
                onUpload({ url, key }); // Pass object instead of just url
            }
        } catch (err) {
            console.error('Upload failed', err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{label}</label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Preview Box */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    border: '1px dashed #ccc',
                    background: '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {uploading ? (
                        <div className="spinner"></div> // Use CSS spinner class if available, or text
                    ) : preview ? (
                        <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: '24px', color: '#ccc' }}>+</span>
                    )}
                </div>

                {/* File Input */}
                <div>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                        disabled={uploading}
                        style={{ display: 'block', marginBottom: '4px' }}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        Max 3MB (JPG, PNG, WEBP)
                    </div>
                    {error && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
