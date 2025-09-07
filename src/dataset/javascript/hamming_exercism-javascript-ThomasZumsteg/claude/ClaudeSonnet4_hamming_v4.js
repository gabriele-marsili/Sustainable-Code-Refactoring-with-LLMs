var Hamming = function() {};

Hamming.prototype.compute = function( dnaA, dnaB ) {
  if (dnaA.length !== dnaB.length) { throw 'DNA strands must be of equal length.'}
  
  var sum = 0;
  var length = dnaA.length;
  
  for( var i = 0; i < length; i++) {
    if (dnaA[i] !== dnaB[i]) {sum++}
  }
  return sum;
}

export default Hamming;