import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const NoteEditor = ({ initialContent, onSave, placeholder = "Add your notes here..." }) => {
    const [content, setContent] = useState(initialContent || '');
    const [lastSaved, setLastSaved] = useState(null);
    const [saving, setSaving] = useState(false);

    // Autosave logic
    const [debouncedContent] = useDebounce(content, 2000);

    const saveData = useCallback(async (text) => {
        if (text === initialContent && !lastSaved) return; // Don't save if unchanged initially
        setSaving(true);
        try {
            await onSave(text);
            setLastSaved(new Date());
        } catch (err) {
            console.error('Autosave failed', err);
        } finally {
            setSaving(false);
        }
    }, [initialContent, onSave, lastSaved]);

    useEffect(() => {
        if (debouncedContent !== initialContent) { // Only save if different from start (or previous save)
            // Simple check, real app might track dirty state better
            saveData(debouncedContent);
        }
    }, [debouncedContent, saveData, initialContent]);

    // Handle initial content updates (switching folders)
    useEffect(() => {
        setContent(initialContent || '');
    }, [initialContent]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: '#9ca3af' }}>
                <span>PERSONAL NOTES</span>
                <span>{saving ? 'Saving...' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()} ` : 'Autosave on'}</span>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                style={{
                    flex: 1,
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    resize: 'none',
                    fontFamily: 'inherit',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#fffbeb' // Slight yellow tint like a notepad
                }}
                onFocus={(e) => e.target.style.borderColor = '#fbbf24'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
        </div>
    );
};

export default NoteEditor;
