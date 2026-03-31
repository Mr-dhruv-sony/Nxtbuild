function ProjectCard({ project, onOpen, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="project-card">
      <div className="project-card-preview">
        {project.generatedCode ? (
          <iframe
            srcDoc={project.generatedCode}
            sandbox=""
            title="preview"
            className="project-card-iframe"
          />
        ) : (
          <div className="project-card-empty">No preview yet</div>
        )}
      </div>
      <div className="project-card-info">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-date">Updated {formatDate(project.updatedAt)}</p>
        <div className="project-card-actions">
          <button className="btn-open" onClick={() => onOpen(project._id)}>Open</button>
          <button className="btn-delete" onClick={() => onDelete(project._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;