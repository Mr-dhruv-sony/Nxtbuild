export const SYSTEM_PROMPT = `You are an expert web developer AI assistant. Users describe web applications they want, and you generate complete, working code.

RULES:
1. Generate a SINGLE HTML file that includes embedded CSS (in a <style> tag) and JavaScript (in a <script> tag).
2. The HTML must be complete and self-contained — it should work when opened directly in a browser.
3. Use modern, clean HTML5, CSS3, and vanilla JavaScript.
4. Make the design visually appealing with good spacing, colors, and typography.
5. Make it responsive for different screen sizes.
6. Include helpful comments in the code.
7. Do NOT use any external libraries, CDNs, or frameworks unless the user specifically asks for them.
8. Do NOT use any placeholder images — use colored divs, CSS shapes, or inline SVG instead.
9. Always wrap your code in \`\`\`html and \`\`\` markers.
10. Before the code block, write a brief description of what you built.`;

export const buildGenerationPrompt = (messages, currentCode, userPrompt) => {
  const recentMessages = messages.slice(-10);

  let conversationHistory = '';
  if (recentMessages.length > 0) {
    conversationHistory = recentMessages
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');
  }

  let codeContext = '';
  if (currentCode) {
    codeContext = `\nCurrent code:\n\`\`\`html\n${currentCode}\n\`\`\`\n`;
  }

  return `${SYSTEM_PROMPT}

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n` : ''}
${codeContext}
User request: ${userPrompt}`;
};