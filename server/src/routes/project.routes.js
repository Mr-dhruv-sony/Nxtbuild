import { Router } from 'express';
import {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  restoreProjectVersion,
  createProjectShareLink,
} from '../controllers/project.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();
router.use(authenticate);

router.get('/', getProjects);
router.post('/', createProject);
router.post('/:id/share', createProjectShareLink);
router.post('/:id/restore', restoreProjectVersion);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
