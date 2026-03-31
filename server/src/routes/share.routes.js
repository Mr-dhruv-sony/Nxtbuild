import { Router } from 'express';
import { getSharedProjectByToken } from '../services/project.service.js';

const router = Router();

// Get shared project (public)
router.get('/:shareToken', async (req, res, next) => {
  try {
    const project = await getSharedProjectByToken(req.params.shareToken);
    res.json({
      success: true,
      data: {
        code: project.generatedCode,
        title: project.title,
        updatedAt: project.updatedAt,
      },
    });
  } catch (error) { next(error); }
});

export default router;
