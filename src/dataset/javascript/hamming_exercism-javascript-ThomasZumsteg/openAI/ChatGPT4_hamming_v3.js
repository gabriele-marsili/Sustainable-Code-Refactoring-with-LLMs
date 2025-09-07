class Hamming {
  compute(dnaA, dnaB) {
    if (dnaA.length !== dnaB.length) throw 'DNA strands must be of equal length.';
    let sum = 0;
    for (let i = 0, len = dnaA.length; i < len; i++) {
      if (dnaA[i] !== dnaB[i]) sum++;
    }
    return sum;
  }
}

export default Hamming;