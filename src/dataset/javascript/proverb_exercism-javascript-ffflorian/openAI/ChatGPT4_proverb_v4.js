export const proverb = (...inputs) => {
  const words = inputs.filter(input => typeof input === 'string');
  const qualifier = inputs.find(input => input && typeof input === 'object')?.qualifier || '';
  const firstWord = words[0];
  const qualifierText = qualifier ? `${qualifier} ` : '';

  return words.map((word, index) => 
    index < words.length - 1 
      ? `For want of a ${word} the ${words[index + 1]} was lost.` 
      : `And all for the want of a ${qualifierText}${firstWord}.`
  ).join('\n');
};