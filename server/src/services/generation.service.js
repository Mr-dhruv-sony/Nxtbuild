import { askGemini } from './gemini.service.js';
import { getProjectById } from './project.service.js';
import { buildGenerationPrompt } from '../constants/prompts.js';
import { parseGenerationResponse } from '../utils/code.utils.js';
import Project from '../models/Project.model.js';

export const generateCode = async (projectId, userId, userPrompt) => {
  const project = await getProjectById(projectId, userId);

  const fullPrompt = buildGenerationPrompt(
    project.messages,
    project.generatedCode,
    userPrompt
  );

  const aiResponse = await askGemini(fullPrompt);
  const { code, description } = parseGenerationResponse(aiResponse);

  project.messages.push({ role: 'user', content: userPrompt });
  project.messages.push({ role: 'assistant', content: description || 'Here is your generated app!' });

  if (project.generatedCode) {
    project.versions.push({ code: project.generatedCode });
  }

  if (code) project.generatedCode = code;

  if (project.messages.length === 2) {
    project.title = userPrompt.slice(0, 50);
  }

  await project.save();

  return {
    message: description || 'Here is your generated app!',
    code: project.generatedCode,
    project,
  };
};