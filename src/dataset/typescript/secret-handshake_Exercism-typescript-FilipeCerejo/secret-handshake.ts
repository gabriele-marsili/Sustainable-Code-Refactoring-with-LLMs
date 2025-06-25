const HANDSHAKES = ['jump', 'close your eyes', 'double blink', 'wink'];

export function commands(decimal: number): string[] {
  let binary = decimal.toString(2);
  let handshake: string[] = []
  
  //First four digits (right to left) to select the Handshakes signs
  let lastFour = binary.slice(-4).padStart(4, '0');
  [...lastFour].forEach((digit, idx) => {
    if (digit === '1') {
      handshake.unshift(HANDSHAKES[idx]);
    }
  });
  
  //Following digits to reverse
  let reverseArr = false;
  for(let idx = binary.length - HANDSHAKES.length - 1; idx >= 0; idx--) {
    reverseArr = !reverseArr;
  }
  if(reverseArr) handshake.reverse();
  
  return handshake;
}
