export const parseGenerationResponse = (responseText) => {
  let code = '';
  let description = '';

  const htmlMarker = '```html';
  const startIndex = responseText.indexOf(htmlMarker);

  if (startIndex !== -1) {
    description = responseText.slice(0, startIndex).trim();
    const codeStart = startIndex + htmlMarker.length;
    const endIndex = responseText.indexOf('```', codeStart);
    code = endIndex !== -1
      ? responseText.slice(codeStart, endIndex).trim()
      : responseText.slice(codeStart).trim();
  } else {
    const genericMarker = '```';
    const genericStart = responseText.indexOf(genericMarker);
    if (genericStart !== -1) {
      description = responseText.slice(0, genericStart).trim();
      const codeStart = genericStart + genericMarker.length;
      const endIndex = responseText.indexOf('```', codeStart);
      code = endIndex !== -1
        ? responseText.slice(codeStart, endIndex).trim()
        : responseText.slice(codeStart).trim();
    } else {
      description = responseText;
    }
  }

  return { code, description };
};