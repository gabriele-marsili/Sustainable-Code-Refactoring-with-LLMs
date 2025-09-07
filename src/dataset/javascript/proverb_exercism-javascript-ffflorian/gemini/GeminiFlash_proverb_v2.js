export const proverb = (...inputs) => {
  const words = [];
  let qualifier = '';

  for (const input of inputs) {
    if (typeof input === 'string') {
      words.push(input);
    } else if (typeof input === 'object' && input !== null && input.qualifier) {
      qualifier = input.qualifier;
    }
  }

  const wordCount = words.length;
  let result = '';

  for (let i = 0; i < wordCount - 1; i++) {
    result += `For want of a ${words[i]} the ${words[i + 1]} was lost.\n`;
  }

  result += `And all for the want of a ${qualifier ? `${qualifier} ` : ''}${words[0]}.`;

  return result;
};