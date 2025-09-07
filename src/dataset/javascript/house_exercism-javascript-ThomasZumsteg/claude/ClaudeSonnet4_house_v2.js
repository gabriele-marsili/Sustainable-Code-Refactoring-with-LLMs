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
  
  const result = new Array(ver);
  result[0] = `This is the ${items[ver - 1].animal}`;
  
  for (let v = ver - 1, i = 1; v > 0; v--, i++) {
    result[i] = `that ${items[v].adjective} the ${items[v - 1].animal}`;
  }
  
  return result;
}

function verses(start, end) {
  const totalLines = (end - start + 1) * 13; // Approximate capacity
  const result = new Array(totalLines);
  let index = 0;
  
  for (let v = start; v <= end; v++) {
    const verseLines = verse(v);
    for (let i = 0; i < verseLines.length; i++) {
      result[index++] = verseLines[i];
    }
    if (v < end) {
      result[index++] = '';
    }
  }
  
  result.length = index;
  return result;
}

export default {
  verse,
  verses
};