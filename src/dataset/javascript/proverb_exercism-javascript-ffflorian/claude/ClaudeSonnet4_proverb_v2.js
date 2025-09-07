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

  const lines = [];
  const lastIndex = words.length - 1;
  
  for (let i = 0; i < lastIndex; i++) {
    lines.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.`);
  }
  
  lines.push(`And all for the want of a ${qualifier ? `${qualifier} ` : ''}${words[0]}.`);
  
  return lines.join('\n');
};