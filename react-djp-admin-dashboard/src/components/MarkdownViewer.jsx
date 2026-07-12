import React, { useState, useEffect } from 'react';
import { Star, Edit2, Code, Copy, Check, Save, X } from 'lucide-react';
import { renderSimpleMarkdown } from '../utils/markdownParser';

export default function MarkdownViewer({ file }) {
  const [content, setContent] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRawMode, setIsRawMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    checkFavStatus();
    fetchContent();
    setIsEditMode(false);
    setIsRawMode(false);
  }, [file?.path]);

  const checkFavStatus = () => {
    const favs = JSON.parse(localStorage.getItem('djpFavorites') || '[]');
    setIsFav(favs.includes(file.path));
  };

  const toggleFav = () => {
    let favs = JSON.parse(localStorage.getItem('djpFavorites') || '[]');
    if (isFav) {
      favs = favs.filter(f => f !== file.path);
    } else {
      favs.push(file.path);
    }
    localStorage.setItem('djpFavorites', JSON.stringify(favs));
    setIsFav(!isFav);
    // Note: the Sidebar needs to refresh to see this change, which requires lifting state or event.
    // For now, it will update on next refresh/load, or we can dispatch a custom event.
    window.dispatchEvent(new Event('djpFavoritesChanged'));
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/read?path=' + encodeURIComponent(file.path));
      let text = '';
      if (response.ok) {
        text = await response.text();
      } else {
        text = `# File Not Loaded\nCould not load \`${file.path}\`.`;
      }
      setContent(text);
      setEditContent(text);
    } catch (e) {
      setContent('Error loading content.');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldFilePath: file.path,
          newFilePath: file.path,
          content: editContent
        })
      });
      if (res.ok) {
        setContent(editContent);
        setIsEditMode(false);
      } else {
        alert('Failed to save file.');
      }
    } catch (e) {
      alert('Error saving file.');
    }
    setIsSaving(false);
  };

  if (!file) return null;

  return (
    <div className="md-card">
      <div className="md-card-header">
        <div className="md-title-group">
          <h2>
            <FileIcon type="file" /> {file.name}
            <span 
              className={`fav-star ${isFav ? 'active' : ''}`} 
              onClick={toggleFav}
              title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Star size={18} fill={isFav ? "var(--warning)" : "none"} color={isFav ? "var(--warning)" : "currentColor"} />
            </span>
          </h2>
          <span className="md-path-badge">{file.path}</span>
        </div>
        
        <div className="md-controls">
          {!isEditMode && (
            <button className="btn" onClick={() => setIsEditMode(true)}>
              <Edit2 size={14} /> Edit File
            </button>
          )}
          {isEditMode && (
            <>
              <button className="btn" onClick={() => setIsEditMode(false)}>
                <X size={14} /> Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                <Save size={14} /> {isSaving ? 'Saving...' : 'Save'}
              </button>
            </>
          )}
          
          <button className={`btn ${isRawMode ? 'active' : ''}`} onClick={() => setIsRawMode(!isRawMode)}>
            <Code size={14} /> Raw MD
          </button>
          
          <button className="btn" onClick={handleCopy}>
            {copied ? <Check size={14} color="var(--primary)" /> : <Copy size={14} />} 
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="md-card-body">
        {loading ? (
          <div className="loading-state">Loading markdown...</div>
        ) : isEditMode ? (
          <textarea 
            className="md-textarea" 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            spellCheck="false"
          />
        ) : isRawMode ? (
          <pre className="md-raw-view">{content}</pre>
        ) : (
          <div 
            className="md-visual-view" 
            dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(content) }} 
          />
        )}
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--primary)'}}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
