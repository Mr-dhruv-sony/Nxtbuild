import * as projectService from '../services/project.service.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getUserProjects(req.user._id);
    return res.json({ success: true, data: projects });
  } catch (error) { next(error); }
};

export const createProject = async (req, res, next) => {
  try {
    const { title } = req.body;
    const project = await projectService.createProject(
      req.user._id,
      title || 'Untitled Project'
    );
    return res.status(201).json({ success: true, data: project });
  } catch (error) { next(error); }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user._id);
    return res.json({ success: true, data: project });
  } catch (error) { next(error); }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.user._id,
      req.body
    );
    return res.json({ success: true, data: project });
  } catch (error) { next(error); }
};

export const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id, req.user._id);
    return res.json({ success: true, message: 'Project deleted.' });
  } catch (error) { next(error); }
};

export const restoreProjectVersion = async (req, res, next) => {
  try {
    const { versionIndex } = req.body;
    const project = await projectService.restoreProjectVersion(
      req.params.id,
      req.user._id,
      versionIndex
    );
    return res.json({ success: true, data: project });
  } catch (error) { next(error); }
};

export const createProjectShareLink = async (req, res, next) => {
  try {
    const project = await projectService.createPublicShare(req.params.id, req.user._id);
    return res.json({
      success: true,
      data: {
        shareToken: project.shareToken,
        isPublic: project.isPublic,
      },
    });
  } catch (error) { next(error); }
};
