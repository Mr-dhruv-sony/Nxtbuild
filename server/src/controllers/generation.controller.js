import * as generationService from '../services/generation.service.js';

export const generateCode = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please describe what you want to build.',
      });
    }

    const data = await generationService.generateCode(
      projectId,
      req.user._id,
      prompt.trim()
    );

    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};