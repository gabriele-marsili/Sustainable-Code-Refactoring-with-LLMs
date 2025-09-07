const items = [
  'house that Jack built.',
  'malt',
  'rat',
  'cat',
  'dog',
  'cow with the crumpled horn',
  'maiden all forlorn',
  'man all tattered and torn',
  'priest all shaven and shorn',
  'rooster that crowed in the morn',
  'farmer sowing his corn',
  'horse and the hound and the horn',
];

const adjectives = [
  null,
  'lay in',
  'ate',
  'killed',
  'worried',
  'tossed',
  'milked',
  'kissed',
  'married',
  'woke',
  'kept',
  'belonged to',
];


function verse(ver) {
  if (ver === 1) {
    return ['This is the house that Jack built.'];
  }

  const result = [`This is the ${items[ver - 1]}`];
  for (let v = ver - 1; v > 1; v -= 1) {
    result.push(`that ${adjectives[v]} the ${items[v - 1]}`);
  }
  result.push(`that ${adjectives[1]} the ${items[0]}`);
  return result;
}

function verses(start, end) {
  const result = [];
  for (let v = start; v <= end; v += 1) {
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
}