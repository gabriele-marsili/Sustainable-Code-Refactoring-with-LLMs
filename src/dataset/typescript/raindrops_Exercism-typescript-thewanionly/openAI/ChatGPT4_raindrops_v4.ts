export function convert(num: number): string {
  const map: [number, string][] = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong'],
  ];

  let result = '';
  for (let i = 0; i < map.length; i++) {
    if (num % map[i][0] === 0) {
      result += map[i][1];
    }
  }

  return result || String(num);
}
