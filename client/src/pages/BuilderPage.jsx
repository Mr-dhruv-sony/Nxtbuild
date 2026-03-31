import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreview from '../components/LivePreview.jsx';
import {
  getProject,
  updateProject,
  restoreProjectVersion,
  createProjectShareLink,
} from '../services/projectService.js';
import { generateCode } from '../services/generationService.js';
import '../styles/builder.css';

function BuilderPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useContext(ToastContext);

  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [title, setTitle] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [versions, setVersions] = useState([]);
  const [sharing, setSharing] = useState(false);
  const [restoringIndex, setRestoringIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const templatePromptStartedRef = useRef(false);

  useEffect(() => {
    getProject(projectId)
      .then((p) => {
        setProject(p);
        setMessages(p.messages || []);
        setCode(p.generatedCode || '');
        setTitle(p.title || 'Untitled Project');
        setVersions(p.versions || []);
      })
      .catch(() => {
        showToast('Project not found.', 'error');
        navigate('/dashboard');
      });
  }, [projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const templatePrompt = location.state?.initialPrompt;
    if (!project || !templatePrompt || templatePromptStartedRef.current || project.messages?.length > 0) {
      return;
    }

    templatePromptStartedRef.current = true;
    handleSend(templatePrompt);
    navigate(location.pathname, { replace: true, state: {} });
  }, [project, location.state, location.pathname]);

  const handleSend = async (prompt) => {
    setMessages(prev => [...prev, { role: 'user', content: prompt, timestamp: new Date() }]);
    setLoading(true);
    try {
      const data = await generateCode(projectId, prompt);
      setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }]);
      setVersions(data.project.versions || []);
      setCode(data.code);
      setTitle(data.project.title);
      setProject(data.project);
      setActiveTab('preview');
    } catch {
      setMessages(prev => prev.slice(0, -1));
      showToast('Failed to generate code.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSave = async () => {
    try {
      await updateProject(projectId, { title });
      setEditingTitle(false);
      showToast('Title updated!');
    } catch {
      showToast('Failed to update title.', 'error');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreVersion = async (versionIndex) => {
    setRestoringIndex(versionIndex);
    try {
      const updatedProject = await restoreProjectVersion(projectId, versionIndex);
      setProject(updatedProject);
      setCode(updatedProject.generatedCode || '');
      setVersions(updatedProject.versions || []);
      setActiveTab('preview');
      setShowVersions(false);
      showToast('Previous version restored.');
    } catch {
      showToast('Failed to restore version.', 'error');
    } finally {
      setRestoringIndex(null);
    }
  };

  const handleSaveCode = async () => {
    try {
      const updatedProject = await updateProject(projectId, { generatedCode: code, title });
      setProject(updatedProject);
      setVersions(updatedProject.versions || []);
      showToast('Code saved.');
    } catch {
      showToast('Failed to save code.', 'error');
    }
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      const shared = await createProjectShareLink(projectId);
      const shareUrl = `${window.location.origin}/share/${shared.shareToken}`;
      await navigator.clipboard.writeText(shareUrl);
      setProject((prev) => prev ? { ...prev, isPublic: true, shareToken: shared.shareToken } : prev);
      showToast('Public URL copied to clipboard.');
    } catch {
      showToast('Failed to create share link.', 'error');
    } finally {
      setSharing(false);
    }
  };

  const formatVersionDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const examplePrompts = [
    'Build a to-do list app',
    'Create a personal portfolio page',
    'Make a weather dashboard UI',
    'Build a quiz app with 5 questions',
  ];

  return (
    <div className="builder-page">
      <div className="builder-left">
        <div className="builder-chat-header">
          {editingTitle ? (
            <div className="title-edit">
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
              <button onClick={handleTitleSave}>Save</button>
              <button onClick={() => setEditingTitle(false)}>Cancel</button>
            </div>
          ) : (
            <h2 className="builder-title" onClick={() => setEditingTitle(true)}>
              {title} ✏️
            </h2>
          )}
        </div>

        <div className="builder-messages">
          {messages.length === 0 ? (
            <div className="builder-empty">
              <p>👋 What do you want to build today?</p>
              <div className="example-prompts">
                {examplePrompts.map((p) => (
                  <button key={p} className="example-prompt-chip" onClick={() => handleSend(p)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => <ChatMessage key={i} message={msg} />)
          )}
          {loading && (
            <div className="chat-message chat-message-ai">
              <div className="chat-bubble">
                <p>⚡ Generating your app...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={handleSend} loading={loading} disabled={false} />
      </div>

      <div className="builder-right">
        <div className="builder-tabs">
          <button
            className={`builder-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`builder-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
          {versions.length > 0 && (
            <button
              className={`builder-tab ${showVersions ? 'active' : ''}`}
              onClick={() => setShowVersions(!showVersions)}
            >
              🕐 History ({versions.length})
            </button>
          )}
          {code && (
            <button className="builder-action-btn" onClick={handleSaveCode}>
              Save Code
            </button>
          )}
          {project && (
            <button className="builder-action-btn" onClick={handleShare} disabled={sharing}>
              {sharing ? 'Sharing...' : 'Share URL'}
            </button>
          )}
          {code && (
            <button className="builder-download" onClick={handleDownload}>
              Download
            </button>
          )}
        </div>

        <div className="builder-content">
          {showVersions ? (
            <div className="versions-panel">
              <h3 className="versions-title">Version History</h3>
              <p className="versions-subtitle">Click a version to restore it</p>
              <div className="versions-list">
                <div className="version-item version-item-current">
                  <div className="version-info">
                    <span className="version-label">Current Version</span>
                    <span className="version-badge">Latest</span>
                  </div>
                  <iframe
                    srcDoc={code}
                    sandbox=""
                    className="version-preview"
                    title="current"
                  />
                </div>
                {[...versions].reverse().map((version, i) => {
                  const actualIndex = versions.length - 1 - i;
                  return (
                  <div key={`${version.createdAt}-${actualIndex}`} className="version-item">
                    <div className="version-info">
                      <span className="version-label">
                        Version {actualIndex + 1}
                      </span>
                      <span className="version-date">
                        {formatVersionDate(version.createdAt)}
                      </span>
                    </div>
                    <iframe
                      srcDoc={version.code}
                      sandbox=""
                      className="version-preview"
                      title={`version-${i}`}
                    />
                    <button
                      className="version-restore-btn"
                      onClick={() => handleRestoreVersion(actualIndex)}
                      disabled={restoringIndex === actualIndex}
                    >
                      {restoringIndex === actualIndex ? 'Restoring...' : 'Restore this version'}
                    </button>
                  </div>
                )})}
              </div>
            </div>
          ) : activeTab === 'preview' ? (
            <LivePreview code={code} />
          ) : (
            <CodeEditor code={code} onChange={setCode} readOnly={false} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
