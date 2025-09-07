export const compute = (leftStrand, rightStrand) => {
  if (leftStrand.length !== rightStrand.length) {
    if (!leftStrand) {
      throw new Error('left strand must not be empty');
    }
    if (!rightStrand) {
      throw new Error('right strand must not be empty');
    }
    throw new Error('left and right strands must be of equal length');
  }

  let hammingDistance = 0;
  for (let i = 0; i < leftStrand.length; i++) {
    if (leftStrand[i] !== rightStrand[i]) {
      hammingDistance++;
    }
  }
  return hammingDistance;
};