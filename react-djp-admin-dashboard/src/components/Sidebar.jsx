import React, { useState, useEffect } from 'react';
import TreeNode from './TreeNode';

const DEFAULT_FAVS = ['../frontend/url.md', '../docs/md-file/skill-artifact.md'];

export default function Sidebar({ onSelectFile, selectedPath }) {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFavorites = () => {
    const saved = localStorage.getItem('djpFavorites');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('djpFavorites', JSON.stringify(DEFAULT_FAVS));
    return DEFAULT_FAVS;
  };

  const fetchTree = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tree');
      if (res.ok) {
        const data = await res.json();
        
        // Inject favorites
        const favs = getFavorites();
        if (favs.length > 0) {
          const favChildren = favs.map(f => {
            const name = f.split('/').pop();
            return { name, type: "file", path: f, label: "Favorite" };
          });
          
          data.children.unshift({
            name: "⭐ Favorites",
            type: "folder",
            expanded: true,
            children: favChildren
          });
        }
        
        setTreeData(data);
      }
    } catch (e) {
      console.error('Failed to fetch tree', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📂 Workspace</h2>
      </div>
      <div className="tree-container">
        {loading && <div style={{padding: '1rem', color: 'var(--text-muted)'}}>Loading tree...</div>}
        {!loading && treeData && (
          <TreeNode 
            node={treeData} 
            onSelectFile={onSelectFile} 
            selectedPath={selectedPath} 
            refreshTree={fetchTree} 
          />
        )}
      </div>
    </aside>
  );
}
