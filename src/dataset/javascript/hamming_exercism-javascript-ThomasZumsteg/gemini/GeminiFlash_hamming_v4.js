var Hamming = function() {};

Hamming.prototype.compute = function( dnaA, dnaB ) {
  if (dnaA.length !== dnaB.length) {
    throw 'DNA strands must be of equal length.';
  }

  let sum = 0;
  const length = dnaA.length;

  for (let i = 0; i < length; i++) {
    if (dnaA[i] !== dnaB[i]) {
      sum++;
    }
  }

  return sum;
}

export default Hamming;