const FACTOR_RAINDROP_PAIRS: Array<[number, string]> = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
];

export default class Raindrops {
    convert(n: number): string {
        let dropString = '';
        for (const [factor, drop] of FACTOR_RAINDROP_PAIRS) {
            if (n % factor === 0) {
                dropString += drop;
            }
        }
        return dropString || n.toString();
    }
}