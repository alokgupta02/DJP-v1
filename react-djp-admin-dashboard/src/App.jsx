import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MarkdownViewer from './components/MarkdownViewer'
import './index.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(() => {
    const saved = localStorage.getItem('lastOpenedFile');
    return saved ? JSON.parse(saved) : null;
  })
  
  const [favRefresh, setFavRefresh] = useState(0)

  useEffect(() => {
    const handleFavChange = () => setFavRefresh(prev => prev + 1);
    window.addEventListener('djpFavoritesChanged', handleFavChange);
    return () => window.removeEventListener('djpFavoritesChanged', handleFavChange);
  }, []);

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    if (file) {
      localStorage.setItem('lastOpenedFile', JSON.stringify(file));
    } else {
      localStorage.removeItem('lastOpenedFile');
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        key={favRefresh} // force re-render on fav change
        selectedPath={selectedFile?.path} 
        onSelectFile={handleSelectFile} 
      />
      
      <main className="main-content">
        {selectedFile ? (
          <MarkdownViewer file={selectedFile} />
        ) : (
          <div className="placeholder-viewer">
            <h2>Select a file from the sidebar to start</h2>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
