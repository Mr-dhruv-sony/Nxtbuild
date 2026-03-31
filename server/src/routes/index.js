import { Router } from 'express';
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import generationRoutes from './generation.routes.js';
import shareRoutes from './share.routes.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/generate', generationRoutes);
router.use('/share', shareRoutes);

export default router;