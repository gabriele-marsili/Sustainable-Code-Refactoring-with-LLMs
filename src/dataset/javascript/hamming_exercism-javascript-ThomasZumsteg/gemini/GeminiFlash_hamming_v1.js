var Hamming = function() {};

Hamming.prototype.compute = function( dnaA, dnaB ) {
  if (dnaA.length !== dnaB.length) {
    throw 'DNA strands must be of equal length.';
  }

  let distance = 0;
  for (let i = 0; i < dnaA.length; i++) {
    if (dnaA[i] !== dnaB[i]) {
      distance++;
    }
  }
  return distance;
};

export default Hamming;