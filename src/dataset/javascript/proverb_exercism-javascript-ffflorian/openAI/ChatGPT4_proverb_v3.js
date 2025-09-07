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

  if (words.length === 0) return '';

  const baseProverb = words
    .slice(0, -1)
    .map((word, i) => `For want of a ${word} the ${words[i + 1]} was lost.`)
    .join('\n');

  const finalLine = `And all for the want of a ${qualifier ? `${qualifier} ` : ''}${words[0]}.`;

  return baseProverb + (baseProverb ? '\n' : '') + finalLine;
};