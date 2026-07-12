import React, { useState } from 'react';
import { 
  Folder, FolderOpen, FileText, ChevronRight, ChevronDown, 
  Plus, Edit2, Trash2, Check, X 
} from 'lucide-react';

export default function TreeNode({ 
  node, depth = 0, onSelectFile, selectedPath, refreshTree
}) {
  const [expanded, setExpanded] = useState(node.expanded || false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCreating, setIsCreating] = useState(null); // 'file' or 'folder'
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');

  const isFolder = node.type === 'folder';
  const isSelected = selectedPath === node.path;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isFolder) setExpanded(!expanded);
    else onSelectFile(node);
  };

  const handleCreate = async (e, type) => {
    e.stopPropagation();
    if (!isFolder) return;
    setIsCreating(type);
    setExpanded(true);
    setNewName('');
  };

  const submitCreate = async () => {
    if (!newName.trim()) {
      setIsCreating(null);
      return;
    }
    try {
      const parentPath = node.name === "Root Workspace" ? '' : node.path || node.name; 
      // If node.path is something like '../docs', the new path should be '../docs/newName'
      // If it's Root Workspace, we just pass the new name.
      const prefix = (node.name === "Root Workspace" || !node.path) ? '../' : node.path + '/';
      const finalPath = prefix + newName + (isCreating === 'file' && !newName.endsWith('.md') ? '.md' : '');
      
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: finalPath, isFolder: isCreating === 'folder' })
      });
      if (res.ok) {
        setIsCreating(null);
        refreshTree();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create');
      }
    } catch (e) {
      alert('Error creating');
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
    setNewName(node.name);
  };

  const submitRename = async () => {
    if (!newName.trim() || newName === node.name) {
      setIsRenaming(false);
      return;
    }
    try {
      // API expects /api/save to handle rename. We send oldFilePath and newFilePath
      const dirPath = node.path.substring(0, node.path.lastIndexOf('/'));
      const newPath = dirPath + '/' + newName + (node.type === 'file' && !newName.endsWith('.md') ? '.md' : '');
      
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldFilePath: node.path, newFilePath: newPath, content: '' }) // Content is empty for rename, backend handles it
      });
      
      if (res.ok) {
        setIsRenaming(false);
        refreshTree();
      } else {
        alert('Failed to rename');
      }
    } catch (e) {
      alert('Error renaming');
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete ${node.name}?`)) return;
    
    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: node.path })
      });
      if (res.ok) refreshTree();
      else alert('Failed to delete');
    } catch (e) {
      alert('Error deleting');
    }
  };

  return (
    <div className="tree-node">
      <div 
        className={`tree-item ${isSelected ? 'active' : ''} ${isFolder ? 'folder' : 'file'}`}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="tree-item-content">
          {isFolder ? (
            expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : (
            <span style={{width: 16}}></span>
          )}
          
          {isFolder ? (
            expanded ? <FolderOpen size={16} className="icon-folder" /> : <Folder size={16} className="icon-folder" />
          ) : (
            <FileText size={16} className="icon-file" />
          )}

          {isRenaming ? (
            <div className="inline-edit" onClick={e => e.stopPropagation()}>
              <input 
                autoFocus
                value={newName} 
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitRename()}
              />
              <Check size={14} className="action-icon success" onClick={submitRename} />
              <X size={14} className="action-icon danger" onClick={() => setIsRenaming(false)} />
            </div>
          ) : (
            <span className="tree-name">{node.name}</span>
          )}
        </div>

        {/* Hover Actions */}
        {isHovered && !isRenaming && node.name !== "Root Workspace" && node.name !== "⭐ Favorites" && (
          <div className="tree-actions" onClick={e => e.stopPropagation()}>
            {isFolder && (
              <>
                <Plus size={14} className="action-icon" title="New File" onClick={(e) => handleCreate(e, 'file')} />
                <Folder size={14} className="action-icon" title="New Folder" onClick={(e) => handleCreate(e, 'folder')} />
              </>
            )}
            <Edit2 size={14} className="action-icon" title="Rename" onClick={handleRename} />
            <Trash2 size={14} className="action-icon danger" title="Delete" onClick={handleDelete} />
          </div>
        )}
        
        {isHovered && node.name === "Root Workspace" && (
           <div className="tree-actions" onClick={e => e.stopPropagation()}>
             <Plus size={14} className="action-icon" title="New File" onClick={(e) => handleCreate(e, 'file')} />
             <Folder size={14} className="action-icon" title="New Folder" onClick={(e) => handleCreate(e, 'folder')} />
           </div>
        )}
      </div>

      {/* Inline Create Input */}
      {isCreating && expanded && (
        <div className="tree-item inline-create" style={{ paddingLeft: `${(depth + 1) * 1.5 + 0.5}rem` }}>
          {isCreating === 'folder' ? <Folder size={16} className="icon-folder" /> : <FileText size={16} className="icon-file" />}
          <div className="inline-edit">
            <input 
              autoFocus
              placeholder={isCreating === 'folder' ? 'Folder name...' : 'Filename...'}
              value={newName} 
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitCreate()}
            />
            <Check size={14} className="action-icon success" onClick={submitCreate} />
            <X size={14} className="action-icon danger" onClick={() => setIsCreating(null)} />
          </div>
        </div>
      )}

      {/* Children */}
      {expanded && node.children && (
        <div className="tree-children">
          {node.children.map((child, idx) => (
            <TreeNode 
              key={child.path || child.name + idx} 
              node={child} 
              depth={depth + 1} 
              onSelectFile={onSelectFile}
              selectedPath={selectedPath}
              refreshTree={refreshTree}
            />
          ))}
        </div>
      )}
    </div>
  );
}
