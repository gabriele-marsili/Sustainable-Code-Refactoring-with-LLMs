const items = [
  'house that Jack built.',
  { animal: 'malt', adjective: 'lay in' },
  { animal: 'rat', adjective: 'ate' },
  { animal: 'cat', adjective: 'killed' },
  { animal: 'dog', adjective: 'worried' },
  { animal: 'cow with the crumpled horn', adjective: 'tossed' },
  { animal: 'maiden all forlorn', adjective: 'milked' },
  { animal: 'man all tattered and torn', adjective: 'kissed' },
  { animal: 'priest all shaven and shorn', adjective: 'married' },
  { animal: 'rooster that crowed in the morn', adjective: 'woke' },
  { animal: 'farmer sowing his corn', adjective: 'kept' },
  { animal: 'horse and the hound and the horn', adjective: 'belonged to' },
];

function verse(ver) {
  if (ver === 1) {
    return ['This is the house that Jack built.'];
  }

  const result = [`This is the ${items[ver - 1].animal}`];
  let v = ver - 1;

  while (v > 0) {
    result.push(`that ${items[v].adjective} the ${items[v - 1].animal}`);
    v -= 1;
  }

  return result;
}

function verses(start, end) {
  const result = [];
  for (let v = start; v <= end; v++) {
    const verseResult = verse(v);
    for (let i = 0; i < verseResult.length; i++) {
      result.push(verseResult[i]);
    }
    result.push('');
  }
  result.pop();
  return result;
}

export default {
  verse: verse,
  verses: verses
};