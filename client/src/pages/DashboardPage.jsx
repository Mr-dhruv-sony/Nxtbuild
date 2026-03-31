import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { getProjects, createProject, deleteProject } from '../services/projectService.js';
import '../styles/dashboard.css';

const PROMPT_TEMPLATES = [
  {
    id: 'saas-landing',
    title: 'SaaS Landing Page',
    description: 'Hero, pricing, testimonials, FAQ, and strong CTA sections.',
    prompt: 'Create a polished SaaS landing page for a productivity startup with a hero section, product benefits, pricing cards, testimonials, FAQ, and a strong call to action.',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Responsive metrics dashboard with charts, filters, and activity feed.',
    prompt: 'Build a modern analytics dashboard UI with KPI cards, line and bar charts, a date filter, recent activity feed, and a responsive layout.',
  },
  {
    id: 'portfolio',
    title: 'Creative Portfolio',
    description: 'A personal site with project gallery and contact section.',
    prompt: 'Create a creative developer portfolio website with an intro section, featured projects grid, skills section, about area, and contact form.',
  },
];

function DashboardPage() {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => showToast('Failed to load projects.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleNewProject = async () => {
    try {
      const project = await createProject('Untitled Project');
      navigate(`/builder/${project._id}`);
    } catch {
      showToast('Failed to create project.', 'error');
    }
  };

  const handleUseTemplate = async (template) => {
    try {
      const project = await createProject(template.title);
      navigate(`/builder/${project._id}`, {
        state: {
          initialPrompt: template.prompt,
        },
      });
    } catch {
      showToast('Failed to start from template.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
      showToast('Project deleted.');
    } catch {
      showToast('Failed to delete project.', 'error');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Workspace</p>
          <h1 className="dashboard-title">Build faster with templates and saved projects</h1>
        </div>
        <button className="dashboard-new-btn" onClick={handleNewProject}>
          + New Project
        </button>
      </div>

      <section className="dashboard-template-section">
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-section-label">Prompt Templates</p>
            <h2>Start from a strong prompt instead of a blank page</h2>
          </div>
        </div>
        <div className="dashboard-template-grid">
          {PROMPT_TEMPLATES.map((template) => (
            <article key={template.id} className="dashboard-template-card">
              <p className="dashboard-template-kicker">Template</p>
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <button className="dashboard-template-btn" onClick={() => handleUseTemplate(template)}>
                Use Template
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="dashboard-projects-header">
        <div>
          <p className="dashboard-section-label">Projects</p>
          <h2>Your recent builds</h2>
        </div>
      </div>
      {loading ? (
        <div className="loading-state"><div className="spinner" /></div>
      ) : projects.length === 0 ? (
        <div className="dashboard-empty">
          <p className="dashboard-empty-icon">🚀</p>
          <h2>No projects yet</h2>
          <p>Create your first AI-powered web app!</p>
          <button className="dashboard-new-btn" onClick={handleNewProject}>
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {projects.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpen={(id) => navigate(`/builder/${id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
