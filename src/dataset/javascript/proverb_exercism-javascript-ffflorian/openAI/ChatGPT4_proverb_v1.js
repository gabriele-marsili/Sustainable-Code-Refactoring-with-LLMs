export const proverb = (...inputs) => {
  const words = [];
  let qualifier = '';

  for (const input of inputs) {
    if (typeof input === 'string') {
      words.push(input);
    } else if (typeof input === 'object' && input.qualifier) {
      qualifier = input.qualifier;
    }
  }

  if (words.length === 0) return '';

  return words
    .map((word, index) =>
      index < words.length - 1
        ? `For want of a ${word} the ${words[index + 1]} was lost.`
        : `And all for the want of a ${qualifier ? `${qualifier} ` : ''}${words[0]}.`
    )
    .join('\n');
};