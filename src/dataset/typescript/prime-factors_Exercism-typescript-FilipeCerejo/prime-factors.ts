// function calculatePrimeFactors(nbr: number): number[] {
//     let primeFactors: number[] = [];
//     let currentPrime = 2;

//     while (currentPrime <= nbr && nbr !== 1) {
//         if (nbr % currentPrime === 0) {
//             primeFactors.push(currentPrime);
//             nbr /= currentPrime;
//         } else {
//             currentPrime++;
//         }
//     }

//     return primeFactors;
// }

function* getPrimes(nbr: number) {
  for(let p = 2; p <= nbr; p++) {
    while(nbr % p === 0) {
      nbr /= p;
      yield p;
    }
  }
}

export function calculatePrimeFactors(nbr: number): number[] {
  return [...getPrimes(nbr)];
}
