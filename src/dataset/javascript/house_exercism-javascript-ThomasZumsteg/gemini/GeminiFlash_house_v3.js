const items = [
  { animal: 'house that Jack built.' },
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

  const verseItems = [];
  for (let i = ver - 1; i >= 0; i--) {
    verseItems.push(items[i]);
  }

  const result = [`This is the ${verseItems[0].animal}`];
  for (let i = 0; i < verseItems.length - 1; i++) {
    result.push(`that ${verseItems[i + 1].adjective} the ${verseItems[i].animal}`);
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