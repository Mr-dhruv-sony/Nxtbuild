import Project from '../models/Project.model.js';
import crypto from 'crypto';

export const getUserProjects = async (userId) => {
  return await Project.find({ userId }).sort({ updatedAt: -1 });
};

export const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

export const createProject = async (userId, title) => {
  return await Project.create({ userId, title });
};

export const updateProject = async (projectId, userId, updates) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  const shouldVersionCurrentCode =
    typeof updates.generatedCode === 'string' &&
    updates.generatedCode !== project.generatedCode &&
    project.generatedCode;

  if (shouldVersionCurrentCode) {
    project.versions.push({ code: project.generatedCode });
  }

  Object.assign(project, updates);
  await project.save();

  return project;
};

export const restoreProjectVersion = async (projectId, userId, versionIndex) => {
  const project = await getProjectById(projectId, userId);

  if (!Number.isInteger(versionIndex) || versionIndex < 0 || versionIndex >= project.versions.length) {
    const error = new Error('Version not found.');
    error.statusCode = 404;
    throw error;
  }

  const versionToRestore = project.versions[versionIndex];

  if (project.generatedCode) {
    project.versions.push({ code: project.generatedCode });
  }

  project.generatedCode = versionToRestore.code;
  await project.save();

  return project;
};

export const createPublicShare = async (projectId, userId) => {
  const project = await getProjectById(projectId, userId);

  if (!project.shareToken) {
    project.shareToken = crypto.randomBytes(12).toString('hex');
  }

  project.isPublic = true;
  await project.save();

  return project;
};

export const getSharedProjectByToken = async (shareToken) => {
  const project = await Project.findOne({ shareToken, isPublic: true });
  if (!project) {
    const error = new Error('Shared project not found.');
    error.statusCode = 404;
    throw error;
  }

  return project;
};

export const deleteProject = async (projectId, userId) => {
  const project = await Project.findOneAndDelete({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }
  return project;
};
