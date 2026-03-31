import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedProject } from '../services/projectService.js';

function SharedPage() {
  const { shareToken } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSharedProject(shareToken)
      .then(setProject)
      .catch(() => setError(true));
  }, [shareToken]);

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#9ca3af', flexDirection: 'column', gap: 16, background: '#0f0e17' }}>
      <p style={{ fontSize: 48 }}>😕</p>
      <p style={{ fontSize: 20 }}>This shared project doesn't exist or has been removed.</p>
    </div>
  );

  if (!project) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0e17' }}>
      <div className="spinner" />
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0e17' }}>
      <div style={{ padding: '12px 24px', background: '#1a1825', borderBottom: '1px solid #2d2b3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: 18 }}>⚡ NxtBuild</span>
        <span style={{ color: '#e2e8f0', fontSize: 15 }}>{project.title}</span>
        <a href="/" style={{ color: '#7c3aed', fontSize: 13, textDecoration: 'none' }}>Build your own →</a>
      </div>
      <iframe
        srcDoc={project.code}
        sandbox="allow-scripts"
        style={{ flex: 1, border: 'none', background: 'white' }}
        title={project.title}
      />
    </div>
  );
}

export default SharedPage;
