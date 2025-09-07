var DnaTranscriber = function() {};

// Pre-computed mapping to avoid recreation on each call
var DNA_TO_RNA_MAP = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
};

DnaTranscriber.prototype.toRna = function(dna) {
  var result = '';
  for (var i = 0; i < dna.length; i++) {
    result += DNA_TO_RNA_MAP[dna[i]];
  }
  return result;
}

function makeHash(keys, values) {
  var hash = {};
  keys.forEach(function(key, index) { hash[key] = values[index] });
  return hash;
}

export default DnaTranscriber;