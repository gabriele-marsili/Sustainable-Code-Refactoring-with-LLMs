export default class Raindrops {
    convert(n: number) {
        const map = [
            [3, 'Pling'],
            [5, 'Plang'],
            [7, 'Plong']
        ];
        let result = '';
        for (let i = 0; i < map.length; i++) {
            if (n % map[i][0] === 0) {
                result += map[i][1];
            }
        }
        return result || n.toString();
    }
}
