import React, { useState } from 'react';
import api from '../../utils/api';

const ImageUploader = ({ label, onUpload, onUploadStart, onUploadEnd, type = 'product_logo', currentUrl = '' }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentUrl);
    const [error, setError] = useState(null);
    const fileInputRef = React.useRef(null);

    // Sync preview with currentUrl changes (e.g. for reusable components or resets)
    React.useEffect(() => {
        setPreview(currentUrl);
    }, [currentUrl]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Immediate Local Preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Frontend validation
        const MIN_SIZE = 5 * 1024; // 5KB
        const MAX_SIZE = 3 * 1024 * 1024; // 3MB

        if (file.size < MIN_SIZE) {
            setError('File too small (Min 5KB)');
            return;
        }

        if (file.size > MAX_SIZE) {
            setError('File too large (Max 3MB)');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        setUploading(true);
        if (onUploadStart) onUploadStart(); // Notify parent to block submit
        setError(null);

        try {
            const res = await api.post('/uploads/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.success) {
                const { url, key } = res.data;
                // setPreview(url); // Optional: update with remote URL or keep local
                onUpload({ url, key }); // Pass object instead of just url
            }
        } catch (err) {
            console.error('Upload failed', err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            if (onUploadEnd) onUploadEnd(); // Notify parent to unblock submit
        }
    };

    const handleClear = () => {
        // Clear local preview
        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        setError(null);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Notify parent that image is cleared (passing null/empty)
        // We do NOT delete from server (as per rules: orphan images allowed)
        onUpload({ url: '', key: '' });
    };

    // Cleanup object URL to avoid memory leaks
    React.useEffect(() => {
        return () => {
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

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

                {/* File Input & Controls */}
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                        disabled={uploading}
                        style={{ display: !preview ? 'block' : 'none', marginBottom: '4px' }}
                    />

                    {/* Show Remove button if preview exists */}
                    {preview && (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={uploading}
                                style={{
                                    background: '#fee2e2',
                                    color: '#b91c1c',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                            {uploading && <span style={{ fontSize: '0.8rem', color: '#666' }}>Uploading...</span>}
                        </div>
                    )}

                    {!preview && (
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            Max 3MB (JPG, PNG, WEBP)
                        </div>
                    )}

                    {error && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
