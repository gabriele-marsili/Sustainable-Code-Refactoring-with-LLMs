function translate(phrase) {
  return phrase.split(' ').map(pigize).join(' ');
}

function pigize(word) {
  const firstVowelIndex = word.search(/[aeiouy]/i);

  if (firstVowelIndex === -1) {
    return word;
  }

  if (word.startsWith('qu')) {
    return word.slice(2) + 'quay';
  }

  if (firstVowelIndex === 0) {
    return word + 'ay';
  }

  return word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
}

export default { translate: translate };