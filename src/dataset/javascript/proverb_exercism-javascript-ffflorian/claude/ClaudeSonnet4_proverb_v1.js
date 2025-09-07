export const proverb = (...inputs) => {
  const words = [];
  let qualifier = '';

  for (const input of inputs) {
    if (typeof input === 'string') {
      words.push(input);
    } else if (typeof input === 'object' && input?.qualifier) {
      qualifier = input.qualifier;
    }
  }

  if (words.length === 0) return '';

  const result = [];
  const lastIndex = words.length - 1;
  const firstWord = words[0];
  const qualifierPrefix = qualifier ? `${qualifier} ` : '';

  for (let i = 0; i < lastIndex; i++) {
    result.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.\n`);
  }

  result.push(`And all for the want of a ${qualifierPrefix}${firstWord}.`);

  return result.join('');
};