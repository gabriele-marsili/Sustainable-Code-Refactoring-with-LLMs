const FACTOR_RAINDROP_PAIRS: Array<[number, string]> = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
]

export default class Raindrops {
    convert(n: number) {
        const dropString = FACTOR_RAINDROP_PAIRS
            .map(([factor, drop]) => (n % factor === 0) ? drop : '')
            .join('')
        return dropString || (n.toString())
    }
}