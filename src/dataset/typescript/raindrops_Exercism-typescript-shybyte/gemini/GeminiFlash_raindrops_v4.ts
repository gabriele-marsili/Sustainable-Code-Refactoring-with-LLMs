export default class Raindrops {
    private readonly mappings: [number, string][];

    constructor() {
        this.mappings = [
            [3, 'Pling'],
            [5, 'Plang'],
            [7, 'Plong']
        ];
    }

    convert(n: number): string {
        let result = '';
        for (const [divisor, sound] of this.mappings) {
            if (n % divisor === 0) {
                result += sound;
            }
        }
        return result || n.toString();
    }
}