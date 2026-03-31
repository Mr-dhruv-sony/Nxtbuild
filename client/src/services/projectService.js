import api from './api.js';

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data.data;
};

export const createProject = async (title) => {
  const response = await api.post('/projects', { title });
  return response.data.data;
};

export const updateProject = async (id, updates) => {
  const response = await api.put(`/projects/${id}`, updates);
  return response.data.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const restoreProjectVersion = async (id, versionIndex) => {
  const response = await api.post(`/projects/${id}/restore`, { versionIndex });
  return response.data.data;
};

export const createProjectShareLink = async (id) => {
  const response = await api.post(`/projects/${id}/share`, {});
  return response.data.data;
};

export const getSharedProject = async (shareToken) => {
  const response = await api.get(`/share/${shareToken}`);
  return response.data.data;
};
