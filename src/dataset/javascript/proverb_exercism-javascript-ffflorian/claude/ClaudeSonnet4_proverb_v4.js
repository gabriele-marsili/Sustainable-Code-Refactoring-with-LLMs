export const proverb = (...inputs) => {
  const words = [];
  let qualifier = '';
  
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (typeof input === 'string') {
      words.push(input);
    } else if (typeof input === 'object' && input !== null) {
      qualifier = input.qualifier || '';
    }
  }

  if (words.length === 0) return '';

  const result = [];
  const firstWord = words[0];
  const qualifierPrefix = qualifier ? `${qualifier} ` : '';

  for (let i = 0; i < words.length - 1; i++) {
    result.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.\n`);
  }
  
  result.push(`And all for the want of a ${qualifierPrefix}${firstWord}.`);
  
  return result.join('');
};